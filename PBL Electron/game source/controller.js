let stickUp
let stickDown
let sickLeft
let stickRight
let keyA
let keyB
let keyC

exports.on = (event, handler) =>
{
    console.log("Registering event handler with name: " + event)

    switch(event)
    {
        case "stickUp":
            stickUp = handler

            return true
            break
        case "stickDown":
            stickDown = handler

            return true
            break
        case "stickLeft":
            stickLeft = handler

            return true
            break
        case "stickRight":
            stickRight = handler

            return true
            break
        case "keyA":
            keyA = handler

            return true
            break
        case "keyB":
            keyB = handler

            return true
            break
        case "keyC":
            keyC = handler

            return true
            break
        default:
            return false
            break
    }
}

function callActionIfReady(action)
{
    if(action !== null)
    {
        action()
    }
}

exports.initializeEventScheduler = () =>
{
    let win = document.getElementById("html")
    win.addEventListener("keypress", (event) => {
        console.log("Key: " + event.key)
        switch(event.key)
        {
            case "a":
                callActionIfReady(stickLeft)

                break
            case "d":
                callActionIfReady(stickRight)

                break
            case "w":
                callActionIfReady(stickUp)

                break
            case "s":
                callActionIfReady(stickDown)

                break
        }
    })
}