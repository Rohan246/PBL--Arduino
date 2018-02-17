// Controls windows & stuff
const  {remote} = require("electron")

window.onload = () => 
{
    document.getElementById("close").addEventListener("click", () => {
        window.close();
    })

    document.getElementById("minimize").addEventListener("click", () => {
        remote.BrowserWindow.getFocusedWindow().minimize();
    })
}