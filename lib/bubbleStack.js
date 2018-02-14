import COLOR from './colors';
import _ from 'lodash';

document.addEventListener("DOMContentLoaded", function () {
  let canvas = document.getElementById("bubbleCanvas");
  let ctx = canvas.getContext("2d");

  canvas.width = 550;
  canvas.height = 700;

// UI handling

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

// Used to create bubble Array

  let allBubbles = [];

// The current bubble's properties
  let bubble;
  let currentBubbleColor = null;
  let initialX = canvas.width/2;
  let initialY = canvas.height;

// Speed of bubble

  let dx = null;
  let dy = null;

// Used to offset board initially

  let xDistance;
  let yDistance;
  let evenInitialOffset = 20;
  // let offSet = 10;
  let offSet = 20;


// Creating the grid with even and odd offsets

  for (let i = 0; i < 20; i++) {
    allBubbles[i] = [];
    for (let j = 0; j < 20; j++) {
      if (i%2===0) {
        xDistance = (40*j)+evenInitialOffset+offSet;
      } else {
        xDistance = (40*j)+offSet;
      }

      yDistance = (34*i)+offSet;

      allBubbles[i][j] = {
        x: xDistance,
        y: yDistance,
        color: _.sample(COLOR),
        display: 0
      };
    }
  }
  console.log(allBubbles);

// Creating the initial board

  function generateInitialBoard() {
    for (let i = 0; i < 3; i++) {
      for (let j = 4; j < 9; j++) {
        allBubbles[i][j].display = 1;
      }
    }
  }

// Down Key Handler

  function keyDownHandler (event) {
    if (event.keyCode === 37) {
      aimLeft = true;
    } else if (event.keyCode === 39 ) {
      aimRight = true;
    } else if (event.keyCode === 32 ) {
      // console.log(shoot);
      shoot = true;
      // console.log("shooting");
    }
  }

// Up Key Handler

  function keyUpHandler (event) {
    if (event.keyCode === 37) {
      aimLeft = false;
    } else if (event.keyCode === 39 ) {
      aimRight = false;
    }
  }

// Drawing the arrow pointer

  function drawArrow() {
    ctx.save();
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
    ctx.lineTo(canvas.width/2, canvas.height);
    ctx.strokeStyle = "white";
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }

// Converting Degrees to Radians

  function DegToRad(deg) {
    return (Math.PI/180 * deg);
  }

// Current status of the playboard

  function currentBoard(){
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        if (allBubbles[i][j].display === 1) {
          ctx.beginPath();
          ctx.arc(allBubbles[i][j].x, allBubbles[i][j].y, 20, 0, Math.PI*2, false);
          ctx.fillStyle = `${allBubbles[i][j].color}`;
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }

// Attempt to load images, but not necessary right now
  //
  // function loadImages(image) {
  //   let newImage = new Image();
  //   newImage.src = image;
  //   return newImage;
  // }

// Creating a bubble

  function generateBubble() {
    if (currentBubbleColor === null) {
      currentBubbleColor = _.sample(COLOR);
    }
    return {
      x: initialX,
      y: initialY,
      color: currentBubbleColor,
      display: 1
    };
    // ctx.beginPath();
    // ctx.arc(initialX, initialY, 20, 0, Math.PI*2, false);
    // ctx.fillStyle = `${currentBubbleColor}`;
    // ctx.fill();
    // ctx.closePath();
    // currentStatus = gameStatus.shoot;
  }

// Shooting the bubble

  function shootBubble() {
      currentStatus = gameStatus.shoot;
      // console.log("shooting");
      if (dx === null) {
        // console.log("this partshooting");
        dx = 10*Math.cos(DegToRad(degrees));
        dy = 10*Math.sin(DegToRad(degrees));
      }

      if (initialX <= 20 || initialX >= canvas.width-20) {
        dx = -dx;
      }

      initialX -= dx;
      initialY -= dy;
  }

  function drawCurrentBubble() {
    ctx.beginPath();
    ctx.arc(bubble.x, bubble.y, 20, 0, Math.PI*2, false);
    ctx.fillStyle = `${bubble.color}`;
    ctx.fill();
    ctx.closePath();
  }
// Collision Detection

  function collisionDetection() {
    for (let i = 1; i < 20; i++) {
      for (let j = 1; j < 20; j++) {
        if (allBubbles[i][j].display === 1) {
          // if ((initialY <= allBubbles[i][j].y + 40) && ((initialX >= allBubbles[i][j].x-40) && (initialX <= allBubbles[i][j].x+40))) {
          console.log(allBubbles);
          if ((initialY <= allBubbles[i][j].y + 40) && (Math.abs(allBubbles[i][j].x-initialX) < 40)) {
            // PUT IN BREAK
            dx = 0;
            dy = 0;
            shoot = false;
            bubble.display = 0;
            bubbleShift();
            // currentStatus = gameStatus.remove;
          } else if (initialY < 0) {
            currentBubbleColor = null;
            initialY = canvas.height;
            initialX = canvas.width/2;
            shoot = false;
            currentStatus = gameStatus.prepare;
            dx = null;
            dy = null;
          }
        }
      }
    }
  }

// Once the bubble stops, the algorithm to realign the bubble into the grid

  function bubbleShift() {
    for (let i = 1; i < 20; i++) {
      for (let j = 1; j < 20; j++) {
        if (allBubbles[i][j].display === 0) {
          let currentY = allBubbles[i][j].y;
          let currentX = allBubbles[i][j].x;
          if ((Math.abs(currentY-initialY) < 20) && (Math.abs(currentX-initialX) < 20)) {
              allBubbles[i][j].display = 1;
              allBubbles[i][j].color = currentBubbleColor;
              currentBubbleColor = null;
              bubble.display = 0;
              // debugger;
              initialX = canvas.width/2;
              initialY = canvas.height;
              // initialX = canvas.width/2;
              shoot = false;
              currentStatus = gameStatus.prepare;
              dx = null;
          }
        }
      }
    }
  }

// Basic setup of the game

  function initialize() {

    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);
    currentStatus = gameStatus.prepare;
    generateInitialBoard();
    setInterval(mainGame, 10);

  }

// Main game loop

  function mainGame() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawArrow();
    currentBoard();
    bubble = generateBubble();
    if (bubble.display === 1) {
      drawCurrentBubble();
    }


    if (shoot) {
      shootBubble();
      collisionDetection();
    }
    //
    // if (currentStatus === 2) {
    // }


    // if (currentStatus === 3) {
    //   bubbleShift();
    // }
  }

  initialize();

});
