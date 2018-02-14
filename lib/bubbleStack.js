import COLOR from './colors';
import _ from 'lodash';

document.addEventListener("DOMContentLoaded", function () {
  let canvas = document.getElementById("bubbleCanvas");
  let ctx = canvas.getContext("2d");
  canvas.width = 550;
  canvas.height = 700;

  // let initialize = false;

  let degrees = 90;
  let aimLeft = false;
  let aimRight = false;
  let shoot = false;
  let currentStatus = 0;
  let gameStatus = {
    initialize: 0,
    prepare: 1,
    shoot: 2,
    remove: 3,
    end: 4
  };

  let dx = null;
  let dy = null;
  let allBubbles = [];

  let xDistance;
  let yDistance;

  let evenInitialOffset = 20;
  let offSet = 30;

  let initialX = canvas.width/2;
  let initialY = canvas.height-130;

  let bubbleY = -120;
  let bubbleX = canvas.width/2 - 150;

  for (let i = 1; i < 20; i++) {
    allBubbles[i] = [];
    for (let j = 1; j < 20; j++) {
      allBubbles[i][j] = {
        x: 0,
        y: 0,
        color: _.sample(COLOR),
        display: 0
      };
    }
  }

  function generateInitialBoard() {
    for (let i = 1; i < 12; i++) {
      for (let j = 1; j < 6; j++) {
        if (j%2===0) {
          xDistance = (40*i)+evenInitialOffset+offSet;
        } else {
          xDistance = (40*i)+offSet;
        }
        yDistance = (40*j);
        allBubbles[i][j].x = xDistance;
        allBubbles[i][j].y = yDistance;
        allBubbles[i][j].display = 1;
      }
    }
  }

  function keyDownHandler (event) {
    if (event.keyCode === 37) {
      aimLeft = true;
    } else if (event.keyCode === 39 ) {
      aimRight = true;
    } else if (event.keyCode === 32 ) {
      shoot = true;
    }
  }

  function keyUpHandler (event) {
    if (event.keyCode === 37) {
      aimLeft = false;
    } else if (event.keyCode === 39 ) {
      aimRight = false;
    }
  }

  function drawArrow() {
    ctx.save();
    // ctx.translate(canvas.width/2, canvas.height);
    if (aimLeft) {
      if (degrees < 30) {
        degrees = 30;
      } else {
        degrees -= 1;
      }
    } else if (aimRight) {
      if (degrees > 150) {
        degrees = 150;
      } else {
        degrees += 1;
      }
    }

    let rad = DegToRad(degrees);

    ctx.beginPath();
    let newX = (canvas.width/2-80*Math.cos(rad));
    let newY = (canvas.height-80*Math.sin(rad));
    ctx.moveTo(newX, newY);
    // ctx.moveTo(-80*Math.cos(rad), -80*Math.sin(rad));
    ctx.lineTo(canvas.width/2, canvas.height);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }

  function DegToRad(deg) {
    return (Math.PI/180 * deg);
  }

  function currentBoard(){
    for (let i = 1; i < 12; i++) {
      for (let j = 1; j < 6; j++) {
        if (j%2===0) {
          xDistance = (40*i)+evenInitialOffset+offSet;
        } else {
          xDistance = (40*i)+offSet;
        }
        yDistance = (34*j);
        allBubbles[i][j].x = xDistance;
        allBubbles[i][j].y = yDistance;
        allBubbles[i][j].display = 1;
        allBubbles[i][j].status = 1;


        ctx.beginPath();
        // ctx.arc(xDistance, yDistance, 20, 0, Math.PI*2, false);
        ctx.rect(xDistance, yDistance, 20, 20);
        ctx.fillStyle = `${allBubbles[i][j].color}`;
        ctx.fill();
        ctx.closePath();
      }
    }
  }

  function loadImages(image) {
    let newImage = new Image();
    newImage.src = image;
    return newImage;
  }

  function generateBubble() {
    ctx.save();
    // ctx.translate(canvas.width/2  , canvas.height);
    ctx.beginPath();
    // ctx.arc(bubbleX*Math.cos(DegToRad(degrees)), bubbleY*Math.sin(DegToRad(degrees)), 20, 0, Math.PI*2, false);

    // ctx.arc(bubbleX, bubbleY, 20, 0, Math.PI*2, false);

    ctx.arc(initialX, initialY, 20, 0, Math.PI*2, false);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
    ctx.restore();
    currentStatus = gameStatus.shoot;
  }

  function shootBubble() {
    if (shoot) {
      // console.log("shooting");
      if (dx === null) {
        console.log("shooting");
        dx = 10*Math.cos(DegToRad(degrees));
        dy = 10*Math.sin(DegToRad(degrees));
      }

      // if (bubbleX <= -canvas.width/2+20 || bubbleX >= canvas.width/2-20) {
      //   dx = -dx;
      // }
      if (initialX <= 20 || initialX >= canvas.width-20) {
        dx = -dx;
      }

      // bubbleY -= dy;
      // bubbleX -= dx;

      initialX -= dx;
      initialY -= dy;

      collisionDetection();
      // if (bubbleY <= -680) {
      //   shoot = false;
      //   currentStatus = gameStatus.remove;
      //   dx = null;
      //   dy = null;
      //   bubbleX = canvas.width/2 -275;
      //   bubbleY = -120;
      //   ctx.save();
      // }
    }
  }

  function collisionDetection() {
    for (let i = 1; i < 12; i++) {
      for (let j = 1; j < 6; j++) {
        if (initialY <= allBubbles[i][j].y) {
          dy = 0;
          dx = 0;
          initialY = initialY + 40;
          // initialY = allBubbles[i][j].y+35;
          // initialX = allBubbles[i][j].x+20;
        }
      }
    }
    // console.log(bubbleY+700);
  }

  function initialize() {

    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);
    currentStatus = gameStatus.prepare;

    setInterval(mainGame, 10);
  }

  function mainGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawArrow();
    generateBubble();

    currentBoard();

    if (currentStatus === 2) {
      shootBubble();
    }

    if (currentStatus === 3) {
      generateBubble();
    }

    ctx.restore();
  }

  initialize();

});
