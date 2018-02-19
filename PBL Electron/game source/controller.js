let stickUp
let stickDown
let sickLeft
let stickRight
let keyA
let keyB
let keyC

exports.on = (event, handler) =>
{
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
    let window = document.getElementById("html")
    window.addEventListener("keyPress", (event) => {
        Console.log(event.char)
        switch(event.char)
        {
            case "l":
                callActionIfReady(stickLeft)

                break
            case "r":
                callActionIfReady(stickRight)

                break
        }
    })
}