const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const textContainer = document.querySelector(".text-container");
const text = document.querySelector(".text");
const btn = document.querySelector(".intro-btn");
const btnLabel = document.querySelector(".intro-btn-label");

const stageWidth = document.body.clientWidth,
  stageHeight = document.body.clientHeight;

let btnR = 50; //버튼 원 반지름

const red = "rgb(139, 34, 34)";

let timeId;

// Bezier curve
const startPointX = stageWidth;
const startPointY = stageHeight;
let cp1x = stageWidth;
let cp1y = stageHeight;
let cp2x = 0;
let cp2y = stageHeight;
const endPointX = 0;
const endPointY = stageHeight;
let speed = 5;
let increment = 0;

//circle container
const circleContainer = document.querySelector(".circle-container"),
  circle = document.querySelector(".circle");

function drawBtnCon() {
  let rect = btn.getBoundingClientRect();
  const btnX = rect.x,
    btnY = rect.y;
  ctx.beginPath();
  ctx.moveTo(btnX - 100, btnY);
  ctx.lineTo(btnX, btnY);
  ctx.strokeStyle = "white";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.lineTo(btnX - 5, btnY - 5);
  ctx.lineTo(btnX - 5, btnY + 5);
  ctx.lineTo(btnX, btnY);
  ctx.fillStyle = "rgba(255,255,255,0.7";
  ctx.fill();
  btnLabel.classList.add("label-show-ani");
  btn.classList.add("btn-show-ani");
}
function btnFade() {
  btn.classList.remove("btn-show-ani");
  btn.classList.add("btn-fade-ani");
  btnLabel.classList.remove("label-show-ani");
  btnLabel.classList.add("label-fade-ani");
}

function resizeHandler() {
  canvas.width = stageWidth * 2;
  canvas.height = stageHeight * 2;
  ctx.scale(2, 2);
  drawBtnCon();
}

function bgAnimate() {
  if (event.animationName === "label-fade") {
    clearInterval(timeId);
    const main = document.querySelector(".main");
    main.style.backgroundColor = "transparent";
    circleContainer.style.visibility = "visible";

    let speed = 10;
    let increment = 0;
    let cpVal = -50;

    let n = 0; //for cancel animation

    function drawBezierCurve() {
      n++;
      if (n > 100) {
        return;
      }

      increment = increment + speed;
      cpVal += 2;

      let currentCPYTop = stageHeight - increment;
      if (cpVal > 20) {
        speed = 12;
      }
      if (cpVal >= 10) {
        ctx.clearRect(0, 0, stageWidth, stageHeight);
        ctx.beginPath();
        ctx.fillRect(0, 0, stageWidth, currentCPYTop);
        ctx.fillStyle = " rgb(138, 17, 17)";
        ctx.fill();
        ctx.closePath();
      } else {
        ctx.clearRect(0, 0, stageWidth, stageHeight);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(stageWidth, 0);
        ctx.lineTo(stageWidth, stageHeight - increment);
        ctx.bezierCurveTo(
          stageWidth,
          stageHeight + cpVal - increment,
          0,
          stageHeight + cpVal - increment,
          0,
          stageHeight - increment
        );
        ctx.fillStyle = " rgb(138, 17, 17)";
        ctx.fill();
        ctx.closePath();
      }

      timeId = requestAnimationFrame(drawBezierCurve);
    }

    drawBezierCurve();
  }
}

function init() {
  window.addEventListener("resize", resizeHandler);
  text.onanimationend = () => {
    timeId = setInterval(btnFade, 1000);
  };
  btnLabel.addEventListener("animationend", bgAnimate);
}

window.onload = () => resizeHandler();
init();
