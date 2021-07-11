const jwt=require('jsonwebtoken');
const User=require('../models/userSchema');
const Auth=async(req,res,next)=>{
try{
const token=req.cookies.jwtoken;
const verifyToken=jwt.verify(token,process.env.SECRET_KEY);
//we will get whole data of user in verifyToken
const rootUser=await User.findOne({_id:verifyToken._id,"tokens.token":token});
if(!rootUser)
throw new Error("User not found");
else
{
    req.token=token;
    req.rootUser=rootUser;
    req.userID=rootUser._id;
    next();
}
}
catch(err){ 
    res.status(401).send("unauthorized")
    console.log(err);
}
}
module.exports=Auth; 