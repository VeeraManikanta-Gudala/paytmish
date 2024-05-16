
const express = require('express')
const router = express.Router();
const user = require('../db')
const zod = require('zod');

const jwt = require('jsonwebtoken');

const JWT_SECRET = require('../config');

const signupScema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    fname: zod.string(),
    lname : zod.string()
})
router.post('/signup',async (req,res)=>{
    const {success} = signupScema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "Email already taken or invalid inputs"
        })
    }
    const existingUser = await user.findOne({
        username: req.body.username
    })

    if(existingUser){
        return res.status(411).json({
            message: "username/email already taken/incorrect inputs"
        })
    }
    const User = await user.create({
        username: req.body.username,
        password: req.body.password,
        fname: req.body.fname,
        lname: req.body.lname
    })
    const userID = User._id;

    const token = jwt.sign({
        userID
    },JWT_SECRET);
    res.json({
        message: "user created successfully",
        token :token
    })


})
module.exports = router;