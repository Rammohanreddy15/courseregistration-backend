const express = require("express");
const { admin, course } = require("../db");
const adminMiddleware = require("./../middleware/adminmiddleware");
const { jwtsecret } = require("../config");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    await admin.create({ username, password });
    res.json({ msg: "Admin created successfully" });
});

router.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    const check = await admin.findOne({ username, password });
    if (check) {
        const token = jwt.sign({ username }, jwtsecret);
        res.json({ token });
    } else {
        res.json({ msg: "Username and password are incorrect" });
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    const { title, description, price, imagelink } = req.body;
    const newCourse = await course.create({ title, description, price, imagelink });
    res.json({ msg: `Course created successfully`, courseId: newCourse._id });
});

router.get('/courses', adminMiddleware, async (req, res) => {
    const courses = await course.find({});
    res.json({ courses });
});

module.exports = router;
