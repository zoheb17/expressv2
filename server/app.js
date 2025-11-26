import express from "express"

import dotenv from "dotenv";
import publicRouter from "./controller/public/index.js"
dotenv.config()

const port = process.env.PORT 
const app=express();
app.use(express.json());


app.get("/",(req,res)=>{
    try {
        res.status(200).json({msg:"server is five"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
        
    }
})

app.use("/public",publicRouter)

app.listen(port,()=>{
    console.log(`server is running http://localhost:${port}`);
})