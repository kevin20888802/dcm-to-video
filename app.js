const {dicomToImages} = require('./api/dicom_to_images');
const { getSortedDicomFilenames } = require('./api/getSortedDicomFilenames');

async function main() {
    await dicomToImages('./temp/','./dicomFiles/',true);
    //console.log(await getSortedDicomFilenames('./dicomFiles/',true));
    
}
main();

