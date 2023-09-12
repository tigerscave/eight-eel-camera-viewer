//IPアドレス関係
const ipAddressInput = document.getElementById("ip-address-input")
const connectIpAddressBtn = document.getElementById("connect-ip-address-btn")
const cameraViewer = document.getElementById("camera-viewer")
const networkMessage = document.getElementById("network-message")
const pingResultValue = document.getElementById("ping-value")
const viewerModeText = document.getElementById("network-message")
const onlineStatusIndicator = document.getElementById("check-online")

let pingRunning = false;//最初はpingを走らせない
let pingResultElement;
const host = ipAddressInput.value;//pingが通信する相手は、入力されたIPアドレス

connectIpAddressBtn.addEventListener('click', async () => {
  //python疎通確認
  pingRunning = true;
  const startTime = new Date().getTime(); // ping開始時間
  const result = await eel.ping_host(host)(); // ping_host関数を非同期で呼び出す
  const endTime = new Date().getTime(); // ping終了時間
  const pingTime = endTime - startTime; // ping実行時間
  if (!pingResultElement) {
    pingResultElement = document.createElement("span");
    pingResultElement.classList.add("new-span-class");
    pingResultValue.parentNode.appendChild(pingResultElement);
  }
  //pingの値を上書き(現在では、IPアドレスが読み込めなくてもオンラインと返してしまう)
  pingResultElement.textContent = `${pingTime}ミリ秒 )`;
  viewerModeText.innerText = "オンライン "
  onlineStatusIndicator.style.backgroundColor = "lightgreen"

  await new Promise(resolve => setTimeout(resolve, 1000));

  if (connectIpAddressBtn.innerText === "編集") {
    connectIpAddressBtn.innerText = "保存";
    ipAddressInput.disabled = false; //編集モードは、IPアドレスを入力できる
    connectIpAddressBtn.style.background = "#EEEEEE";
  } else if (connectIpAddressBtn.innerText === "保存") {
    connectIpAddressBtn.innerText = "編集";
    //入力されたIPアドレスの値を、カメラビューワーに反映させる。
    cameraViewer.src = "http://" + ipAddressInput.value + "/ImageViewer?Mode=Motion&Resolution=640x360&Quality=Standard&Interval=10";
    ipAddressInput.disabled = true;
    localStorage.setItem('ip-address', ipAddressInput.value);
    connectIpAddressBtn.style.background = "#D9E5FF";
  }
});

//リロード時に、IPアドレスの値が入力されていたら、カメラビューワーに反映させる。
window.addEventListener('load', () => {
  // localStorageからIPアドレスを取得
  const storedIpAddress = localStorage.getItem('ip-address');
  if (storedIpAddress) {
    // IPアドレスの入力フィールドに値を設定
    ipAddressInput.value = storedIpAddress;

    // カメラビューワーに反映
    cameraViewer.src = "http://" + storedIpAddress + "/ImageViewer?Mode=Motion&Resolution=640x360&Quality=Standard&Interval=10";

    // Pingを1秒おきに実行
    setInterval(() => {
      pingHost(storedIpAddress);
    }, 1000);
  }
});

// async function pingHost(host) {
//   pingRunning = true;
//   let pingResultElement = document.querySelector(".new-span-class")
//   if (!pingResultElement) {
//     pingResultElement = document.createElement("span");
//     pingResultElement.classList.add("new-span-class");
//     pingResultValue.parentNode.appendChild(pingResultElement);
//   }
//   while (pingRunning) {
//     try {
//       //python疎通確認
//       pingRunning = true;
//       const startTime = new Date().getTime(); // ping開始時間
//       const result = await eel.ping_host(host)();
//       const endTime = new Date().getTime(); // ping終了時間
//       const pingTime = endTime - startTime; // ping実行時間

//       pingResultElement.textContent = `${pingTime}ミリ秒 )`;
//       viewerModeText.innerText = "オンライン "
//       onlineStatusIndicator.style.backgroundColor = "lightgreen"

//       await new Promise(resolve => setTimeout(resolve, 1000));

//     } catch (error) {
//       viewerModeText.innerText = "オフライン "
//       onlineStatusIndicator.style.backgroundColor = "lightgray"
//     }
//   }
// }


