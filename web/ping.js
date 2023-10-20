//IPアドレス編集モード⇔読み込みモード切り替え関数のまとめ
function editIpAddressMode() {
  connectIpAddressBtn.innerText = "保存";
  ipAddressInput.disabled = false;
  connectIpAddressBtn.style.background = "#EEEEEE";
};

function importIpAddressMode() {
  connectIpAddressBtn.innerText = "編集";
  cameraViewer.src = "http://" + ipAddressInput.value + "/ImageViewer?Mode=Motion&Resolution=640x360&Quality=Standard&Interval=10";
  ipAddressInput.disabled = true;
  localStorage.setItem('ip-address', ipAddressInput.value);
  connectIpAddressBtn.style.background = "#D9E5FF";
}

//オフラインイベント関数のまとめ
function displayOfflineEvent() {
  onOfflineText.innerText = "オフライン （通信データなし）"
  onlineStatusIndicator.style.backgroundColor = "lightgray"
};

//IPアドレス関係の関数定義一覧
const ipAddressInput = document.getElementById("ip-address-input")
const connectIpAddressBtn = document.getElementById("connect-ip-address-btn")
const cameraViewer = document.getElementById("camera-viewer")
const onlineStatusIndicator = document.getElementById("online-status-indicatator")
const onOfflineText = document.getElementById("on-offline-text")

eel.expose(update_ping_result);
function update_ping_result(response_time) {
  const match = response_time.match(/time=(\d+\.\d+)\s*ms/);
  if (match && match.length >= 2) {
    response_time = match[1];
    onOfflineText.textContent = `オンライン（通信時間:${response_time}ミリ秒）`
    onlineStatusIndicator.style.backgroundColor = "lightgreen";
  } else {
    displayOfflineEvent()
  }
}

connectIpAddressBtn.addEventListener('click', async () => {
  const host = ipAddressInput.value;//pingが通信する相手は、入力されたIPアドレス
  try {
    const res = await eel.ping_monitoring(host);
  } catch (error) {
    displayOfflineEvent();
  }
  if (connectIpAddressBtn.innerText === "編集") {
    editIpAddressMode();
  } else if (connectIpAddressBtn.innerText === "保存") {
    importIpAddressMode();
  }
});

//ページを読み込んだ際の挙動
window.addEventListener('load', async () => {
  const storedIpAddress = localStorage.getItem('ip-address');
  const host = storedIpAddress
  if (storedIpAddress) {
    ipAddressInput.value = storedIpAddress
    cameraViewer.src = "http://" + storedIpAddress + "/ImageViewer?Mode=Motion&Resolution=640x360&Quality=Standard&Interval=10";
  }

  //localStorageに保存されたIPアドレスの値に対してping疎通を行う。
  let pingLoopActive = true;

  async function pingLoop() {
    while (pingLoopActive) {
      try {
        const res = await eel.ping_monitoring(host);
        if (res === "オフライン(通信データなし）") {
          displayOfflineEvent();
        }
      } catch (error) {
        displayOfflineEvent();
      }
      await new Promise(relolve => setTimeout(relolve, 1000)); //1秒おきにping行う
    }
  }
  //pingLoopActive = falseが入ったら、pingLoop()を抜けてしまう。IPアドレスの疎通が取れなくても、ping疎通を続ける必要があるため記述
  pingLoop();
});

eel.expose(changeOnlineStatus);
function changeOnlineStatus(value) {
  onOfflineText.innerText = value;
}

eel.expose(ipAddressStatus);
function ipAddressStatus() {
  return ipAddressInput.value;
}
