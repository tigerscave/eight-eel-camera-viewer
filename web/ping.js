//IPアドレス関係
const ipAddressInput = document.getElementById("ip-address-input")
const connectIpAddressBtn = document.getElementById("connect-ip-address-btn")
const cameraViewer = document.getElementById("camera-viewer")
const pingResultValue = document.getElementById("ping-value")
const viewerModeText = document.getElementById("network-message")
const onlineStatusIndicator = document.getElementById("check-online")

eel.expose(update_ping_result);
function update_ping_result(result) {
  const match = result.match(/time=(\d+\.\d+)\s*ms/);
  const pingTime = match[1]
  pingResultValue.textContent = `（通信時間：${pingTime}ミリ秒）`;
}

connectIpAddressBtn.addEventListener('click', () => {
  const host = ipAddressInput.value;//pingが通信する相手は、入力されたIPアドレス
  try {
    const res = eel.ping_host(host);
    viewerModeText.innerText = "オンライン ";
    onlineStatusIndicator.style.backgroundColor = "lightgreen";
  } catch (error) {
    pingResultValue.textContent = "(通信データなし)"
    viewerModeText.innerText = "オフライン "
    onlineStatusIndicator.style.backgroundColor = "lightgray"
  }

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

//ページを読み込んだ際の挙動
window.addEventListener('load', () => {
  // localStorageからIPアドレスを取得し、カメラビューワーに反映
  const storedIpAddress = localStorage.getItem('ip-address');
  const host = storedIpAddress;//ローカルストレージの値をhostに代入
  if (storedIpAddress) {
    ipAddressInput.value = storedIpAddress;
    cameraViewer.src = "http://" + storedIpAddress + "/ImageViewer?Mode=Motion&Resolution=640x360&Quality=Standard&Interval=10";
  }
  const res = eel.ping_host(host);
  if (!res.ok) {
    throw new Error("HTTP error:" + res.status);
  }
  const data = res.text();
  return data;
});
