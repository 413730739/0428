let capture;
let mosaicSize = 20; // 馬賽克方塊的大小
let gap = 10; // 方塊之間的間隔
let overlayGraphics; // 用於繪製的圖形緩衝區

function setup() {
  createCanvas(windowWidth, windowHeight); // 使用視窗大小
  capture = createCapture(VIDEO); // 擷取攝影機影像
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像大小為畫布的 80%
  capture.hide(); // 隱藏原始的 HTML 視訊元素

  // 創建與視訊畫面大小相同的圖形緩衝區
  overlayGraphics = createGraphics(capture.width, capture.height);
  overlayGraphics.background(200, 255, 200, 100); // 設定圖形緩衝區的背景為半透明淡綠色

  // 在圖形緩衝區中繪製文字
  overlayGraphics.textAlign(CENTER, CENTER); // 設定文字對齊方式為置中
  overlayGraphics.textSize(24); // 設定文字大小
  overlayGraphics.fill(255); // 設定文字顏色為白色
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

  // 繪製馬賽克效果
  for (let y = 0; y < capture.height; y += mosaicSize + gap) {
    for (let x = 0; x < capture.width; x += mosaicSize + gap) {
      // 取得區塊的顏色
      let c = capture.get(x, y);

      // 設定填充顏色並繪製方塊
      fill(c);
      noStroke();
      rect(
        width - x - xOffset - mosaicSize, // 調整 x 位置
        y + yOffset, // 調整 y 位置
        mosaicSize, // 方塊寬度
        mosaicSize // 方塊高度
      );
    }
  }
  pop();

  // 將圖形緩衝區繪製在視訊畫面上方
  image(overlayGraphics, xOffset, yOffset, capture.width, capture.height);
}
