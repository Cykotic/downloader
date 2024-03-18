const fetch = require('node-fetch');
const fs = require('fs');

const url = '';
const filePath = '';

async function downloadFile(url, filePath) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to download file. Status: ${response.status} ${response.statusText}`);
        }
        const fileStream = fs.createWriteStream(filePath);
        await new Promise((resolve, reject) => {
            response.body.pipe(fileStream);
            response.body.on('error', (err) => {
                reject(err);
            });
            fileStream.on('finish', function () {
                resolve();
            });
        });
        console.log('File downloaded successfully.');
    } catch (error) {
        console.error('Error downloading file:', error);
    }
}

downloadFile(url, filePath);
