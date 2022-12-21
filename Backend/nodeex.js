const http = require("http");
const url = require("url");
const fs = require("fs");

    console.log('1')
let rs= fs.createReadStream('./dd.html')
console.log('2')
rs.on(('open',function(){console.log('file opened')}))

    // let curl=url.parse(req.url,true);
    // let qurl=curl.query
    // res.end(`your host name is ${curl.hostname} and path is ${curl.pathname} ${qurl.n}${qurl.l}`)
    
    
// fs.readFile('dummy.html',(err,data)=>{
//     if (err) throw err
//     console.log('read file')
//     res.end(data)
// });
// fs.appendFile('dummy.html','<end>Appended</end>',(err)=>{
//     if (err) throw err
//     console.log('Appended')
// })

// fs.rename('dd.html','dummy.html',()=>{})

    // res.writeHead(200, { "Content-Type": "text/html" });
    // let eurl = url.parse(req.url, true).query;
    // res.end(`your name is ${eurl.name} ${eurl.lname}`);

