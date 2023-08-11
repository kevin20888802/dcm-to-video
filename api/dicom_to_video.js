// 引入必要的模組
const { dicomToImages } = require('./dicom_to_images'); // 引入將DICOM轉換為圖像的功能模組
const { imagesToVideos } = require('./images_to_video'); // 引入將圖像轉換為影片的功能模組

/**
 * 將DICOM檔案轉換為影片的異步函式
 * @param {string} dicomFilesFolder - 包含DICOM檔案的資料夾路徑
 * @param {string} tempFolder - 暫存資料夾路徑，用於暫時儲存中間產生的圖像檔案
 * @param {string} outputFilename - 輸出影片的檔案名稱
 * @param {number} outputFPS - 輸出影片的幀率 (幀數/秒)
 * @param {string} outputFormat - 輸出影片的格式，可以是 'AVI' 或 'MP4'
 */
async function dicomToVideo(dicomFilesFolder, tempFolder, outputFilename, outputFPS, outputFormat) {
    await dicomToImages(tempFolder, dicomFilesFolder, true); // 將DICOM檔案轉換為圖像
    await imagesToVideos(tempFolder, outputFPS, outputFormat, outputFilename); // 將圖像轉換為影片
}

// 匯出dicomToVideo函式，使其可以被其他程式引用
module.exports.dicomToVideo = dicomToVideo;
