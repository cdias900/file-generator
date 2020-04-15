const fs = require('fs');

// Command line arguments
const argv = process.argv.slice(2);
const FILE_SIZE = (argv[0] || 100) * 1000000;
const FILE_NAME = argv[1] || './out.txt';
const MODE = argv[2] || '--override';

/**
 * Synchronously gets the content of a file
 * @param {string} filename The path of the file
 * @returns {Array<string>} An array that has one line of the file per index
 */
function getFileContent(filename) {
    return (fs.readFileSync(filename, { encoding: 'utf8', flag: 'r' })).split(/\r?\n/);
}

/**
 * Gets the sum of the lengths in an array
 * @param {Array<number>} lenghtArray
 * @returns {Number} The sum of the string lengths in the array
 */
function getTotalLength(lenghtArray) {
    return lenghtArray.reduce((p, c) => p + c, 0);
}

/**
 * Overrides or Appends a file
 * @param {string} text String to be saved
 * @param {string} index The index of the text
 */
function saveFile(text, index) {
    if(index === 0 && MODE !== '--append') return fs.writeFileSync(FILE_NAME, text);
    return fs.appendFileSync(FILE_NAME, text);
}

const adj = getFileContent('./words/adj.txt');
const noun = getFileContent('./words/noun.txt');
const sup = getFileContent('./words/sup.txt');

let totalLength = [0];
let text = '';
let i = 0, j = 0;

while(getTotalLength(totalLength) <= FILE_SIZE) {
    const rAdj = Math.round(((Math.random() * i * FILE_SIZE) % adj.length));
    const rNoun = Math.round(((Math.random() * i * FILE_SIZE) % noun.length));
    const rSup = Math.round(((Math.random() * i * FILE_SIZE) % sup.length));
    try {
        text += `${adj[rAdj]} ${noun[rNoun]} ${sup[rSup]} `;
        totalLength[j] = text.length;
    } catch(e) {
        saveFile(text, j);
        text = '';
        j++;
    }
    i++;
}

saveFile(text, j);