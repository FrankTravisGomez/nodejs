const fs = require('fs');
const http = require('http');
const url =  require('url')

//
// const textIn = fs.readFileSync('./1-node-farm/starter/txt/input.txt', 'utf-8');
// console.log(textIn);
//
// const textOut = `this is what we know about avocados: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./1-node-farm/starter/txt/output.txt', textOut);
// console.log('new file written');
// // const hello = 'Hello world';
// // console.log(hello);
//
// // non-blocking, asynchronous way
//
// fs.readFile('./1-node-farm/starter/txt/start.txt','utf-8',(err, data1)=>{
//     fs.readFile(`./1-node-farm/starter/txt/${data1}.txt`,'utf-8',(err, data2)=>{
//         console.log(data2);
//         fs.readFile('./1-node-farm/starter/txt/append.txt', 'utf-8',(err, data3)=>{
//             console.log(data3);
//
//             fs.writeFile('./1-node-farm/starter/txt/final.txt', `${data2}\n${data3}`, 'utf-8', err=>{
//                 console.log('new file written');
//             })
//         });
//     });
// });
// console.log('read this file');

// SERVER

const data = fs.readFileSync(`${__dirname}/1-node-farm/starter/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res)=>{
    const pathName = req.url;

    if(pathName === '/' || pathName === '/overview'){
        res.end('this is the overview');
    }else if(pathName === './product'){
        res.end('here is the PRODUCT');
    }else if(pathName === '/api'){
            res.writeHead(200, {'Content-type': 'application/json'});
            res.end(data);
    } else{
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        });
        res.end('<h1>page not found</h1>');
    }
});

server.listen(8000, '127.0.0.1', ()=>{
    console.log('listening to request port 8000')
});