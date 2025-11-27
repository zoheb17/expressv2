import fs from "fs/promises";

let dbPath="/home/zoheb/expressv2/server/data.json";


async function readDB() {
    let DB= await  fs.readFile(dbPath, "utf-8");
    return JSON.parse(DB)

    
}

async function writeDB(content) {

    await fs.writeFile(dbPath, JSON.stringify(content,null, 2))

    
}

 function otp() {
     return Math.floor(Math.random() * (9999-1000)+1000)
    
}
export {readDB,writeDB,otp}