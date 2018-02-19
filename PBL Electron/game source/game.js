var canvas
var context

var controller = require("controller.js")

function initFrame()
{
  window.setInterval(() => // Frame update function
  {
    // Put ur code here
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

  initFrame()
}