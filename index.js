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
const replaceTemplate = (temp, product) =>{
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);

    if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    return output;
}
const tempOverview = fs.readFileSync(`${__dirname}/1-node-farm/starter/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/1-node-farm/starter/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/1-node-farm/starter/templates/product.html`, 'utf-8');
const data = fs.readFileSync(`${__dirname}/1-node-farm/starter/dev-data/data.json`, 'utf-8');

//this is a data object that is parsing the JSON data
const dataObj = JSON.parse(data);
// this is a server that will respond different dependent on the url path
const server = http.createServer((req, res)=>{
    const pathName = req.url;
    //overview page
    if(pathName === '/' || pathName === '/overview'){
        res.writeHead(200, {'Content-type': 'text/html'});
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);
    // product page
    }else if(pathName === '/product'){
        res.end('here is the PRODUCT');
    // api page
    }else if(pathName === '/api'){
            res.writeHead(200, {'Content-type': 'application/json'});
            res.end(data);
    // not found
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