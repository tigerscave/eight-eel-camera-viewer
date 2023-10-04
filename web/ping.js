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

//オフライン⇔オンラインイベント関数のまとめ
function displayOfflineEvent() {
  onOfflineText.innerText = "オフライン "
  onlineStatusIndicator.style.backgroundColor = "lightgray"
  pingResultValue.textContent = "(通信データなし)";
};

function displayOnlineEvent() {
  onOfflineText.innerText = "オンライン";
  onlineStatusIndicator.style.backgroundColor = "lightgreen";
}

//IPアドレス関係
const ipAddressInput = document.getElementById("ip-address-input")
const connectIpAddressBtn = document.getElementById("connect-ip-address-btn")
const cameraViewer = document.getElementById("camera-viewer")
const pingResultValue = document.getElementById("ping-result-value")
const onlineStatusIndicator = document.getElementById("online-status-indicatator")
const onOfflineText = document.getElementById("on-offline-text")

eel.expose(update_ping_result);
function update_ping_result(result) {
  const match = result.match(/time=(\d+\.\d+)\s*ms/);
  const pingTime = match[1]
  pingResultValue.textContent = `（通信時間：${pingTime}ミリ秒）`;
}

connectIpAddressBtn.addEventListener('click', async () => {
  const host = ipAddressInput.value;//pingが通信する相手は、入力されたIPアドレス
  try {
    const res = eel.ping_host(host);
    displayOnlineEvent();
  } catch (error) {
    displayOfflineEvent();
  }
  if (connectIpAddressBtn.innerText === "編集") {
    editIpAddressMode();
  } else if (connectIpAddressBtn.innerText === "保存") {
    importIpAddressMode();
  }
  await eel.restart_ping_host(newHost)();
});

//ページを読み込んだ際の挙動
window.addEventListener('load', async () => {
  importStoredIpAddress();
  const host = storedIpAddress;//ローカルストレージの値をhostに代入
  if (storedIpAddress) {
    ipAddressInput.value = storedIpAddress;
    cameraViewer.src = "http://" + storedIpAddress + "/ImageViewer?Mode=Motion&Resolution=640x360&Quality=Standard&Interval=10";
  }
  let pingLoopActive = true;

  async function pingLoop() {
    while (pingLoopActive) {
      try {
        const res = await eel.ping_host(host);
        if (res === "Ping failed") {
          displayOfflineEvent();
        } else {
          displayOnlineEvent();
        }
      } catch (error) {
        displayOfflineEvent();
      }
      await new Promise(relolve => setTimeout(relolve, 1000));
    }
  }
  pingLoop();
});
