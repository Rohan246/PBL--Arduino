var canvas
var context

var controller = require("./game source/controller.js")

var x = 0
var y = 0

// Place loadImage instances here
var charStageOne = loadImage("./game source/images/charactermodel/sprite1.png")
var charStageTwo = loadImage("./game source/images/charactermodel/sprite2.png")
var charStageThree = loadImage("./game source/images/charactermodel/sprite3.png")

function initFrame()
{
  window.setInterval(() => // Frame update function
  {
    // Put ur code here
    context.drawImage(charStageOne, x, y, 28, 53)
  }, 20)
}

function loadImage(path)
{
  let image = new Image()
  image.src = path

  return image
}

window.onload = () => // Setup
{
  canvas = document.getElementById("game")
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  context = canvas.getContext("2d")

  controller.initializeEventScheduler()

  controller.on("stickRight", () => 
  {
    context.clearRect(0, 0, canvas.width, canvas.height)
    x = x + 10
  })
  controller.on("stickLeft", () => {
    context.clearRect(0, 0, canvas.width, canvas.height)
    x = x - 10
  })
  controller.on("stickUp", () => {
    context.clearRect(0, 0, canvas.width, canvas.height)
    y = y - 10
  })
  controller.on("stickDown", () => {
    context.clearRect(0, 0, canvas.width, canvas.height)
    y = y + 10
  })

  // Window control code:
  const  {remote} = require("electron")

  document.getElementById("close").addEventListener("click", () => {
        window.close()
    })

    document.getElementById("minimize").addEventListener("click", () => {
        remote.BrowserWindow.getFocusedWindow().minimize()
    })
  // End window control code:

  initFrame()
}