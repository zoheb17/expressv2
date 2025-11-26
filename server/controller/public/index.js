import express from "express"
import bcrypt from "bcrypt"
import {v4 as uuid} from "uuid"

import { readDB,writeDB } from "../../utlis/helper.js"


const router= express.Router();


router.post("/register",async(req,res)=>{
    try {
        let DB= await readDB();
        let{name,email,age,phone,password}=req.body 

        let newData={
            id:uuid(),
            name,
            age,
            email,
            phone,
            password:await bcrypt.hash(password,10),
            isverfied:false,
            // otp,
            task:[],
            accountCreated:new Date().toString(),
        }
        DB.push(newData)
        await writeDB(DB);
        res.status(201).json({msg:"register done sucessfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
        
    }
})


router.post("/login",async(req,res)=>{
    try {
        let existingData= await readDB();
        let incomingEmail=req.body.email 
        let userObject=existingData.find((x)=>x.email===incomingEmail);

        if(!userObject){
            res.status(404).json({msg:"user not found"});
        }
        else{
            if(await bcrypt.compare(req.body.password, userObject.password)){
            res.status(200).json({msg:"login succesfull"})
            }
            else{
                res.status(401).json({msg:"password invalid"})
            }
        }
    } catch (error) {
        
    }
})
export default router 