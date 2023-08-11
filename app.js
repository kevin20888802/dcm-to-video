const { dicomToVideo } = require('./api/dicom_to_video');
const process = require('process');

// 從指令行獲取參數
const args = process.argv.slice(2);

if (args.includes('--help') || args.length < 5) {
    console.log("用法: node app.js dicomFilesFolder tempFolder outputFilename outputFPS outputFormat");
    console.log("參數說明:");
    console.log("  dicomFilesFolder   DICOM 檔案的資料夾路徑");
    console.log("  tempFolder         暫存檔案的資料夾路徑");
    console.log("  outputFilename    輸出影片的檔案名稱");
    console.log("  outputFPS          輸出影片的幀率");
    console.log("  outputFormat       輸出影片的格式");
    process.exit(0);
}

/*

var dicomFilesFolder = './dicomFiles/';
var tempFolder = './temp/';
var outputFilename = './output/output.mp4';
var outputFPS = 30;
var outputFormat = 'MP4';

*/

const dicomFilesFolder = args[0];
const tempFolder = args[1];
const outputFilename = args[2];
const outputFPS = parseInt(args[3]);
const outputFormat = args[4];

async function main() {
    await dicomToVideo(dicomFilesFolder, tempFolder, outputFilename, outputFPS, outputFormat);
}

main();


