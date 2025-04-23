// console.log(global)





// const math = require('./add.js');
// console.log(math.add(2, 3))
// console.log(math.PI)





// const path = require('path')
// const filepath = path.join("folder", "studentName", "result.txt")
// console.log(filepath)

// const parseData = path.parse(filepath);
// const resolvedPath = path.resolve(filepath);
// const extName = path.extname(filepath);
// const baseName = path.basename(filepath);
// const dirname = path.dirname(filepath);

// console.log(parseData, resolvedPath, extName, baseName, dirname);





// const os = require('os')

// console.log("Platform : ", os.platform() )
// console.log("Arch : ", os.arch())
// console.log("Total Memory : ", os.totalmem(), "bytes")
// console.log("Free Memory : ", os.freemem(), "bytes")
// console.log("System Uptime : ", os.uptime(), "seconds")
// console.log("Home Directory : ", os.homedir())
// console.log("Host Name : ", os.hostname())
// console.log("Temporary Directory: ", os.tmpdir())
// console.log("Operating System : ", os.type())
// console.log("Release : ", os.release())
// console.log("Network Interfaces : " , os.networkInterfaces())
// console.log("CPU : ", os.cpus())





// const crypto = require('crypto')

// const randomValue = crypto.randomBytes(8).toString("hex");
// console.log(randomValue);

// const hashData = crypto.createHash('sha256').update("Abdullah Khan").digest("hex");
// console.log(hashData)





// const EventEmitter = require("events");
// const uploader = new EventEmitter();

// uploader.on("trigger",(percent) => {
//     console.log(`Upload ${percent}% complete`)
// })

// function simulateUpload() {
//     let percent = 0
//     const interval = setInterval(()=> {
//         percent += 10;
//         uploader.emit("trigger", percent);
//         if (percent === 100) {
//             clearInterval(interval)
//         }
//     },500)
// }
// simulateUpload()





const http = require("http")

const server = http.createServer((req, res) => {
    if(req.url === "/") {
        res.write("Welcome to the Home/Main Page, Updated");
        res.end();
    } else if(req.url === "/contact"){
        res.write("Welcome to the Contact Page");
        res.end();
    } else if(req.url === "/about"){
        res.write("Welcome to the About Page");
        res.end();
    } else {
        res.write("404 Not Found");
        res.end();
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});


