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

fs.readFile('./1-node-farm/starter/txt/start.txt','utf-8',(err, data1)=>{
    fs.readFile(`./1-node-farm/starter/txt/${data1}.txt`,'utf-8',(err, data2)=>{
        console.log(data2);
        fs.readFile('./1-node-farm/starter/txt/append.txt', 'utf-8',(err, data3)=>{
            console.log(data3);

            fs.writeFile('./1-node-farm/starter/txt/final.txt', `${data2}\n${data3}`, 'utf-8', err=>{
                console.log('new file written');
            })
        });
    });
});
console.log('read this file');