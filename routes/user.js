const express=require("express");
const usermiddleware=require("../middleware/usermiddleware");
const { user,course} = require("../db");
const router=express.Router();
router.post('/signup',usermiddleware,async (req,res)=>{
        const username=req.body.username;
        const password=req.body.password;
        await user.create({
            username:username,
            password:password
        })
        res.json({msg:"user created successfully"})

}) 
router.post('/courses/:courseId',usermiddleware,async(req,res)=>{
    const courseId=req.params.courseId;
    const username=req.headers.username;
    try{
    await user.updateOne({
        username:username,
    },{
            "$push":{purchasedcorces:courseId
        }
    });
}catch(e){
    console.log(e);
}
    res.json({
        msg:"purchased successfully"
    })
})
router.get('/purchasedcourses',async (req,res)=>{
    const response=await user.find({username:req.headers.username});
    console.log(user.purchasedcources);
    const courses=course.find({
        _id:{
            "$in":user.purchasedcources
        }
    })
    res.json({
        courses:courses
    })
})

module.exports=router;