const { admin, course } = require("../db");
const express = require("express");
const adminmiddleware = require("./../middleware/adminmiddleware");
const {jwtsecret}=require("../config")
const jwt=require("jsonwebtoken");

const router = express.Router();

router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    await admin.create({
        username: username,
        password: password
    });
    res.json({ msg: "admin created successfully" });
});
router.post('/signin',async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const check=await admin.find({
        username:username,
        password:password
    }) 
    if(check){
    const token=jwt.sign({username},jwtsecret);
    res.json({
        token1:token
    })
    }
    else{
        res.json({
            msg:"username and password is wrong"
        })
    }
});

router.post('/courses', adminmiddleware, async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imagelink = req.body.imagelink;
    const newcourse = await course.create({
        title: title,
        description: description,
        price: price,
        imagelink: imagelink
    });
    res.json({
        msg: `course created successfully`, courseId: newcourse._id
    });
});

router.get('/courses', adminmiddleware, async (req, res) => {
    const response = await course.find({});
    res.json({
        courses: response
    });
});

module.exports = router;