'use strict'

//更新ボタン
const reloadBtn = document.getElementById("reload-btn")
const reloadText = document.getElementById("reload-text")
const interval = setInterval(() => {
  eel.check_online_status()
}, 1000);

reloadBtn.addEventListener('click', () => {
  clearInterval(interval);
  location.reload()
});

//Webページの拡大、縮小ボタン
const zoomInScreenBtn = document.getElementById("zoom-in-screen-btn")
const zoomOutScreenBtn = document.getElementById("zoom-out-screen-btn")
const screenPage = document.getElementById("screen-page")
const screenZoomLevel = document.getElementById("screen-zoom-level")

let zoomLevel = 1.0; //初期値を1.0とする

zoomInScreenBtn.addEventListener('click', () => {
  zoomLevel = zoomLevel + 0.1;
  screenPage.style.transformOrigin = `top left`;//左上を基準
  screenPage.style.transform = `scale(${zoomLevel})`;//0.1ずつ拡大
  localStorage.setItem("zoomLevel", zoomLevel)
  screenZoomLevel.innerText = zoomLevel.toFixed(1);
});

zoomOutScreenBtn.addEventListener('click', () => {
  zoomLevel = zoomLevel - 0.1;
  screenPage.style.transformOrigin = `top left`;
  screenPage.style.transform = `scale(${zoomLevel})`;
  localStorage.setItem("zoomLevel", zoomLevel)
  screenZoomLevel.innerText = zoomLevel.toFixed(1);
});

//すっきりモードON、OFFボタン
const sukkiriOn = document.getElementById("change-ui-on-btn")
const sukkiriOff = document.getElementById("change-ui-off-btn")
let isSukkiri = false;

sukkiriOn.addEventListener('click', () => {
  isSukkiri = true;
  localStorage.setItem("sukkiriMode", "true");
  document.querySelectorAll('.sukkiri').forEach((element) => {
    element.classList.add('ui-hidden');
  });
  document.querySelectorAll('.sukkiri-on').forEach((element)=>{
    element.classList.remove('ui-hidden');
  });
  //すっきりモードがONのときに、IPアドレスが未入力の場合、iframeを非表示にする。
  let ipAddressInput = document.getElementById("ip-address-input");
  let ipAddressInput2 = document.getElementById("ip-address-input2");
  let ipAddressInput3 = document.getElementById("ip-address-input3");
  if(ipAddressInput.value === "") {
    document.querySelectorAll('.iframe-label1').forEach((element) => {
      element.classList.add('ui-hidden');
    });
  }
  if(ipAddressInput2.value === "") {
    document.querySelectorAll('.iframe-label2').forEach((element) => {
      element.classList.add('ui-hidden');
    });
  }
  if(ipAddressInput3.value === "") {
    document.querySelectorAll('.iframe-label3').forEach((element) => {
      element.classList.add('ui-hidden');
    });
  }
});

sukkiriOff.addEventListener('click', () => {
  isSukkiri = false;
  localStorage.setItem("sukkiriMode", "false")
  document.querySelectorAll('.sukkiri').forEach((element) => {
    element.classList.remove('ui-hidden')
  });
  document.querySelectorAll('.sukkiri-on').forEach((element) => {
    element.classList.add('ui-hidden')
  });
    //すっきりモードがOFFのときに、iframeを表示する。
  document.querySelectorAll('.iframe-label1').forEach((element) => {
    element.classList.remove('ui-hidden');
  });
  document.querySelectorAll('.iframe-label2').forEach((element) => {
    element.classList.remove('ui-hidden');
  });
  document.querySelectorAll('.iframe-label3').forEach((element) => {
    element.classList.remove('ui-hidden');
  });
});

//ローカルストレージから、Webページのズームレベル・すっきりモード読み込み
function loadUIState() {
  const sukkiriMode = localStorage.getItem("sukkiriMode");
  const storagedZoomLevel = localStorage.getItem("zoomLevel");
  if (storagedZoomLevel !== null) {
    zoomLevel = parseFloat(storagedZoomLevel);
    if (!isNaN(zoomLevel)) {
      screenPage.style.transformOrigin = "top left";
      screenPage.style.transform = `scale(${zoomLevel.toFixed(1)})`;
      screenZoomLevel.innerText = zoomLevel.toFixed(1);
    }
  } else {
    zoomLevel = 1.0
    screenZoomLevel.innerText = zoomLevel.toFixed(1);
  }
  if (sukkiriMode === "true") {
    sukkiriOn.click();
  } else {
    sukkiriOff.click();
  }
}
loadUIState();

//ビューワーの拡大縮小ボタン
const zoomInCameraBtn = document.getElementById("zoom-in-camera-btn")
const zoomOutCameraBtn = document.getElementById("zoom-out-camera-btn")

zoomInCameraBtn.addEventListener('click', () => {
  cameraViewer.src = "http://" + ipAddressInput.value + "/cgi-bin/directctrl?zoom=1";
});

zoomOutCameraBtn.addEventListener('click', () => {
  cameraViewer.src = "http://" + ipAddressInput.value + "/cgi-bin/directctrl?zoom=-1";
});

//ビューワーのプリセット
//保存①〜③ボタン
const savePreset1Btn1 = document.getElementById('save-angle1') // first-angle-btn
const savePreset1Btn2 = document.getElementById('save-angle2')
const savePreset1Btn3 = document.getElementById('save-angle3')

