# dcm-to-video

- [中文](https://github.com/kevin20888802/dcm-to-video) | [English](https://github.com/kevin20888802/dcm-to-video/blob/main/README_en.md)

This program can convert DICOM files into videos. It primarily utilizes Node.js and some external tools for implementation. The program sorts DICOM files based on UID, converts them into sequentially numbered image files, and then compiles these images into a video file.

## Prerequisites

1. Make sure you have the following software installed:
   - [Node.js](https://nodejs.org/)
   - [Java](https://www.java.com/)
   - [FFmpeg](https://ffmpeg.org/) (Only required to be manually installed on systems other than Windows x64)

2. In the program directory, use the following command to install the necessary dependencies:
```bash
   npm install
```
## Usage
Execute the following command to begin converting DICOM files to a video:
```bash
node app.js dicomFilesFolder tempFolder outputFilename outputFPS outputFormat
```

## Parameter Explanation:
- dicomFilesFolder: Path to the folder containing DICOM files
- tempFolder: Path to the folder for temporary files
- outputFilename: Name of the output video file
- outputFPS: Frame rate of the output video
- outputFormat: Format of the output video

For example, you can execute the following command:
```bash
node app.js path/to/dicom/files path/to/temp/folder outputVideo 30 mp4
```

## How it works
The program's operation is mainly divided into the following steps:

1. Use getSortedDicomFilenames.js to scan and sort DICOM files based on UID.

2. Use dicom_to_images.js to convert the sorted DICOM files into sequentially numbered image files.

3. Use images_to_video.js to convert the sequentially numbered image files into a video.

4. dicom_to_video.js integrates the above steps to convert DICOM files into a video.

The program uses dcm4che's dcm2jpg tool to convert DICOM files into images and utilizes FFmpeg to combine the images into a video.

## Notes
- Make sure that folder paths do not contain spaces or special characters to avoid program errors.

- The conversion process requires some time, depending on the number and size of DICOM files.

- The supported output video formats include, but are not limited to, avi and mp4.

```
Note: This program is for demonstration and educational purposes only. Ensure that the DICOM files you use comply with legal and regulatory requirements.
```
