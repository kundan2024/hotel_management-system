const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { route } = require('./bookingsRoute');

router.post("/register",async(req,res) => {
    const newuser=new User(req.body)
    try{
        const user=await newuser.save()
        res.send('user Registered Successfully..');
    } catch(error){
        return res.status(400).json({message: error});
    }
});

router.post("/login",async(req,res) => {
    const {email,password} = req.body
   
    try {
         const user =await User.findOne({email : email , password : password})
        if(user){
            res.send(user)
        }
        else
        {
            return res.status(400).json({message: 'Login Failed'})
        }
    } catch (error) {
        return res.status(400).json({message: error});
        
    }
});

router.get('/getallusers',async(req,res) => {
    try {
        const users=await User.find();
        res.send(users);
    } catch (error) {
        res.send.status(400).json({error});
    }
});

module.exports = router;