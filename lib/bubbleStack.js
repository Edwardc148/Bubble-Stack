import { keyUpHandler, keyDownHandler } from './playerMoves.js';


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

  document.addEventListener("keydown", keyDownHandler);
  document.addEventListener("keyup", keyUpHandler);

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
