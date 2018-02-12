let shootBubble = false;
let aimLeft = false;
let aimRight = false;

export const keyDownHandler = (event) => {
  if (event.keyCode === 32) {
    shootBubble = true;
  } else if (event.keyCode === 37) {
    aimLeft = true;
  } else if (event.keyCode === 39) {
    aimRight = true;
  }
};

export const keyUpHandler = (event) => {
  if (event.keyCode === 32) {
    shootBubble = false;
  } else if (event.keyCode === 37) {
    aimLeft = false;
  } else if (event.keyCode === 39) {
    aimRight = false;
  }
};
