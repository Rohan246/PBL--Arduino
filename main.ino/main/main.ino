#include <SPI.h>
#include <WiFi.h>
#include <WiFiUdp.h>

int status = WL_IDLE_STATUS;
char ssid[] = "AESRO2_2.4G";
char pass[] = "EA8TDKNFGE"; //REMOVE PASSWORD
int keyIndex = 0;

unsigned int localPort = 2390;

char packetBuffer[255];
char ReplyBuffer[] = "";

String lastUdpSeries = "default";
boolean alerted = false;

long lastRequest;
bool streamActive;

WiFiUDP Udp;

void parseRequest(IPAddress remote, int port, char UDPBuffer[])
{
  Udp.beginPacket(remote, port);
  Udp.write(UDPBuffer);
  Udp.endPacket();

  Serial.println("Parsed Request: " + (String)UDPBuffer);
}

String parsedDataSet;
void addItemToGrid(String dataSet)
{
  parsedDataSet = parsedDataSet + dataSet + "%";
}

String parseDataSet()
{
  return parsedDataSet;
}

String checkUDPReply()
{
  if((String)packetBuffer != "")
  {
    if((String)packetBuffer != lastUdpSeries && !alerted)
    {
      alerted = true;
      lastUdpSeries = (String)packetBuffer;

      return (String)packetBuffer;
    }
    else if((String)packetBuffer != lastUdpSeries && alerted)
    {
      alerted = true;
      lastUdpSeries = packetBuffer;
      
      return (String)packetBuffer;
    }
    else
    {
      lastUdpSeries = packetBuffer;
      
      return "";
    }
  }
  else
  {
    return "";
  }
}

int x;
int y;
int SW;

boolean switchToggled;

String cycleLoad;

char loadBuffer[255];

void setup() {
  Serial.begin(9600);
  
  if (WiFi.status() == WL_NO_SHIELD) {
    Serial.println("WiFi shield not present");
    
    while (true);
  }

  String fv = WiFi.firmwareVersion();
  if (fv != "1.1.0") {
    Serial.println("Please upgrade the firmware");

    while (true);
  }

  // attempt to connect to Wifi network:
  while (status != WL_CONNECTED) {
    Serial.print("Attempting to connect to SSID: "); 
    Serial.println(ssid);

    status = WiFi.begin(ssid, pass);

    delay(10000);
  }
  Serial.println("Connected to wifi");
  printWifiStatus();

  Serial.println("\nStarting connection to server...");

  Udp.begin(localPort);

  //STOP!!!! DO NOT GO ABOVE THIS LINE!!!!!!

  pinMode(7, INPUT_PULLUP);
}

void loop() {
  int packetSize = Udp.parsePacket();
  if (packetSize) {
    Serial.print("Received packet of size ");
    Serial.println(packetSize);
    Serial.print("From ");
    IPAddress remoteIp = Udp.remoteIP();
    Serial.print(remoteIp);
    Serial.print(", port ");
    Serial.println(Udp.remotePort());

    int len = Udp.read(packetBuffer, 255);
    if (len > 0) {
      packetBuffer[len] = 0;
    }
    Serial.println("Contents:");
    Serial.println(packetBuffer);
  }

  //--IMPORTANT--//
  
  //--PUT ALL CODE AFTER THIS LINE--//
  //--NO DELAYS ALOWED IN CODE--//
  //--APPEND DATA TO ARRAY CALLED "DATA" THEN RUN FUNCTION CALLED "parseRequest"--//

  if(digitalRead(7) == LOW && streamActive)
  {
    switchToggled = true;
  }
  
  x = analogRead(A0);
  y = analogRead(A1);

  addItemToGrid((String)x);
  addItemToGrid((String)y);

 
  
  //--DON'T EDIT THIS CODE--//
  //--CRITICAL--//

  if(packetBuffer != "")
  {
    cycleLoad = checkUDPReply();
    
    if(cycleLoad == "CONNECTION_PROPAGANDA") // This is going to need to be fixed when more events are added; the request should be stored externally 
    {
      parseRequest(Udp.remoteIP(), Udp.remotePort(), "CONNECTION_CONFIRMED");
    }
    else if(cycleLoad == "BEGIN_STREAM")
    {
      streamActive = true;
    }
    else if(cycleLoad == "CANCEL_STREAM")
    {
      parseRequest(Udp.remoteIP(), Udp.remotePort(), "CONFIRMED_STREAM_CANCELATION");

      streamActive = false;
    }
    else
    {
      /*
      if(!alerted && cycleLoad != "default")
      {
        Serial.println("Invalid operation sent by client");
        
        parseRequest(Udp.remoteIP(), Udp.remotePort(), "INVAL_OPERATION");
      }
      */
    }
  }

  if(streamActive)
  {
    if((millis() - lastRequest) >= 1000)
    {
      lastRequest = millis();

      if(switchToggled)
      {
        addItemToGrid("true");

        switchToggled = false;
      }
      else
      {
        addItemToGrid("false");
      }

      parseDataSet().toCharArray(loadBuffer, sizeof(parseDataSet()));
      parseRequest(Udp.remoteIP(), Udp.remotePort(), loadBuffer);
    }
  }

  parsedDataSet = "";
}

void printWifiStatus() {
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());

  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);

  long rssi = WiFi.RSSI();
  Serial.print("signal strength (RSSI):");
  Serial.print(rssi);
  Serial.println(" dBm");
}

