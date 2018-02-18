const UDP = require("./src/communication.js")
let load = require("./src/timing.js")

var checked = false;

var init = false

let animationState = 0

function displayStatus(message, color)
{
    let statBox = document.getElementById("status")

    statBox.style.color = color
    statBox.innerHTML = message

    statBox.style.display = "inline-block"
}

function closeAnamation()
{
    let screenWidth = window.innerWidth

    let body = document.getElementById("cfw")
    body.style.display = "absolute"

    window.setInterval(() => 
    {
        animationState = animationState + 5

        if(animationState != screenWidth)
        {
            body.style.left = animationState
        }
        else
        {
            clearInterval(this)
        }
    }, 100)
}

function rimInputField(color)
{
    let inputField = document.getElementById("ipfield").style.borderColor = color
}

function handle(type, value)
{
    if(type != "error")
    {
        if(type == "active")
        {
            document.getElementById("preload").style.display = "inline-block";
            UDP.sendData(2390, "CONNECTION_PROPAGANDA")

            window.setTimeout(() => 
            {
                if(!checked)
                {
                    document.getElementById("preload").style.display = "none";

                    UDP.close()
                    
                    displayStatus("Connection Allotment Error", "#E87461")
                    rimInputField("#E87461")
                }
            }, 5000)
        }
        else if(type == "data")
        {
            if(value == "CONNECTION_CONFIRMED")
            {
                document.getElementById("preload").style.display = "none";

                checked = true

                UDP.close()

                displayStatus("Connection Established", "#7AC74F")
                rimInputField("#7AC74F")

                setTimeout(closeAnamation, 1000)
            }
        }
    }
    else
    {
        document.getElementById("preload").style.display = "none";
        console.log("Fatal Error :(")

        UDP.close()

        displayStatus("Fatal Executional Error: " + value, "#E87461")
        rimInputField("#E87461")
    }
}

load.addTimingEvent(() =>
{
    document.getElementById("submit").addEventListener("click", () => {
        if(!init)
        {
            document.getElementById("status").style.display = "none";

            UDP.initalizeServer(2390, handle)
        }
    })
})