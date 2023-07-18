const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '1-node-farm', 'starter', 'txt', 'input.txt');
const textIn = fs.readFileSync(filePath, 'utf-8');
console.log(textIn);

const textOut = `Avocado info: ${textIn}.\nCreated on ${Date.now()}`;
const outputFilePath = path.join(__dirname, '1-node-farm', 'starter', 'txt', 'output.txt');
fs.writeFileSync(outputFilePath, textOut);
console.log('New file');
// const hello = 'Hello world';
// console.log(hello);

// non-blocking, asynchronous way

fs.readFile('./1-node-farm/starter/txt/start.txt','utf-8',(err, data)=>{
    console.log(data);
});
console.log('read this file');