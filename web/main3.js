'use strict'

//ビューワーの拡大縮小ボタン
const zoomInCameraBtn3 = document.getElementById("zoom-in-camera-btn3")
const zoomOutCameraBtn3 = document.getElementById("zoom-out-camera-btn3")

zoomInCameraBtn3.addEventListener('click', () => {
  cameraViewer3.src = "http://" + ipAddressInput3.value + "/cgi-bin/directctrl?zoom=1";
});

zoomOutCameraBtn3.addEventListener('click', () => {
  cameraViewer3.src = "http://" + ipAddressInput3.value + "/cgi-bin/directctrl?zoom=-1";
});

//ビューワーのプリセット
//保存①〜③ボタン
const saveAngle1Btn3 = document.getElementById('save-angle13') // first-angle-btn
const saveAngle2Btn3 = document.getElementById('save-angle23')
const saveAngle3Btn3 = document.getElementById('save-angle33')

saveAngle1Btn3.addEventListener('click', () => {
  cameraViewer3.src = "http://" + ipAddressInput3.value + "/cgi-bin/camposiset?presetset=1"
  //画面遷移を防止するため、ページをリロードする。
  setTimeout(() => {
    location.reload()
  }, 100)
});

saveAngle2Btn3.addEventListener('click', () => {
  cameraViewer3.src = "http://" + ipAddressInput3.value + "/cgi-bin/camposiset?presetset=2"
  setTimeout(() => {
    location.reload()
  }, 100)
});

saveAngle3Btn3.addEventListener('click', () => {
  cameraViewer3.src = "http://" + ipAddressInput3.value + "/cgi-bin/image_adjust?brightness=3"
  setTimeout(() => {
    location.reload()
  }, 100)
});

//移動①〜③ボタン
const moveAngle1Btn3 = document.getElementById("move-angle13")
const moveAngle2Btn3 = document.getElementById("move-angle23")
const moveAngle3Btn3 = document.getElementById("move-angle33")

moveAngle1Btn3.addEventListener('click', () => {
  cameraViewer3.src = "http://" + ipAddressInput3.value + "/cgi-bin/camctrl?preset=1";
});
moveAngle2Btn3.addEventListener('click', () => {
  cameraViewer3.src = "http://" + ipAddressInput3.value + "/cgi-bin/camctrl?preset=2";
});
moveAngle3Btn3.addEventListener('click', () => {
  cameraViewer3.src = "http://" + ipAddressInput3.value + "/cgi-bin/camctrl?preset=3";
});

//上下左右の視点移動ボタン
const upArrowBtn3 = document.getElementById("up-btn3")
const downArrowBtn3 = document.getElementById("down-btn3")
const leftArrowBtn3 = document.getElementById("left-btn3")
const rightArrowBtn3 = document.getElementById("right-btn3")

upArrowBtn3.addEventListener('click', () => {
  cameraViewer3.src = "http://" + ipAddressInput3.value + "/cgi-bin/camctrl?pan=0&tilt=-1&Language=0";
});

downArrowBtn3.addEventListener('click', () => {
  cameraViewer3.src = "http://" + ipAddressInput3.value + "/cgi-bin/camctrl?pan=0&tilt=1&Language=0";
});

leftArrowBtn3.addEventListener('click', () => {
  cameraViewer3.src = "http://" + ipAddressInput3.value + "/cgi-bin/camctrl?pan=-1&tilt=0&Language=0";
});

rightArrowBtn3.addEventListener('click', () => {
  cameraViewer3.src = "http://" + ipAddressInput3.value + "/cgi-bin/camctrl?pan=1&tilt=0&Language=0";
});

//比率①、②ボタン
const wideFrameSizeBtn3 = document.getElementById("wide-frame-size3")
const smallFrameSizeBtn3 = document.getElementById("small-frame-size3")

wideFrameSizeBtn3.addEventListener('click', () => {
  cameraViewer3.style.width = '41rem'
  cameraViewer3.style.height = '21rem';
});

smallFrameSizeBtn3.addEventListener('click', () => {
  cameraViewer3.style.width = '30rem'
  cameraViewer3.style.height = '18rem';
});

//ビューワーサイドのボタン
const angle1SideBtn3 = document.getElementById("side13")
const angle2SideBtn3 = document.getElementById("side23")
const angle3SideBtn3 = document.getElementById("side33")
const zoomInSideBtn3 = document.getElementById("side+3")
const zoomOutSideBtn3 = document.getElementById("side-3")
const upSideBtn3 = document.getElementById("side-up3")
const downSideBtn3 = document.getElementById("side-down3")
const leftSideBtn3 = document.getElementById("side-left3")
const rightSideBtn3 = document.getElementById("side-right3")

angle1SideBtn3.addEventListener('click', () => {
  cameraViewer3.src = "http://" + ipAddressInput3.value + "/cgi-bin/camctrl?preset=1";
});

angle2SideBtn3.addEventListener('click', () => {
  cameraViewer3.src = "http://" + ipAddressInput3.value + "/cgi-bin/camctrl?preset=2";
});

angle3SideBtn3.addEventListener('click', () => {
  cameraViewer3.src = "http://" + ipAddressInput3.value + "/cgi-bin/camctrl?preset=3";
});

zoomInSideBtn3.addEventListener('click', () => {
  cameraViewer3.src = "http://" + ipAddressInput3.value + "/cgi-bin/directctrl?zoom=1";
});

zoomOutSideBtn3.addEventListener('click', () => {
  cameraViewer3.src = "http://" + ipAddressInput3.value + "/cgi-bin/directctrl?zoom=-1";
});

upSideBtn3.addEventListener('click', () => {
  cameraViewer3.src = "http://" + ipAddressInput3.value + "/cgi-bin/camctrl?pan=0&tilt=-1&Language=0";
});

downSideBtn3.addEventListener('click', () => {
  cameraViewer3.src = "http://" + ipAddressInput3.value + "/cgi-bin/camctrl?pan=0&tilt=1&Language=0";
});

leftSideBtn3.addEventListener('click', () => {
  cameraViewer3.src = "http://" + ipAddressInput3.value + "/cgi-bin/camctrl?pan=-1&tilt=0&Language=0";
});

rightSideBtn3.addEventListener('click', () => {
  cameraViewer3.src = "http://" + ipAddressInput3.value + "/cgi-bin/camctrl?pan=1&tilt=0&Language=0";
});
