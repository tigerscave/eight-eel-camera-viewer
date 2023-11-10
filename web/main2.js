'use strict'

//ビューワーの拡大縮小ボタン
const zoomInCameraBtn2 = document.getElementById("zoom-in-camera-btn2")
const zoomOutCameraBtn2 = document.getElementById("zoom-out-camera-btn2")

zoomInCameraBtn2.addEventListener('click', () => {
  cameraViewer2.src = "http://" + ipAddressInput2.value + "/cgi-bin/directctrl?zoom=1";
});

zoomOutCameraBtn2.addEventListener('click', () => {
  cameraViewer2.src = "http://" + ipAddressInput2.value + "/cgi-bin/directctrl?zoom=-1";
});

//ビューワーのプリセット
//保存①〜③ボタン
const saveAngle1Btn2 = document.getElementById('save-angle12') // first-angle-btn
const saveAngle2Btn2 = document.getElementById('save-angle22')
const saveAngle3Btn2 = document.getElementById('save-angle32')

saveAngle1Btn2.addEventListener('click', () => {
  cameraViewer2.src = "http://" + ipAddressInput2.value + "/cgi-bin/camposiset?presetset=1"
});

saveAngle2Btn2.addEventListener('click', () => {
  cameraViewer2.src = "http://nwcadmin:Passwd34@" + ipAddressInput2.value + "/cgi-bin/camposiset?presetset=2"
});

saveAngle3Btn2.addEventListener('click', () => {
  cameraViewer2.src = "http://nwcadmin:Passwd34@" + ipAddressInput2.value + "/cgi-bin/camposiset?presetset=3"
});

//移動①〜③ボタン
const moveAngle1Btn2 = document.getElementById("move-angle12")
const moveAngle2Btn2 = document.getElementById("move-angle22")
const moveAngle3Btn2 = document.getElementById("move-angle32")

moveAngle1Btn2.addEventListener('click', () => {
  cameraViewer2.src = "http://" + ipAddressInput2.value + "/cgi-bin/camctrl?preset=1";
});
moveAngle2Btn2.addEventListener('click', () => {
  cameraViewer2.src = "http://" + ipAddressInput2.value + "/cgi-bin/camctrl?preset=2";
});
moveAngle3Btn2.addEventListener('click', () => {
  cameraViewer2.src = "http://" + ipAddressInput2.value + "/cgi-bin/camctrl?preset=3";
});

//上下左右の視点移動ボタン
const upArrowBtn2 = document.getElementById("up-btn2")
const downArrowBtn2 = document.getElementById("down-btn2")
const leftArrowBtn2 = document.getElementById("left-btn2")
const rightArrowBtn2 = document.getElementById("right-btn2")

upArrowBtn2.addEventListener('click', () => {
  cameraViewer2.src = "http://" + ipAddressInput2.value + "/cgi-bin/camctrl?pan=0&tilt=-1&Language=0";
});

downArrowBtn2.addEventListener('click', () => {
  cameraViewer2.src = "http://" + ipAddressInput2.value + "/cgi-bin/camctrl?pan=0&tilt=1&Language=0";
});

leftArrowBtn2.addEventListener('click', () => {
  cameraViewer2.src = "http://" + ipAddressInput2.value + "/cgi-bin/camctrl?pan=-1&tilt=0&Language=0";
});

rightArrowBtn2.addEventListener('click', () => {
  cameraViewer2.src = "http://" + ipAddressInput2.value + "/cgi-bin/camctrl?pan=1&tilt=0&Language=0";
});

//比率①、②ボタン
const wideFrameSizeBtn2 = document.getElementById("wide-frame-size2")
const smallFrameSizeBtn2 = document.getElementById("small-frame-size2")

wideFrameSizeBtn2.addEventListener('click', () => {
  cameraViewer2.style.width = '800px'
  cameraViewer2.style.height = '360px';
  localStorage.setItem("frameWidth2" , cameraViewer2.style.width.toString())
  localStorage.setItem("frameHeight2", cameraViewer2.style.height.toString())
});

smallFrameSizeBtn2.addEventListener('click', () => {
  cameraViewer2.style.width = '500px'
  cameraViewer2.style.height = '500px';
  localStorage.setItem("frameWidth2" , cameraViewer2.style.width.toString())
  localStorage.setItem("frameHeight2", cameraViewer2.style.height.toString())
});

document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("frameWidth2") && localStorage.getItem("frameHeight2")) {
    const frameWidth2 = localStorage.getItem("frameWidth2");
    const frameHeight2 = localStorage.getItem("frameHeight2");

    cameraViewer2.style.width = frameWidth2;
    cameraViewer2.style.height = frameHeight2;
  }
});

//ビューワーサイドのボタン
const angle1SideBtn2 = document.getElementById("side12")
const angle2SideBtn2 = document.getElementById("side22")
const angle3SideBtn2 = document.getElementById("side32")
const zoomInSideBtn2 = document.getElementById("side+2")
const zoomOutSideBtn2 = document.getElementById("side-2")
const upSideBtn2 = document.getElementById("side-up2")
const downSideBtn2 = document.getElementById("side-down2")
const leftSideBtn2 = document.getElementById("side-left2")
const rightSideBtn2 = document.getElementById("side-right2")

angle1SideBtn2.addEventListener('click', () => {
  cameraViewer2.src = "http://" + ipAddressInput2.value + "/cgi-bin/camctrl?preset=1";
});

angle2SideBtn2.addEventListener('click', () => {
  cameraViewer2.src = "http://" + ipAddressInput2.value + "/cgi-bin/camctrl?preset=2";
});

angle3SideBtn2.addEventListener('click', () => {
  cameraViewer2.src = "http://" + ipAddressInput2.value + "/cgi-bin/camctrl?preset=3";
});

zoomInSideBtn2.addEventListener('click', () => {
  cameraViewer2.src = "http://" + ipAddressInput2.value + "/cgi-bin/directctrl?zoom=1";
});

zoomOutSideBtn2.addEventListener('click', () => {
  cameraViewer2.src = "http://" + ipAddressInput2.value + "/cgi-bin/directctrl?zoom=-1";
});

upSideBtn2.addEventListener('click', () => {
  cameraViewer2.src = "http://" + ipAddressInput2.value + "/cgi-bin/camctrl?pan=0&tilt=-1&Language=0";
});

downSideBtn2.addEventListener('click', () => {
  cameraViewer2.src = "http://" + ipAddressInput2.value + "/cgi-bin/camctrl?pan=0&tilt=1&Language=0";
});

leftSideBtn2.addEventListener('click', () => {
  cameraViewer2.src = "http://" + ipAddressInput2.value + "/cgi-bin/camctrl?pan=-1&tilt=0&Language=0";
});

rightSideBtn2.addEventListener('click', () => {
  cameraViewer2.src = "http://" + ipAddressInput2.value + "/cgi-bin/camctrl?pan=1&tilt=0&Language=0";
});
