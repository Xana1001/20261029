// 全域變數宣告：宣告儲存精靈圖表（Sprite Sheet）與角色狀態的變數
let runSprite;       // 儲存「跑」動作的精靈圖表物件
let kickSprite;      // 儲存「踢」動作的精靈圖表物件

let posX;            // 角色的 X 座標位置
let posY;            // 角色的 Y 座標位置
let moveSpeed = 6;   // 角色的左右移動速度（像素/幀）

let isFacingLeft = false; // 控制角色面向的方向（false 表示面向右邊，true 表示面向左邊）

let currentFrame = 0; // 當前播放的動畫畫格（Frame）索引

function preload() {
  // 預先載入「跑」動作的圖檔（寬高 891*36，共有 16 張圖片）
  runSprite = loadImage('蜘蛛人/跑/跑檔案.png');
  
  // 預先載入「踢」動作的圖檔（寬高 981*46，共有 17 張圖片）
  kickSprite = loadImage('蜘蛛人/踢/踢檔案.png');
}

function setup() {
  // 建立一個全螢幕尺寸的畫布
  createCanvas(windowWidth, windowHeight);
  
  // 設定角色的初始位置在畫面的正中間
  posX = width / 2;
  posY = height / 2;
  
  // 設定動畫播放速率（每秒播放 12 幀）
  frameRate(12);
}

function draw() {
  // 設定畫布背景顏色為 #caf0f8
  background('#caf0f8');
  
  // 檢查使用者是否按下鍵盤右鍵（右方向鍵）
  if (keyIsDown(RIGHT_ARROW)) {
    // 1. 設定面向右邊
    isFacingLeft = false;
    
    // 2. 將角色的 X 座標往右增加（往右移動）
    posX += moveSpeed;
    
    // 3. 播放「踢」動作動畫並循環顯示
    drawAnimatedSprite(kickSprite, 17, 981, 46);
    
  // 檢查使用者是否按下鍵盤左鍵（左方向鍵）
  } else if (keyIsDown(LEFT_ARROW)) {
    // 1. 設定面向左邊（轉向）
    isFacingLeft = true;
    
    // 2. 將角色的 X 座標往左減少（往左移動）
    posX -= moveSpeed;
    
    // 3. 播放「踢」動作動畫並循環顯示
    drawAnimatedSprite(kickSprite, 17, 981, 46);
    
  // 未按下任何鍵盤方向鍵時
  } else {
    // 預設狀態：循環顯示「跑」動作精靈圖
    drawAnimatedSprite(runSprite, 16, 891, 36);
  }
}

/**
 * 自訂繪製函式：負責將橫向的精靈圖表裁切並繪製到畫布上
 * @param {p5.Image} spriteImg    - 載入的精靈圖表物件
 * @param {number}   totalFrames  - 圖片中包含的動畫張數
 * @param {number}   totalWidth   - 整張橫向圖片的總寬度
 * @param {number}   totalHeight  - 整張橫向圖片的總高度
 */
function drawAnimatedSprite(spriteImg, totalFrames, totalWidth, totalHeight) {
  // 計算單一動畫畫格的寬度（總寬度 / 總張數）
  let frameWidth = totalWidth / totalFrames;
  
  // 單一畫格的高度即為整張圖片的高度
  let frameHeight = totalHeight;
  
  // 計算當前畫格在圖表中的 X 軸裁切起始點
  let sx = (currentFrame % totalFrames) * frameWidth;
  
  // 儲存目前的繪圖設定狀態與矩陣變換
  push();
  
  // 將座標系原點 (0,0) 平移至角色的當前位置 (posX, posY)
  translate(posX, posY);
  
  // 如果角色面向左邊，進行水準翻轉（X 軸乘以 -1 達成轉向）
  if (isFacingLeft) {
    scale(-1, 1);
  }
  
  // 將精靈圖裁切並繪製於座標原點，使用 (-frameWidth/2, -frameHeight/2) 讓角色中心點對齊 (posX, posY)
  image(
    spriteImg,
    -frameWidth / 2, -frameHeight / 2, frameWidth, frameHeight, // 畫布呈現的位置與寬高
    sx, 0, frameWidth, frameHeight                             // 圖檔內裁切的位置與寬高
  );
  
  // 恢復先前儲存的繪圖設定狀態與矩陣變換
  pop();
  
  // 遞增畫格索引，並透過取餘數演算達成無窮循環播放
  currentFrame = (currentFrame + 1) % totalFrames;
}

function windowResized() {
  // 當瀏覽器視窗大小改變時，自動調整畫布為全螢幕
  resizeCanvas(windowWidth, windowHeight);
}