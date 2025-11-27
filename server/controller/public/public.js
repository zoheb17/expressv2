import express from "express"
import bcrypt from "bcrypt"
import {v4 as uuid} from "uuid"

import { readDB,writeDB,otp } from "../../utlis/helper.js"
import encrypt from "../../utlis/token.js";
import sendmail from "../../utlis/sendmail.js"


const router= express.Router();


router.post("/register",async(req,res)=>{
    try {
        let DB= await readDB();
        let{name,email,age,phone,password}=req.body 
        let OTP = otp()
        let incomingEmail = req.body.email;
        let user= DB.find(u=>u.email === incomingEmail);
        if(user){
            return res.status(404).json({msg:`user already exist `})
        } 
        let newData={
            id:uuid(),
            name,
            age,
            email,
            phone,
            password:await bcrypt.hash(password,10),
            isverfied:false,
            OTP,
            task:[],
            accountCreated:new Date().toString(),
        }
        DB.push(newData)
        await writeDB(DB);

        await sendmail(email, "wel;come to our app",`Thank for comming to our app \n your otp${OTP}`)
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
             
                let sessionkey=await encrypt(userObject)
                  

            res.status(200).json({msg:"login succesfull",sessionkey:sessionkey})
            }
            else{
                res.status(401).json({msg:"password invalid"})
            }
        }
    } catch (error) {

        console.log(error);
        res.status(500).json({msg:error})
        
    }
})

router.post("/verify",async(req,res)=>{
    try {
        let DB = await readDB() 
        let otp=req.body.otp 
        let incomingEmail = req.body.email;
        let user= DB.find(u=>u.email === incomingEmail);
        if(!user){
            return res.status(404).json({msg:`user nout found `})
        } 
        if(user.OTP != otp){
        return res.status(401).json({msg:"bhai otp galath hai "})
        }

        delete user.OTP;
        user.isverfied=true;
        await writeDB(DB)
        res.status(200).json({msg:"Account verified successfully"})

    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})
export default router 