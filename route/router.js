const express=require('express');
const bcrypt= require("bcryptjs");
const route=new express.Router();
const User=require('../models/userSchema');
const auth = require('../middleware/auth');
route.get('/getdata',auth,(req,res)=>{
    res.send(req.rootUser);
})
//contact us page
route.post('/contact',auth,async(req,res)=>{
    try{
const {name,email,phone,message}=req.body;
if(!name || !email || !phone || !message)
{
    console.log("error in filling contact form")
return res.json({error:"please fill contact form"});
} 
const  userContact=await User.findOne({_id:req.userID});
if(userContact)
{
    const userMessage = await userContact.addMessage(name,email,phone,message);
    await userContact.save();
    res.status(201).json({message:"user message added successfully"})
    console.log("user message added successfully");
}
}
    catch(e){
console.log(e);
    }
})
route.post('/register',async (req,res)=>{
    try{
        const {name,email,phone,work,password,cpassword} =req.body;
        
        if(!name || !email || !phone || !work || !password || !cpassword)
        return res.status(422).json({error:"please fill the field properly"});
       
        const userExist=await User.findOne({email:email});
        if(userExist)
        {
            return res.status(422).json({error:"user already exists"});
        }
        const userData =new User({name,email,phone,work,password,cpassword});
        const final =await userData.save();
        if(final)
        res.status(201).json({message:"successfully added user in database"});
        else
        res.status(500).json({error:"failed to register"});
    }
    catch(e)
    {
        res.status(400).send(e);
    }
})
route.post('/signin',async (req,res)=>{
    try{

    const {email,password} = req.body;
    const foundData=await User.findOne({email:email});
    if(!email || !password)
    return res.status(400).json({error:"i think you forgot to enter something,please check again"});
    if(foundData)
    {    
        const isMatch=await bcrypt.compare(password,foundData.password);
    
        if(isMatch)
        {
            const token = await foundData.genToken();
        res.cookie("jwtoken",token,{expires:new Date(Date.now()+25892000000),httpOnly:true});
        res.status(200).json({message:"login successful"});

        }
        else
        res.status(400).json({error:"invalid credentials"});
    }
    else
    {
res.status(400).json({error:"user doesn't exist"});  
    }
}
catch(e){
    console.log(e);
}
});
route.get('/about',auth,(req,res)=>{
    res.status(200).send(req.rootUser);
    console.log("welcome to about page");
})
route.get('/signup',(req,res)=>{
    res.send("welcome to singnup page");
})
//logout root
route.get('/logout',(req,res)=>{
    res.clearCookie('jwtoken',{path:'/'});
    res.status(200).send("user Logout");
})
module.exports =route;