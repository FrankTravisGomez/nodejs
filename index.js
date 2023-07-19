const fs = require('fs');
const http = require('http');
const url =  require('url');

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
// this is a JSON request that is open the following files 1-node-farm starter dev-data data.json
const data = fs.readFileSync(`${__dirname}/1-node-farm/starter/dev-data/data.json`, 'utf-8');
//this is a data object that is parsing the JSON data
const dataObj = JSON.parse(data);
// this is a server that will respond different dependent on the url path
const server = http.createServer((req, res)=>{
    const pathName = req.url;
    if(pathName === '/' || pathName === '/overview'){
        res.end('this is the overview');
    }else if(pathName === '/product'){
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
//this code is the port and host for server practice
server.listen(8000, '127.0.0.1', ()=>{
    console.log('listening to request port 8000')
});