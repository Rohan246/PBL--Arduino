const UDP = require("./src/communication.js")
let load = require("./src/timing.js")

var checked = false;

var init = false

function handle(type, value)
{
    if(type != "error")
    {
        if(type == "active")
        {
            document.getElementById("preload").style.display = "inline-block";
            UDP.sendData(2390, "CONNECTION_PROPAGANDA")

            window.setInterval(() => 
            {
                if(!checked)
                {
                    document.getElementById("preload").style.display = "none";

                    UDP.close()
                    
                    // Display connection error notice
                }
            }, 5000)
        }
        else if(type == "message")
        {
            if(value == "CONNECTION_CONFIRMED")
            {
                document.getElementById("preload").style.display = "none";

                checked = true

                // Connection confirmed; move on
            }
        }
    }
    else
    {
        document.getElementById("preload").style.display = "none";
        console.log("Fatal Error :(")

        // Display fatal error
    }
}

console.log("CNT2") // DEBUG
load.addTimingEvent(() =>
{
    document.getElementById("submit").addEventListener("click", () => {
        if(!init)
        {
            UDP.initalizeServer(2390, handle)
        }
    })
})