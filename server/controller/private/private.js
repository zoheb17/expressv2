import express from "express"
import { readDB,writeDB } from "../../utlis/helper.js"
import {v4 as uuid} from "uuid"
import router from "../public/public.js"


// get allusers
router.get("/getusers",async(req,res)=>{
    try {
        let alluser = await readDB()
        console.log(alluser);
        res.status(200).json({msg:alluser})

    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
        
    }
})


// get userby id 

router.get("/getuser/:id",async(req,res)=>{
    try {
        let DB = await readDB()
        let zid = req.params.id 
        let user = DB.find(u=>u.id===zid)
        if(!user){
            return res.status(404).json({msg:"user not found"})
        }

        await writeDB(DB)
        res.status(200).json({msg:user})

    } catch (error) {
        res.status(500).json({msg:error})
    }
})


// delete all users 

router.delete("/delete/:id",async(req,res)=>{
    try {
        let DB= await readDB();
        let zid = req.params.id 
        let user=DB.filter(u=>u.id!=zid)
        if(!user){
            return res.status(404).json({msg:"user not found"})
        }
        await writeDB(user)
        res.status(200).json({msg:"user delete done"})
    } catch (error) {
        console.log(error);
      res.status(500).json({msg:error})
        
    }
})


// create task 

router.post("/addtask",async(req,res)=>{
    try {
        let DB = await readDB(); 
        let user = DB.find(u=>u.id===req.user.id)
        if(!user){
            res.status(200).json({msg:"user not found "})
        }
        let {taskName, description, deadline} = req.body;

        let usertask={
          id :uuid(),
        //   task:req.body.task ,
          taskName,
          description,
          deadline,
          StartedAT:new Date().toISOString
        }
         user.task.push(usertask);
        await writeDB(DB)
        res.status(200).json({msg:"task added"})  
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
        
    }
})



router.delete("/deltask/:id",async(req,res)=>{
try {
    let DB = await readDB()
    let user = DB.find(x=>x.email == req.user.email)
    let newtask = user.task.filter((x)=>x.id != req.params.id)
        // let user = DB.find(u=>u.id===zid)
        user.task = newtask
        await writeDB(DB)
    res.status(200).json({msg:"task delete"})
   
} catch (error) {
   console.log(error); 
   res.status(500).json({msg:error})
}
})

export default router;