const fs = require('fs');

/**
 * Synchronously gets the content of a file
 * @param {string} filename The path of the file
 * @returns {Array<string>} An array that has one line of the file per index
 */
function getFileContent(filename) {
    return (fs.readFileSync(filename, { encoding: 'utf8', flag: 'r' })).split(/\r?\n/);
}

/**
 * Gets the sum of the lengths of all strings in an array
 * @param {Array<string>} textArray
 * @returns {Number} The length of all strings in the array
 */
function getTextArrayLength(textArray) {
    return textArray.reduce((p, c) => p + c.length, 0);
}

// Command line argument
const argv = process.argv.slice(2);
const FILE_SIZE = (argv[0] || 100) * 1000000;

const adj = getFileContent('./words/adj.txt');
const noun = getFileContent('./words/noun.txt');
const sup = getFileContent('./words/sup.txt');

let textArr = [''];
let i = 0, j = 0;

while(getTextArrayLength(textArr) <= FILE_SIZE) {
    const rAdj = Math.round(((Math.random() * i * FILE_SIZE) % adj.length));
    const rNoun = Math.round(((Math.random() * i * FILE_SIZE) % noun.length));
    const rSup = Math.round(((Math.random() * i * FILE_SIZE) % sup.length));
    try {
        textArr[j] += `${adj[rAdj]} ${noun[rNoun]} ${sup[rSup]} `;
    } catch(e) {
        j++;
    }
    i++;
}

textArr.forEach((text, index) => {
    if(index === 0 && argv[1] !== '--append') {
        return fs.writeFileSync('./out.txt', text);
    }
    return fs.appendFileSync(argv[2] || './out.txt', text);
});