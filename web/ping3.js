//IPアドレス関係
const ipAddressInput3 = document.getElementById("ip-address-input3")
const connectIpAddressBtn3 = document.getElementById("connect-ip-address-btn3")
const cameraViewer3 = document.getElementById("camera-viewer3")
const onlineStatusIndicators3 = document.querySelectorAll(".online-status-indicatators3")
const onOfflineText3 = document.getElementById("on-offline-text3")

//IPアドレス編集モード⇔読み込みモード切り替え関数のまとめ
function editIpAddressMode3() {
  connectIpAddressBtn3.innerText = "保存";
  ipAddressInput3.disabled = false;
  connectIpAddressBtn3.style.background = "#EEEEEE";
};

function importIpAddressMode3() {
  connectIpAddressBtn3.innerText = "編集";
  cameraViewer3.src = "http://" + ipAddressInput3.value + "/ImageViewer?Mode=Motion&Resolution=640x360&Quality=Standard&Interval=10";
  ipAddressInput3.disabled = true;
  localStorage.setItem('ip-address3', ipAddressInput3.value);
  connectIpAddressBtn3.style.background = "#D9E5FF";
}

//オフラインイベント関数のまとめ
function displayOfflineEvent3() {
  onOfflineText3.innerText = "オフライン （通信データなし）"
  onlineStatusIndicators3.forEach(indicator => {
    indicator.style.backgroundColor = "lightgray"
  });
};

eel.expose(update_ping_result3);
function update_ping_result3(response_time3) {
  const match3 = response_time3.match(/time=(\d+\.\d+)\s*ms/);
  if (match3 && match3.length >= 2) {
    response_time3 = match3[1];
    onOfflineText3.textContent = `オンライン（通信時間:${response_time3}ミリ秒）`
    onlineStatusIndicators3.forEach(indicator => {
      indicator.style.backgroundColor = "lightgreen";
    });
  } else {
    displayOfflineEvent3()
  }
}

connectIpAddressBtn3.addEventListener('click', async () => {
  const host3 = ipAddressInput3.value;//pingが通信する相手は、入力されたIPアドレス
  if (connectIpAddressBtn3.innerText === "編集") {
    editIpAddressMode3();
  } else if (connectIpAddressBtn3.innerText === "保存") {
    importIpAddressMode3();
  }
});

//ページを読み込んだ際の挙動
window.addEventListener('load', async () => {
  const storedIpAddress3 = localStorage.getItem('ip-address3');
  const host3 = storedIpAddress3
  if (storedIpAddress3) {
    ipAddressInput3.value = storedIpAddress3
    cameraViewer3.src = "http://" + storedIpAddress3 + "/ImageViewer?Mode=Motion&Resolution=640x360&Quality=Standard&Interval=10";
  }
});

eel.expose(ipAddressStatus3);
function ipAddressStatus3() {
  return ipAddressInput3.value;
}
