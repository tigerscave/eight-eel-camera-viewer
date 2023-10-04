//IPアドレス関係
const ipAddressInput = document.getElementById("ip-address-input")
const connectIpAddressBtn = document.getElementById("connect-ip-address-btn")
const cameraViewer = document.getElementById("camera-viewer")

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

//ping疎通 pythonとやりとり
const pingValue = document.getElementById("ping-value")
const onlineStatusText = document.getElementById("online-status-text")
const onlineStatusIndicator = document.getElementById("online-status-indicatator")

//ping疎通が、とれている時のUI表示
function display_update_ping(result) {
  if (result.includes("Unknown host error")) {
    displayOfflineEvent();
  } else {
    const match = result.match(/time=(\d+\.\d+)\s*ms/);
    const pingTime = match ? match[1] : "N/A";
    pingValue.textContent = `（通信時間：${pingTime}ミリ秒）`;
    onlineStatusText.innerText = "オンライン";
    onlineStatusIndicator.style.backgroundColor = "lightgreen";
  }
};
eel.expose(display_update_ping);

function displayOfflineEvent() {
  pingValue.textContent = "(通信データなし)"
  onlineStatusText.innerText = "オフライン "
  onlineStatusIndicator.style.backgroundColor = "lightgray"
};

//①IPアドレスの値が入力される。②保存ボタンを押したら、ping疎通を開始する。
connectIpAddressBtn.addEventListener('click', () => {
  try {
    eel.kill_ping_process(); //古いIPアドレスと疎通切断
    eel.delete_old_ip_address(host);
    let newHost = ipAddressInput.value;//newHostに新しいIPアドレスの値を代入
    eel.restart_ping_host(newHost) //新しいIPアドレスと疎通開始
    display_update_ping(newHost); //UIに反映
  } catch (error) {
    displayOfflineEvent(); //疎通が取れなかった際に、オフライン表示
    pingLoopActive = false;
  }
  if (connectIpAddressBtn.innerText === "編集") {
    editIpAddressMode();
  } else {
    importIpAddressMode();
  }
});

//疎通がとれているときのpingループの設定
let pingLoopActive = true;

async function pingLoop(host) {
  while (pingLoopActive) {
    try {
      const response = await eel.ping_host(host)();
      display_update_ping(response);
    } catch (error) {
      displayOfflineEvent();
      pingLoopActive = false;
    }
  }
}

function importStoredIpAddress() {
  const storedIpAddress = localStorage.getItem('ip-address');
  ipAddressInput.value = storedIpAddress;
  cameraViewer.src = "http://" + storedIpAddress + "/ImageViewer?Mode=Motion&Resolution=640x360&Quality=Standard&Interval=10";
}

//ページを読み込んだ際の挙動
window.addEventListener('load', async () => {
  importStoredIpAddress();
  const host = storedIpAddress;//ローカルストレージの値をhostに代入

  pingLoop(host);
});
