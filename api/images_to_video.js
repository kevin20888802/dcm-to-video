const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');

/**
 * 將圖片轉換為影片
 * @param {string} inputFolder 圖片輸入資料夾的路徑
 * @param {number} outputFps 輸出影片的幀率
 * @param {string} outputFileFormat 輸出的檔案格式 (AVI 或 MP4)
 * @param {string} outputFilePath 輸出影片的完整路徑 (包含副檔名)
 */
async function imagesToVideos(inputFolder, outputFps, outputFileFormat, outputFilePath) {
  try {
    // 檢查並刪除已存在的輸出檔案
    try {
        await fs.access(outputFilePath);
        await fs.unlink(outputFilePath);
    } catch (error) {
    // 如果檔案不存在，不處理錯誤
    }

    // 確保輸出資料夾存在
    const outputFolder = path.dirname(outputFilePath);
    await fs.mkdir(outputFolder, { recursive: true });

    // 讀取輸入資料夾內所有圖片
    const files = await fs.readdir(inputFolder);

    // 過濾出圖片檔案
    const imageFiles = files.filter(file => {
      const extname = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif'].includes(extname);
    });

    // 依照名稱排序圖片檔案
    imageFiles.sort((a, b) => a.localeCompare(b, 'zh-Hant-TW-u-co-stroke'));

    // 顯示即將輸出的影片資訊
    console.log(`即將輸出影片：${path.basename(outputFilePath)}`);
    console.log(`影片格式：${outputFileFormat}`);
    console.log(`影片幀率：${outputFps}`);
    console.log(`影片完整路徑：${outputFilePath}`);

    // 建立 ffmpeg 命令
    const ffmpegCommand = `ffmpeg -framerate ${outputFps} -i ${path.join(inputFolder, '%d.jpg')} -c:v libx264 -r ${outputFps} ${outputFilePath}`;

    // 執行 ffmpeg 命令
    await execAsync(ffmpegCommand);
    console.log('影片轉換完成:', outputFilePath);
  } catch (error) {
    console.error('發生錯誤:', error);
  }
}

// 包裝 exec 為 Promise
function execAsync(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
}

// 使用範例
// const inputFolder = './input_images';
// const outputFps = 30;
// const outputFileFormat = 'MP4';
// const outputFilePath = './output_videos/output.mp4';
// imagesToVideos(inputFolder, outputFps, outputFileFormat, outputFilePath);

// 導出函式
module.exports.imagesToVideos = imagesToVideos;
