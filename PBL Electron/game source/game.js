var canvas
var context

var controller = require("./game source/controller.js")

var x = 1

function initFrame()
{
  window.setInterval(() => // Frame update function
  {
    // Put ur code here
    context.drawImage(loadImage("./game source/images/s.jpg"), x, 50, 50, 50)

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
  context = canvas.getContext("2d")

  controller.initializeEventScheduler()

  controller.on("stickRight", () => 
  {
    x = x + 10 
  })

  initFrame()
}