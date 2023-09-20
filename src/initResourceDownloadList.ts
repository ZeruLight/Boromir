import * as fs from 'fs';
import * as path from 'path';
import crcjam from 'crc/crcjam';


const folderPath = 'src/public/res/download/android/';

function walkDir(dir: string, fileCallback: (filePath: string) => void) {
    fs.readdirSync(dir).forEach((item) => {
        const itemPath = path.join(dir, item);
        const isDirectory = fs.statSync(itemPath).isDirectory();

        if (isDirectory) {
            // Recursively traverse subdirectories
            walkDir(itemPath, fileCallback);
        } else {
            fileCallback(itemPath);
        }
    });
}

export function makeDownloadList(type) {
    if (!fs.existsSync(folderPath + type + "/download.list")) {

        const data: { filePath: string; crc: string; fileSize: number }[] = [];

        walkDir(folderPath + type, (filePath) => {
            console.log('Processing File:', filePath);
            const fileData = fs.readFileSync(filePath);
            const fileSize = fs.statSync(filePath).size;

            const crc = crcjam(fileData);

            let parsedPath = filePath.replace(/\\/g, '/');
            parsedPath = parsedPath.replace("src/public/res/download/android", "")
            parsedPath = parsedPath.replace("/v0282", "")


            data.push({ filePath: parsedPath, crc: crc.toString(16), fileSize });

        });
        let response = '';
        data.forEach((item, index) => {
            response += `${item.filePath},${item.crc},${item.fileSize}`
            if (index < data.length - 1) {
                response += '\n';
            }
        });
        fs.writeFile(folderPath + type + "/download.list", response, (err) => {
            if (err) {
                console.error('Error creating the file:', err);
            } else {
                console.log('File created successfully.');
            }
        });
    } else {
        console.log(folderPath + type + "/download.list" + " Already exists")
    }
}