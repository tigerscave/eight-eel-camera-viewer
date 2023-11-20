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
  save_request_preset7(ipAddressInput3.value);
});

function save_request_preset7(ipAddress){
  eel.preset_request(ipAddress,"1");
};

saveAngle2Btn3.addEventListener('click', () => {
  save_request_preset8(ipAddressInput3.value);
});
function save_request_preset8(ipAddress){
  eel.preset_request(ipAddress,"2");
};

saveAngle3Btn3.addEventListener('click', () => {
  save_request_preset9(ipAddressInput3.value);
});
function save_request_preset9(ipAddress){
  eel.preset_request(ipAddress,"3");
};

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
  cameraViewer3.style.width = '800px'
  cameraViewer3.style.height = '360px';
  localStorage.setItem("frameWidth3" , cameraViewer3.style.width.toString())
  localStorage.setItem("frameHeight3" , cameraViewer3.style.height.toString())
});

smallFrameSizeBtn3.addEventListener('click', () => {
  cameraViewer3.style.width = '500px'
  cameraViewer3.style.height = '500px';
  localStorage.setItem("frameWidth3" , cameraViewer3.style.width.toString())
  localStorage.setItem("frameHeight3" , cameraViewer3.style.height.toString())
});

document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("frameWidth3") && localStorage.getItem("frameHeight3")) {
    const frameWidth3 = localStorage.getItem("frameWidth3");
    const frameHeight3 = localStorage.getItem("frameHeight3");

    cameraViewer3.style.width = frameWidth3;
    cameraViewer3.style.height = frameHeight3;
  }
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
