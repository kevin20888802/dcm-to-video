const fs = require('fs');
const path = require('path');
const dicomParser = require('dicom-parser'); // 您需要安裝這個套件

// 判斷給定的檔案是否為有效的DICOM檔案
async function isDicomFile(filePath) {
  try {
    const dicomBuffer = await fs.promises.readFile(filePath);
    const dataSet = dicomParser.parseDicom(dicomBuffer);
    return Object.keys(dataSet.elements).length > 0; // 檢查是否為有效的DICOM檔案
  } catch (error) {
    return false;
  }
}

// 遞迴地掃描指定資料夾中的DICOM檔案
async function scanDicomFiles(folderPath, recursive) {
  const dicomFiles = [];

  async function scanDirectory(directoryPath) {
    const items = await fs.promises.readdir(directoryPath);
    for (const item of items) {
      const itemPath = path.join(directoryPath, item);
      const itemStat = await fs.promises.stat(itemPath);

      if (itemStat.isDirectory() && recursive) {
        await scanDirectory(itemPath);
      } else if (itemStat.isFile() && path.extname(itemPath).toLowerCase() === '.dcm') {
        if (await isDicomFile(itemPath)) {
          dicomFiles.push(itemPath);
        }
      }
    }
  }

  await scanDirectory(folderPath);

  return dicomFiles;
}

// 對DICOM檔案進行排序並提取UIDs
async function sortAndExtractUIDs(dicomFiles) {
  const data = [];

  for (const filePath of dicomFiles) {
    const dicomBuffer = fs.readFileSync(filePath);
    const dataSet = dicomParser.parseDicom(dicomBuffer);
    const studyUID = dataSet.string('x0020000d');
    const seriesUID = dataSet.string('x0020000e');
    const sopUID = dataSet.string('x00080018');

    data.push({
      filePath,
      studyUID,
      seriesUID,
      sopUID
    });
  }

  const sortedData = data.sort((a, b) => {
    if (a.studyUID !== b.studyUID) {
      return a.studyUID.localeCompare(b.studyUID);
    }
    if (a.seriesUID !== b.seriesUID) {
      return a.seriesUID.localeCompare(b.seriesUID);
    }
    return a.sopUID.localeCompare(b.sopUID);
  });

  return sortedData;
}


// 匯出獲取排序後DICOM檔案名稱的函式
module.exports.getSortedDicomFilenames = async function (folderPath, recursive) {
  const dicomFiles = await scanDicomFiles(folderPath, recursive);
  const sortedData = await sortAndExtractUIDs(dicomFiles);
  return sortedData;
};