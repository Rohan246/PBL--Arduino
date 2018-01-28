#include <SPI.h>
#include <WiFi.h>
#include <WiFiUdp.h>

int status = WL_IDLE_STATUS;
char ssid[] = "AESRO2_2.4G";
char pass[] = "EA8TDKNFGE";
int keyIndex = 0;

unsigned int localPort = 2390;

char packetBuffer[255];
char  ReplyBuffer[] = "testBuffer";

WiFiUDP Udp;

void parseRequest(IPAddress remote, int port, char UDPBuffer[])
{
  Udp.beginPacket(remote, port);
  Udp.write(UDPBuffer);
  Udp.endPacket();
}

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




