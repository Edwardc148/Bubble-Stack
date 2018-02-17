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
  let interval = null;
  let gameOver = false;

  // Speed of bubble

  let dx = null;
  let dy = null;

  // let image = loadImages('sea_bubbles.png');

  let gameStatus = {
    initialize: 0,
    prepare: 1,
    shoot: 2,
    remove: 3,
    end: 4,
    reset: 5
  };

  // Array used for recDiffAlgorithm

  let diff = [[-1, -1], [-1, 0], [0, -1], [0, 1], [1, -1], [1, 0]];

  // Used to create bubble Array

  let allBubbles = [];

  // The current bubble's properties

  let bubble;
  let currentBubbleColor = null;
  let initialX = canvas.width/2;
  let initialY = canvas.height;

// Used to offset board initially

  let xDistance;
  let yDistance;
  let evenInitialOffset = 20;
  let offSet = 20;
  // let bubbleimg = ctx.drawImage(image, 190, 250, 90, 90, 255 , 600, 40, 40);

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
        display: 0,
        match: 0
      };
    }
  }

  window.allBubbles = allBubbles;

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
      shoot = true;
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
    // ctx.save();
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
    // ctx.restore();
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
  // function loadImages(img) {
  //   let newImage = new Image();
  //   newImage.src = img;
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
      if (dx === null) {
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
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        if (allBubbles[i][j].display === 1) {
          if ((Math.abs(allBubbles[i][j].y-initialY) < 30) && (Math.abs(allBubbles[i][j].x-initialX) < 30)) {
            dx = 0;
            dy = 0;
            // shoot = false;
            currentStatus = gameStatus.remove;
            // bubbleShift();
            // currentStatus = gameStatus.remove;
          } else if (initialY < -20) {
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
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        if (allBubbles[i][j].display === 0) {
          let currentY = allBubbles[i][j].y;
          let currentX = allBubbles[i][j].x;
          if ((Math.abs(currentY-initialY) < 30) && (Math.abs(currentX-initialX) < 30)) {
              allBubbles[i][j].display = 1;
              allBubbles[i][j].match = 1;
              allBubbles[i][j].color = currentBubbleColor;
              currentBubbleColor = null;
              bubble.display = 0;
              initialX = canvas.width/2;
              initialY = canvas.height;
              shoot = false;
              currentStatus = gameStatus.prepare;
              dx = null;
              dy = null;
          }

          if (allBubbles[i][j].match === 1) {
            let testColor = allBubbles[i][j].color;
            console.log(testColor);
          //   recDiffAlgorithm(testColor, i, j, 0);
          //   let count = countMatches();
          //   if (count >= 3) {
          //     clearBubbles();
          //   } else {
          //     resetMatches();
          //   }
            console.log(i);
            console.log(j);
            recDiffAlgorithm(testColor, i, j, 0);
            let ct = countMatches();
            if (ct >= 3) {
              clearBubbles();
              resetMatches();
            } else {
              resetMatches();
            }
          }
        }
      }
    }
  }

  function recDiffAlgorithm(color, x, y, deepNum) {
    if (deepNum > 6) {
      return 0;
    }
    let ct = 0;
    for (var i = 0; i < diff.length; i++) {
      let arr = diff[i];
      console.log(arr);
      let xDiff = arr[0];
      let yDiff = arr[1];
      if (x === undefined || y === undefined || xDiff === undefined || yDiff === undefined) {
        continue;
      }
      if (x+xDiff < 0) {
        continue;
      }

      let testBubble = allBubbles[x+xDiff][y+yDiff];
      if (testBubble && testBubble.color === color && testBubble.display === 1) {
        testBubble.match = 1;
        ct +=1;
        if ((ct > 1 && deepNum > 0) || (ct > 0 && deepNum >= 0)) {
          recDiffAlgorithm(color, x+xDiff, y+yDiff, deepNum+1);
        }
      }
    }
  }
      // if (testBubble.dislay === 1 && testBubble.color === color ) {
      //   testBubble.match = 1;
      //   recDiffAlgorithm(color, x+xDiff, y+yDiff);
      // }

  function countMatches() {
    let count = 0;
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        if (allBubbles[i][j].match === 1) {
          count += 1;
        }
      }
    }
    return count;
  }

  function clearBubbles() {
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        if (allBubbles[i][j].match === 1) {
          allBubbles[i][j].display = 0;
        }
      }
    }
  }

  function resetMatches() {
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        allBubbles[i][j].match = 0;
      }
    }
  }

// Basic setup of the game

  function initialize() {

    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);
    currentStatus = gameStatus.prepare;
    generateInitialBoard();
    interval = setInterval(mainGame, 10);

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
      if (currentStatus === 3) {
        bubbleShift();
      }
    }

    gameOver = emptyBoard();

    if (gameOver) {
      alert("GAME OVER");
      window.clearInterval(interval);
      initialize();
    }

  }

  function emptyBoard(){
    for (var i = 0; i < 20; i++) {
      for (var j = 0; j < 20; j++) {
        if (allBubbles[i][j].display === 1) {
          return false;
        }
      }
    }
    return true;
  }

  initialize();

});
