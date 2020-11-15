const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const textContainer = document.querySelector(".text-container");
const text = document.querySelector(".text");
const btn = document.querySelector(".intro-btn");
const btnLabel = document.querySelector(".intro-btn-label");

const stageWidth = document.body.clientWidth,
  stageHeight = document.body.clientHeight;

let btnR = 50; //버튼 원 반지름

function drawBtnCon() {
  let rect = btn.getBoundingClientRect();
  const btnX = rect.x,
    btnY = rect.y;
  //버튼이랑 텍스트는 css로 그려서 애니메이션으로 제어할 거임
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

text.onanimationend = () => {
  setInterval(btnFade, 1000);
};

function resizeHandler() {
  canvas.width = stageWidth * 2;
  canvas.height = stageHeight * 2;
  ctx.scale(2, 2);
  drawBtnCon();
}

function init() {
  window.addEventListener("resize", resizeHandler);
}

window.onload = () => resizeHandler();
init();
