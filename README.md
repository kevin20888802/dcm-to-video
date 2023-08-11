# dcm-to-video

- [中文](https://github.com/kevin20888802/dcm-to-video) | [English](https://github.com/kevin20888802/dcm-to-video/blob/main/README_en.md)

這個程式可以將 DICOM 檔案轉換成影片。它主要使用 Node.js 和一些外部工具來實現。程式會依照 UID 排序 DICOM 檔案，將其轉換成編號過的圖片，然後將這些圖片組合成一個影片檔案。

## 前置作業

1. 確保您已安裝以下軟體：
   - [Node.js](https://nodejs.org/)
   - [Java](https://www.java.com/)
   - [FFmpeg](https://ffmpeg.org/) (僅在 Windows x64 以外的系統需要自行安裝)

2. 在程式目錄下，使用以下指令安裝相依套件：
```bash
   npm install
```

## 使用方法
執行以下指令來開始轉換 DICOM 檔案到影片：
```bash
node app.js dicomFilesFolder tempFolder outputFilename outputFPS outputFormat
```
### 參數說明：
- dicomFilesFolder：包含 DICOM 檔案的資料夾路徑
- tempFolder：暫存檔案的資料夾路徑
- outputFilename：輸出影片的檔案名稱
- outputFPS：輸出影片的幀率
- outputFormat：輸出影片的格式

例如，您可以執行以下指令：
```bash
node app.js path/to/dicom/files path/to/temp/folder outputVideo 30 mp4
```

## 運作原理
程式的運作主要分為以下步驟：

1. 使用 getSortedDicomFilenames.js 掃描並按照 UID 排序 DICOM 檔案。

2. 使用 dicom_to_images.js 將排序後的 DICOM 檔案轉換成編號過的圖片檔案。

3. 使用 images_to_video.js 將編號過的圖片檔案轉換成影片。

4. dicom_to_video.js 將上述步驟整合，將 DICOM 檔案轉換成影片。

程式使用了 dcm4che 的 dcm2jpg 工具來將 DICOM 檔案轉換成圖片，並使用 FFmpeg 將圖片組合成影片。

## 注意事項
- 確保資料夾路徑中不包含空格或特殊字元，以避免程式出錯。

- 轉換過程需要一些時間，取決於 DICOM 檔案的數量和大小。

- 輸出影片格式支援的類型包括但不限於 avi、mp4。

```
注意：本程式僅用於示範和教育用途，請確保您使用的 DICOM 檔案符合法律和規定。
```
