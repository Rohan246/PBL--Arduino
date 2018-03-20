var canvas
var context

var controller = require("./game source/controller.js")

var x = 800
var y = 0

var portalThreshold = 1360

// Place loadImage instances here
var charStageOne = loadImage("./game source/images/charactermodel/sprite1.png")
var charStageTwo = loadImage("./game source/images/charactermodel/sprite2.png")
var charStageThree = loadImage("./game source/images/charactermodel/sprite3.png")

var background = loadImage("./game source/images/bg.jpg")

var portal = loadImage("./game source/images/portal.png")

function initFrame()
{
  window.setInterval(() => // Frame update function
  {
    // Put ur code here
    context.drawImage(background, 1, 1, window.innerWidth, window.innerHeight)
    context.drawImage(portal, window.innerWidth - 200, 450, 150, 150)
    context.drawImage(charStageOne, x, 540, 28, 53)

    if(x >= portalThreshold)
    {
      document.getElementById("game").style.display = "none";
      document.getElementById("quiz").style.display = "block";
    }
  }, 1)
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
    x = x + 20
  })
  controller.on("stickLeft", () => {
    context.clearRect(0, 0, canvas.width, canvas.height)
    x = x - 20
  })
  controller.on("stickUp", () => {
    context.clearRect(0, 0, canvas.width, canvas.height)
    y = y - 20
  })
  controller.on("stickDown", () => {
    context.clearRect(0, 0, canvas.width, canvas.height)
    y = y + 20
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

function quizCheck()
{
  document.getElementById("scorecard").style.display = "block";
  var correct = 0;

  var s1 = document.getElementById("1").checked;
  var s2 = document.getElementById("2").checked;
  var s3 = document.getElementById("3").checked;
  var s4 = document.getElementById("4").checked;

  if(s1)
  {
    correct--;
  }
  else
  {
    correct++;
  }

  if(s2)
  {
    correct++;
  }
  else
  {
    correct--;
  }

  if(s3)
  {
    correct++;
  }
  else
  {
    correct--;
  }

  if(s4)
  {
    correct++;
  }
  else
  {
    correct--;
  }

  document.getElementById("percent").innerHTML = "100%";
}