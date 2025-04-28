let capture;
let mosaicSize = 20; // 馬賽克方塊的大小
let gap = 10; // 方塊之間的間隔

function setup() {
  createCanvas(windowWidth, windowHeight); // 使用視窗大小
  capture = createCapture(VIDEO); // 擷取攝影機影像
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像大小為畫布的 80%
  capture.hide(); // 隱藏原始的 HTML 視訊元素
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
}