savePreset1Btn1.addEventListener('click', () => {
  eel.preset_request(ipAddressInput.value, 1);
});

savePreset1Btn2.addEventListener('click', () => {
  eel.preset_request(ipAddressInput.value, 2);
});

savePreset1Btn3.addEventListener('click', () => {
  eel.preset_request(ipAddressInput.value, 3);
});

//移動①〜③ボタン
const moveAngle1Btn = document.getElementById("move-angle1")
const moveAngle2Btn = document.getElementById("move-angle2")
const moveAngle3Btn = document.getElementById("move-angle3")

moveAngle1Btn.addEventListener('click', () => {
  cameraViewer.src = "http://" + ipAddressInput.value + "/cgi-bin/camctrl?preset=1";
});
moveAngle2Btn.addEventListener('click', () => {
  cameraViewer.src = "http://" + ipAddressInput.value + "/cgi-bin/camctrl?preset=2";
});
moveAngle3Btn.addEventListener('click', () => {
  cameraViewer.src = "http://" + ipAddressInput.value + "/cgi-bin/camctrl?preset=3";
});

//上下左右の視点移動ボタン
const upArrowBtn = document.getElementById("up-btn")
const downArrowBtn = document.getElementById("down-btn")
const leftArrowBtn = document.getElementById("left-btn")
const rightArrowBtn = document.getElementById("right-btn")

upArrowBtn.addEventListener('click', () => {
  cameraViewer.src = "http://" + ipAddressInput.value + "/cgi-bin/camctrl?pan=0&tilt=-1&Language=0";
});

downArrowBtn.addEventListener('click', () => {
  cameraViewer.src = "http://" + ipAddressInput.value + "/cgi-bin/camctrl?pan=0&tilt=1&Language=0";
});

leftArrowBtn.addEventListener('click', () => {
  cameraViewer.src = "http://" + ipAddressInput.value + "/cgi-bin/camctrl?pan=-1&tilt=0&Language=0";
});

rightArrowBtn.addEventListener('click', () => {
  cameraViewer.src = "http://" + ipAddressInput.value + "/cgi-bin/camctrl?pan=1&tilt=0&Language=0";
});

//比率①、②ボタン
const wideFrameSizeBtn = document.getElementById("wide-frame-size")
const smallFrameSizeBtn = document.getElementById("small-frame-size")

wideFrameSizeBtn.addEventListener('click', () => {
  cameraViewer.style.width = '800px'
  cameraViewer.style.height = '360px';
  localStorage.setItem("frameWidth", cameraViewer.style.width.toString());
  localStorage.setItem("frameHeight", cameraViewer.style.height.toString());
});

smallFrameSizeBtn.addEventListener('click', () => {
  cameraViewer.style.width = '500px'
  cameraViewer.style.height = '500px';
  localStorage.setItem("frameWidth", cameraViewer.style.width.toString());
  localStorage.setItem("frameHeight", cameraViewer.style.height.toString());
});

document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("frameWidth") && localStorage.getItem("frameHeight")) {
    const frameWidth = localStorage.getItem("frameWidth");
    const frameHeight = localStorage.getItem("frameHeight");

    cameraViewer.style.width = frameWidth;
    cameraViewer.style.height = frameHeight;
  }
});

//ビューワーサイドのボタン
const angle1SideBtn = document.getElementById("side1")
const angle2SideBtn = document.getElementById("side2")
const angle3SideBtn = document.getElementById("side3")
const zoomInSideBtn = document.getElementById("side+")
const zoomOutSideBtn = document.getElementById("side-")
const upSideBtn = document.getElementById("side-up")
const downSideBtn = document.getElementById("side-down")
const leftSideBtn = document.getElementById("side-left")
const rightSideBtn = document.getElementById("side-right")

angle1SideBtn.addEventListener('click', () => {
  cameraViewer.src = "http://" + ipAddressInput.value + "/cgi-bin/camctrl?preset=1";
});

angle2SideBtn.addEventListener('click', () => {
  cameraViewer.src = "http://" + ipAddressInput.value + "/cgi-bin/camctrl?preset=2";
});

angle3SideBtn.addEventListener('click', () => {
  cameraViewer.src = "http://" + ipAddressInput.value + "/cgi-bin/camctrl?preset=3";
});

zoomInSideBtn.addEventListener('click', () => {
  cameraViewer.src = "http://" + ipAddressInput.value + "/cgi-bin/directctrl?zoom=1";
});

zoomOutSideBtn.addEventListener('click', () => {
  cameraViewer.src = "http://" + ipAddressInput.value + "/cgi-bin/directctrl?zoom=-1";
});

upSideBtn.addEventListener('click', () => {
  cameraViewer.src = "http://" + ipAddressInput.value + "/cgi-bin/camctrl?pan=0&tilt=-1&Language=0";
});

downSideBtn.addEventListener('click', () => {
  cameraViewer.src = "http://" + ipAddressInput.value + "/cgi-bin/camctrl?pan=0&tilt=1&Language=0";
});

leftSideBtn.addEventListener('click', () => {
  cameraViewer.src = "http://" + ipAddressInput.value + "/cgi-bin/camctrl?pan=-1&tilt=0&Language=0";
});

rightSideBtn.addEventListener('click', () => {
  cameraViewer.src = "http://" + ipAddressInput.value + "/cgi-bin/camctrl?pan=1&tilt=0&Language=0";
});



