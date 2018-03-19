### Bubble Stack README

### Overview

[Live Demo](https://edwardc148.github.io/Bubble-Stack/)

Bubble stack is a personalized spin-off of the 1995 puzzle video game originally published by Nintendo. The goal is to match all the bubbles of the same colors in order to clear the board.

### Technology

This game is designed to demonstrate Object Oriented Programming in Javascript with the help of HTML 5 Canvas as well as a JavaScript bundler, Webpack.

### Functionality

When Bubble Stack is initialized in the beginning, I make use of the asynchronous nature of JavaScript to put the game into a interval loop that is waiting for user inputs.

Users will be able to shoot bubbles at varying angles in order to match bubbles of at least 3 lengths. The possible colors will be randomly generated and will adapt to varying stages of the game.

### Features

1. The center portion of the game is implemented using Canvas that responds to user inputs with a key handler.

![MainPage](https://github.com/Edwardc148/Markups/blob/master/current_bk.png)

### Sample Code

- The most difficult portion of this project was color pattern matching using a self designed recursive algorithm.  When a bubble collides, it will detect its surrounding bubbles's colors within the hexagonal grid and then place each matched bubble into the recursion as well.

```javascript
function recDiffAlgorithm(color, x, y, deepNum) {
  if (currentStatus === 4) {
    let ct = 0;
    if (x%2 !== 0) {
      for (var i = 0; i < diff.length; i++) {
        let arr = diff[i];
        let xDiff = arr[0];
        let yDiff = arr[1];
        if (x+xDiff < 0) {
          continue;
        }
        if (y+yDiff < 0) {
          continue;
        }
        let testBubble = allBubbles[x+xDiff][y+yDiff];
        if (testBubble.color === color && testBubble.display === 1 && testBubble.match !== 1) {
          testBubble.match = 1;
          totalCount += 1;
          ct += 1;
            recDiffAlgorithm(color, x+xDiff, y+yDiff, deepNum+1);
        }
      }
    }
  }
}
```

- The direction the bubble is launched is based on the arrow angle.  This angle is calculated using a unit circle with the x coordinates (canvas.width/2-80*Math.cos(rad)) and the y coordinates (canvas.height-80*Math.sin(rad)).

```javascript
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
```

### Future Direction

- Multiplayer
- Timed mode
