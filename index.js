const fs = require('fs');

const textIn = fs.readFileSync('./1-node-farm/starter/txt/input.txt', 'utf-8');
console.log(textIn);

const textOut = `this is what we know about avocados: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync('./1-node-farm/starter/txt/output.txt', textOut);
console.log('new file written');
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