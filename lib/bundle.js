/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {


document.addEventListener("DOMContentLoaded", function () {
  let canvas = document.getElementById("bubbleCanvas");
  let ctx = canvas.getContext("2d");

  // let shootBubble = false;
  let degrees = 0;
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
  let bubbleX = 0;
  let bubbleY = -110;

  function initialize() {
    canvas.width = 550;
    canvas.height = 700;
    //
    //

    // let bubbles = loadImages('sea_bubbles.png');
    // console.log(bubbles);
    // ctx.drawImage(bubbles, -250 , -250);

    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);

    currentStatus = gameStatus.prepare;
    setInterval(mainGame, 10);
  }

  function loadImages(image) {
      let newImage = new Image();
      newImage.src = image;
      return newImage;
  }

  function generateBubble() {
    ctx.save();
    ctx.translate(canvas.width/2, canvas.height);
    if (aimLeft) {
      if (degrees < -90) {
        degrees = -90;
      } else {
        degrees -= 1;
      }
    } else if (aimRight) {
      if (degrees > 90) {
        degrees = 90;
      } else {
        degrees += 1;
      }
    }

    ctx.rotate(Math.PI/180*degrees);
    ctx.beginPath();
    ctx.arc(bubbleX, bubbleY, 20, 0, Math.PI*2, false);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
    ctx.restore();
    currentStatus = gameStatus.shoot;
  }

  function shootBubble() {
    if (shoot) {
      bubbleY -= 0.50;
      console.log(bubbleX);

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
    ctx.translate(canvas.width/2, canvas.height);
    if (aimLeft) {
      if (degrees < -90) {
        degrees = -90;
      } else {
        degrees -= 1;
      }
    } else if (aimRight) {
      if (degrees > 90) {
        degrees = 90;
      } else {
        degrees += 1;
      }
    }


    ctx.rotate(Math.PI/180*degrees);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -80);
    ctx.lineTo(-5,-75);
    ctx.arcTo(0, -80, 5, -75, 10);
    ctx.lineTo(0, -80);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }

  function mainGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    generateBubble();
    if (currentStatus === 2) {
      shootBubble();
    }
    drawArrow();
  }

  initialize();

});


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map