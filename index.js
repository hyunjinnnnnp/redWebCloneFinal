const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const textContainer = document.querySelector(".text-container");
const text = document.querySelector(".text");
const btn = document.querySelector(".intro-btn");
const btnLabel = document.querySelector(".intro-btn-label");

const stageWidth = document.body.clientWidth,
  stageHeight = document.body.clientHeight;

let btnR = 50; //버튼 원 반지름

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

function drawBtnCon() {
  let rect = btn.getBoundingClientRect();
  const btnX = rect.x,
    btnY = rect.y;
  //리사이즈 이벤트 후 화살표 위치 이상함......일단 스킵
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
  //투명도, 스케일 css 처리
}

function resizeHandler() {
  canvas.width = stageWidth * 2;
  canvas.height = stageHeight * 2;
  ctx.scale(2, 2);
  drawBtnCon();
}

function init() {
  let timeId;
  window.addEventListener("resize", resizeHandler);
  text.onanimationend = () => {
    timeId = setInterval(btnFade, 1000);
  };
  btnLabel.onanimationend = () => {
    if (event.animationName === "label-fade") {
      clearInterval(timeId);
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, stageWidth, stageHeight); //애니메이션이 끝나면 캔버스 리셋
    }
  };
}

window.onload = () => resizeHandler();
init();
