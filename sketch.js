let capture;
let overlayGraphics; // 用於繪製的圖形緩衝區

function setup() {
  createCanvas(windowWidth, windowHeight); // 使用視窗大小
  capture = createCapture(VIDEO); // 擷取攝影機影像
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像大小為畫布的 80%
  capture.hide(); // 隱藏原始的 HTML 視訊元素

  // 創建與視訊畫面大小相同的圖形緩衝區
  overlayGraphics = createGraphics(capture.width, capture.height);
  overlayGraphics.clear(); // 清除緩衝區，確保透明背景

  // 在圖形緩衝區中繪製文字
  overlayGraphics.textAlign(CENTER, CENTER); // 設定文字對齊方式為置中
  overlayGraphics.textSize(24); // 設定文字大小
  overlayGraphics.fill(255); // 設定文字顏色為不透明白色
  overlayGraphics.text("這是我的影像 我是413730739莊歆翎", overlayGraphics.width / 2, overlayGraphics.height / 2);
}

function draw() {
  background('#fefae0'); // 設定背景顏色

  // 計算影像的顯示位置，讓它位於畫布正中間
  let xOffset = (width - capture.width) / 2;
  let yOffset = (height - capture.height) / 2;

  // 翻轉畫布
  push();
  translate(width, 0); // 將畫布原點移到右上角
  scale(-1, 1); // 水平翻轉畫布

  // 繪製攝影機影像
  image(capture, width - capture.width - xOffset, yOffset, capture.width, capture.height);
  pop();

  // 將圖形緩衝區繪製在視訊畫面上方
  image(overlayGraphics, xOffset, yOffset, capture.width, capture.height);
}
