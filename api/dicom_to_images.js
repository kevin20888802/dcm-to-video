const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const dicomParser = require('dicom-parser');

// 引用 getSortedDicomFilenames 函數
const { getSortedDicomFilenames } = require('./getSortedDicomFilenames');

/**
 * 將 DICOM 檔案轉換為 PNG 圖像
 * @param {string} outputPath 輸出路徑
 * @param {string} filePath DICOM 檔案的完整路徑
 * @param {number} index 索引編號
 */
function convertDicomToPng(outputPath, filePath, imageIndex) {

    const dicomData = fs.readFileSync(filePath);
    const byteArray = new Uint8Array(dicomData.buffer);

    const dataSet = dicomParser.parseDicom(byteArray);
    
    // 獲取 Number Of Frames
    const numberOfFrames = dataSet.intString('x00280008');

    // 使用 dcm2jpg.jar 將每個 frame 轉換為 PNG
    for (let frameIndex = 1; frameIndex <= numberOfFrames; frameIndex++) {
        const outputFileName = `${imageIndex.index}.jpg`;
        const outputFilePath = path.join(outputPath, outputFileName);

        execSync(`java -jar dcm2jpg.jar --frame ${frameIndex} "${filePath}" "${outputFilePath}"`);

        console.log(`已將 ${filePath} 的 frame ${frameIndex} 轉換為 ${outputFilePath}`);
        imageIndex.index++;
    }
}

/**
 * 將 DICOM 檔案轉換為 PNG 圖像
 * @param {string} outputPath 輸出路徑
 * @param {string} folderPath 資料夾路徑
 * @param {boolean} recursive 是否遞迴尋找
 */
async function dicomToImages(outputPath, folderPath, recursive) {
    // 清空輸出資料夾內容
    if (fs.existsSync(outputPath)) {
        fs.rmdirSync(outputPath, { recursive: true });
    }
    
    // 使用 await 取得已排序的 DICOM 檔案路徑陣列
    const dicomFilePaths = await getSortedDicomFilenames(folderPath, recursive);

    // 確保輸出資料夾存在
    if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
    }

    // 依序處理每個 DICOM 檔案並編號命名
    var imageIndex = { index:1};
    for (let i = 0; i < dicomFilePaths.length; i++) {
        const filePath = dicomFilePaths[i].filePath;
        convertDicomToPng(outputPath, filePath, imageIndex);
    }

    console.log('所有 DICOM 檔案已轉換成圖片。');
}

// 導出 dicomToImages 函數
module.exports.dicomToImages = dicomToImages;
