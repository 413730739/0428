let capture;
let overlayGraphics; // 用於繪製的圖形緩衝區

function setup() {
  createCanvas(windowWidth, windowHeight); // 使用視窗大小
  capture = createCapture(VIDEO); // 擷取攝影機影像
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像大小為畫布的 80%
  capture.hide(); // 隱藏原始的 HTML 視訊元素

  // 創建與視訊畫面大小相同的圖形緩衝區
  overlayGraphics = createGraphics(capture.width, capture.height);
  overlayGraphics.background(0); // 設定背景為黑色

  // 設定顏色模式為 HSB，方便調整飽和度
  overlayGraphics.colorMode(HSB, 255);

  // 在圖形緩衝區中繪製方框和三角形
  let boxSize = 20; // 方形大小
  let spacing = 10; // 方形間距
  for (let y = 0; y < overlayGraphics.height; y += boxSize + spacing) {
    for (let x = 0; x < overlayGraphics.width; x += boxSize + spacing) {
      // 取得 capture 中相對應位置的顏色
      let c = capture.get(x, y);

      // 將顏色轉換為 HSB 並調整為連色系列
      let originalColor = color(c);
      let h = hue(originalColor);
      let s = saturation(originalColor) * 0.7; // 降低飽和度
      let b = brightness(originalColor) * 0.9; // 降低亮度

      // 設定填充顏色並繪製方框
      overlayGraphics.fill(h, s, b);
      overlayGraphics.noStroke();
      overlayGraphics.rect(x, y, boxSize, boxSize); // 繪製方框

      // 繪製正三角形
      overlayGraphics.fill(200, 255, 200); // 設定三角形顏色為淡綠色
      let centerX = x + boxSize / 2; // 方框中心的 x 座標
      let centerY = y + boxSize / 2; // 方框中心的 y 座標
      let size = 5; // 正三角形的邊長
      overlayGraphics.triangle(
        centerX, centerY - size / Math.sqrt(3), // 頂點
        centerX - size / 2, centerY + size / (2 * Math.sqrt(3)), // 左下角
        centerX + size / 2, centerY + size / (2 * Math.sqrt(3))  // 右下角
      );
    }
  }

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
