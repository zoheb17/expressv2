import express from "express"

import dotenv from "dotenv";
dotenv.config()
import publicRouter from "./controller/public/public.js"
import middleware from "./middleware/auth.js"
import privateRouter from "./controller/private/private.js"
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
app.use(middleware) 
app.use('/private',privateRouter)

app.listen(port,()=>{
    console.log(`server is running http://localhost:${port}`);
})