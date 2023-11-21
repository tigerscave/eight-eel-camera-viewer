//IPアドレス関係
const ipAddressInput2 = document.getElementById("ip-address-input2")
const connectIpAddressBtn2 = document.getElementById("connect-ip-address-btn2")
const cameraViewer2 = document.getElementById("camera-viewer2")
const onlineStatusIndicators2 = document.querySelectorAll(".online-status-indicatators2")
const onOfflineText2 = document.getElementById("on-offline-text2")

//IPアドレス編集モード⇔読み込みモード切り替え関数のまとめ
function editIpAddressMode2() {
  connectIpAddressBtn2.innerText = "保存";
  ipAddressInput2.disabled = false;
  connectIpAddressBtn2.style.background = "#EEEEEE";
};

function importIpAddressMode2() {
  connectIpAddressBtn2.innerText = "編集";
  cameraViewer2.src = "http://" + ipAddressInput2.value + "/ImageViewer?Mode=Motion&Resolution=640x360&Quality=Standard&Interval=10";
  ipAddressInput2.disabled = true;
  localStorage.setItem('ip-address2', ipAddressInput2.value);
  connectIpAddressBtn2.style.background = "#D9E5FF";
}

//オフラインイベント関数のまとめ
function displayOfflineEvent2() {
  onOfflineText2.innerText = "オフライン （通信データなし）"
  onlineStatusIndicators2.forEach(indicator => {
    indicator.style.backgroundColor = "lightgray"
  });
};


eel.expose(update_ping_result2);
function update_ping_result2(response_time2) {
  const match2 = response_time2.match(/time=(\d+\.\d+)\s*ms/);
  if (match2 && match2.length >= 2) {
    response_time2 = match2[1];
    onOfflineText2.textContent = `オンライン（通信時間:${response_time2}ミリ秒）`
    onlineStatusIndicators2.forEach(indicator => {
      indicator.style.backgroundColor = "lightgreen";
    });
  } else {
    displayOfflineEvent2()
  }
}

connectIpAddressBtn2.addEventListener('click', async () => {
  const host2 = ipAddressInput2.value;//pingが通信する相手は、入力されたIPアドレス
  if (connectIpAddressBtn2.innerText === "編集") {
    editIpAddressMode2();
  } else if (connectIpAddressBtn2.innerText === "保存") {
    importIpAddressMode2();
  }
});

//ページを読み込んだ際の挙動
window.addEventListener('load', async () => {
  const storedIpAddress2 = localStorage.getItem('ip-address2');
  const host2 = storedIpAddress2
  if (storedIpAddress2) {
    ipAddressInput2.value = storedIpAddress2
    cameraViewer2.src = "http://" + storedIpAddress2 + "/ImageViewer?Mode=Motion&Resolution=640x360&Quality=Standard&Interval=10";
  }
});

eel.expose(ipAddressStatus2);
function ipAddressStatus2() {
  return ipAddressInput2.value;
}
