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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__playerMoves_js__ = __webpack_require__(1);



document.addEventListener("DOMContentLoaded", function () {
  let canvas = document.getElementById("bubbleCanvas");
  let ctx = canvas.getContext("2d");
  
  canvas.width = 550;
  canvas.height = 700;

  ctx.lineWidth=10;
  ctx.strokeStyle= 'black';


  let w = 50;
  let h = 100;
  let degrees = 0;
  ctx.translate(canvas.width/2, 350);

  function drawArrow() {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -80);
    ctx.stroke();
  }

  document.addEventListener("keydown", __WEBPACK_IMPORTED_MODULE_0__playerMoves_js__["a" /* keyDownHandler */]);
  document.addEventListener("keyup", __WEBPACK_IMPORTED_MODULE_0__playerMoves_js__["b" /* keyUpHandler */]);

  function clearRect() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  // function draw() {
  function drawRect() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.rotate((Math.PI/180*degrees));
    ctx.beginPath();
    ctx.lineWidth="4";
    ctx.strokeStyle="green";
    ctx.rect(50,50,w, h);
    ctx.stroke();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  // drawRect();

  function draw() {

    clearRect();
    drawRect();
    drawArrow();
  }

  setInterval(draw, 50);



});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
let shootBubble = false;
let aimLeft = false;
let aimRight = false;

const keyDownHandler = (event) => {
  if (event.keyCode === 32) {
    shootBubble = true;
  } else if (event.keyCode === 37) {
    aimLeft = true;
  } else if (event.keyCode === 39) {
    aimRight = true;
  }
};
/* harmony export (immutable) */ __webpack_exports__["a"] = keyDownHandler;


const keyUpHandler = (event) => {
  if (event.keyCode === 32) {
    shootBubble = false;
  } else if (event.keyCode === 37) {
    aimLeft = false;
  } else if (event.keyCode === 39) {
    aimRight = false;
  }
};
/* harmony export (immutable) */ __webpack_exports__["b"] = keyUpHandler;



/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map