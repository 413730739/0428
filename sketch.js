let capture;
let savedImage; // 用於儲存攝影機影像的變數
let graphicsBuffer; // 用於處理影像的圖形緩衝區
const blueShades = [
  '#e3f2fd', '#bbdefb', '#90caf9', '#64b5f6', '#42a5f5',
  '#2196f3', '#1e88e5', '#1976d2', '#1565c0', '#0d47a1'
]; // 藍色系列顏色

function setup() {
  createCanvas(windowWidth, windowHeight); // 使用視窗大小
  capture = createCapture(VIDEO); // 擷取攝影機影像
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像大小為畫布的 80%
  capture.hide(); // 隱藏原始的 HTML 視訊元素

  // 創建與視訊畫面大小相同的圖形緩衝區
  graphicsBuffer = createGraphics(capture.width, capture.height);
}

function draw() {
  background('#fefae0'); // 設定背景顏色

  // 計算影像的顯示位置，讓它位於畫布正中間
  let x = (width - capture.width) / 2;
  let y = (height - capture.height) / 2;

  // 儲存攝影機影像
  if (capture.loadedmetadata) {
    savedImage = capture.get(); // 將攝影機影像儲存為 p5.Image
  }

  // 在圖形緩衝區中處理影像
  if (savedImage) {
    graphicsBuffer.push();

    // 設定圖形緩衝區背景顏色，覆蓋視訊畫面
    graphicsBuffer.background(110, 227, 245); // 設定背景顏色為 rgb(110, 227, 245)

    // 水平翻轉影像並繪製到緩衝區
    graphicsBuffer.translate(graphicsBuffer.width, 0);
    graphicsBuffer.scale(-1, 1);// 翻轉影像
    graphicsBuffer.image(savedImage, 0, 0, graphicsBuffer.width, graphicsBuffer.height);
    graphicsBuffer.pop();

    // 在圖形緩衝區中繪製馬賽克效果的正方形
    let squareSize = 25; // 正方形大小縮小為原來的一半
    for (let row = 0; row < graphicsBuffer.height; row += squareSize) {
      for (let col = 0; col < graphicsBuffer.width; col += squareSize) {
        // 計算正方形區域的平均顏色
        let region = savedImage.get(col, row, squareSize, squareSize);
        region.loadPixels();
        let totalBrightness = 0;
        let pixelCount = region.pixels.length / 4;
        for (let i = 0; i < region.pixels.length; i += 4) {
          let r = region.pixels[i];
          let g = region.pixels[i + 1];
          let b = region.pixels[i + 2];
          totalBrightness += (r + g + b) / 3; // 計算亮度
        }
        let avgBrightness = totalBrightness / pixelCount;

        // 根據亮度選擇藍色系列顏色
        let shadeIndex = floor(map(avgBrightness, 0, 255, 0, blueShades.length));
        shadeIndex = constrain(shadeIndex, 0, blueShades.length - 1); // 確保索引在範圍內
        graphicsBuffer.fill(blueShades[shadeIndex]); // 設定藍色系列顏色
        graphicsBuffer.noStroke();
        graphicsBuffer.rect(col, row, squareSize, squareSize); // 繪製正方形
      }
    }
  }

  // 繪製圖形緩衝區到畫布
  image(graphicsBuffer, x, y, capture.width, capture.height);
}
