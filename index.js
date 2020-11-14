const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const textContainer = document.querySelector(".text-container"),
  main = document.querySelector("main");
const btn = document.createElement("input");
btn.type = "button";
main.appendChild(btn);

const stageWidth = document.body.clientWidth,
  stageHeight = document.body.clientHeight;

const btnX = stageWidth - 100;
const btnY = stageHeight - 100;
let btnR = 50; //버튼 원 반지름

function drawBtn() {
  //그리긴했는데 실제 btn이랑 상관없이 그려져버렸음 .......
  ctx.beginPath();
  ctx.arc(btnX, btnY, btnR, 0, 2 * Math.PI);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.moveTo(btnX - 100, btnY);
  ctx.lineTo(btnX, btnY);
  ctx.strokeStyle = "white";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.lineTo(btnX - 5, btnY - 5);
  ctx.lineTo(btnX - 5, btnY + 5);
  ctx.lineTo(btnX, btnY);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.font = "1em sans-serif";
  ctx.fillText(`Passer l'intro`, btnX - 200, btnY + 5);
}

function btnFade() {
  for (let i = 0; i < btnR; i++) {
    //투명도 fade out 효과 다시보기
    let transparency = 1;
    transparency -= 0.2;
    btnR -= 1;
    ctx.clearRect(0, 0, stageWidth, stageHeight);
    ctx.beginPath();
    ctx.fillStyle = `rgba(0,0,0,${transparency})`;
    ctx.arc(btnX, btnY, btnR, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.moveTo(btnX - 100, btnY);
    ctx.lineTo(btnX, btnY);
    ctx.strokeStyle = `rgba(255, 255, 255, ${transparency})`;
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.lineTo(btnX - 5, btnY - 5);
    ctx.lineTo(btnX - 5, btnY + 5);
    ctx.lineTo(btnX, btnY);
    ctx.fillStyle = `rgba(255, 255, 255, ${transparency})`;
    ctx.fill();
    ctx.font = "1em sans-serif";
    ctx.fillText(`Passer l'intro`, btnX - 200, btnY + 5);
  }
}

document.onanimationend = () => {
  console.log("Animation ended");
  setInterval(btnFade, 10);
};

function resizeHandler() {
  canvas.width = stageWidth * 2;
  canvas.height = stageHeight * 2;
  ctx.scale(2, 2);
  drawBtn();
}

function init() {
  window.addEventListener("resize", resizeHandler);
}

window.onload = () => resizeHandler();
init();

//window.addEventListener("animationend", removeCanvas);
