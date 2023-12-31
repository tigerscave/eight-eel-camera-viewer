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
  onlineStatusIndicator3.style.backgroundColor = "lightgray"
};

//IPアドレス関係
const ipAddressInput3 = document.getElementById("ip-address-input3")
const connectIpAddressBtn3 = document.getElementById("connect-ip-address-btn3")
const cameraViewer3 = document.getElementById("camera-viewer3")
const onlineStatusIndicator3 = document.getElementById("online-status-indicatator3")
const onOfflineText3 = document.getElementById("on-offline-text3")

eel.expose(update_ping_result3);
function update_ping_result3(response_time3) {
  const match3 = response_time3.match(/time=(\d+\.\d+)\s*ms/);
  if (match3 && match3.length >= 2) {
    response_time3 = match3[1];
    onOfflineText3.textContent = `オンライン（通信時間:${response_time3}ミリ秒）`
    onlineStatusIndicator3.style.backgroundColor = "lightgreen";
  } else {
    displayOfflineEvent3()
  }
}

connectIpAddressBtn3.addEventListener('click', async () => {
  const host3 = ipAddressInput3.value;//pingが通信する相手は、入力されたIPアドレス
  try {
    const res3 = await eel.ping_host3(host3);
  } catch (error) {
    displayOfflineEvent3();
  }
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
  let pingLoopActive3 = true;

  async function pingLoop3() {
    while (pingLoopActive3) {
      try {
        const res3 = await eel.ping_host3(host3);
        if (res3 === "オフライン(通信データなし）") {
          displayOfflineEvent3();
        }
      } catch (error) {
        displayOfflineEvent3();
      }
      await new Promise(relolve => setTimeout(relolve, 1000));
    }
  }
  pingLoop3();
});

eel.expose(changeOnlineStatus3);
function changeOnlineStatus3(value) {
  onOfflineText3.innerText = value;
}

eel.expose(ipAddressStatus3);
function ipAddressStatus3() {
  return ipAddressInput3.value;
}
