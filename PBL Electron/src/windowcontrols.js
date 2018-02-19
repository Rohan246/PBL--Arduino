// Controls windows & stuff
const  {remote} = require("electron")
let tm = require("./src/timing.js")

tm.addTimingEvent(() => 
{
    document.getElementById("close").addEventListener("click", () => {
        window.close()
    })

    document.getElementById("minimize").addEventListener("click", () => {
        remote.BrowserWindow.getFocusedWindow().minimize()
    })
})