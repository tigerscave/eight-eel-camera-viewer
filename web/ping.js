//IPアドレス関係
const ipAddressInput = document.getElementById("ip-address-input")
const connectIpAddressBtn = document.getElementById("connect-ip-address-btn")
const cameraViewer = document.getElementById("camera-viewer")
const networkMessage = document.getElementById("network-message")
const pingResultValue = document.getElementById("ping-value")
const viewerModeText = document.getElementById("network-message")
const onlineStatusIndicator = document.getElementById("check-online")

const host = ipAddressInput.value;//pingが通信する相手は、入力されたIPアドレス

connectIpAddressBtn.addEventListener('click', async () => {
  try {
    const res = await eel.ping_host(host);

    pingResultValue.textContent = `Ping Result: ${res}`
    viewerModeText.innerText = "オンライン "
    onlineStatusIndicator.style.backgroundColor = "lightgreen"
  } catch (error) {
    pingResultValue.textContent = "通信データなし"
    viewerModeText.innerText = "オフライン "
    onlineStatusIndicator.style.backgroundColor = "lightgray"
  }
  await new Promise(resolve => setTimeout(resolve, 1000))

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
window.addEventListener('load', async () => {
  // localStorageからIPアドレスを取得
  const storedIpAddress = localStorage.getItem('ip-address');
  if (storedIpAddress) {
    // IPアドレスの入力フィールドに値を設定
    ipAddressInput.value = storedIpAddress;
    // カメラビューワーに反映
    cameraViewer.src = "http://" + storedIpAddress + "/ImageViewer?Mode=Motion&Resolution=640x360&Quality=Standard&Interval=10";
  }
  const res = await fetch(`https://ping-tool.example.com/ping?host=${host}`)
  if (!res.ok) {
    throw new Error("HTTP error:" + res.status);
  }
  const data = await res.text();
  return data;
});