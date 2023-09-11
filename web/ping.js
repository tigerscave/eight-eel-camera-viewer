'use strict'

//pingの値が表示される コード書き途中
const pingStartBtn = document.getElementById("ping-start-btn")
const pingStopBtn = document.getElementById("ping-stop-btn")
const pingResultValue = document.getElementById("ping-value")
const checkOnlineText = document.getElementById("check-online-text")
const onlineStatusIndicator = document.getElementById("check-online");

let pingRunning = false;
let pingResultElement;

pingStartBtn.addEventListener('click', async () => {
  pingRunning = true;
  for(let i = 0; i<i+1;i++){
    if(!pingRunning) {//ping停止ボタンが押されたらループから抜ける。
      break;
    }
    const host = ipAddressInput.value;
    const startTime = new Date().getTime(); // ping開始時間
    const result = await eel.ping_host(host)(); // ping_host関数を非同期で呼び出す
    const endTime = new Date().getTime(); // ping終了時間
    const pingTime = endTime - startTime; // ping実行時間

    if(!pingResultElement) {
      pingResultElement = document.createElement("pre");
      pingResultElement.classList.add("new-pre-class");
      pingResultValue.parentNode.appendChild(pingResultElement);
    }
    //pingの値を上書き
    pingResultElement.textContent = `ping:${pingTime}ミリ秒`;
    checkOnlineText.innerText = "オンライン"
    onlineStatusIndicator.style.backgroundColor = "lightgreen"

    await new Promise(resolve => setTimeout(resolve, 1000));
  }
});

pingStopBtn.addEventListener('click', () => {
  pingRunning = false;
  checkOnlineText.innerText = "オフライン"
  onlineStatusIndicator.style.backgroundColor = "lightgreen"


});

