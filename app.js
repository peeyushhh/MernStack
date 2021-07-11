const dotenv=require('dotenv');
dotenv.config({path:"./config.env"});
const cookieParser=require("cookie-parser");
const express=require("express");
const app=express();
require('./db/conn');
const User=require('./models/userSchema');
const port=process.env.PORT || 5000;
app.use(cookieParser());
app.use(express.urlencoded({ extended:true}));
const route=require("./route/router");
app.use(express.json());
app.use(route);

//3 step heroku
if(process.env.NODE_ENV==='production')
{
    app.use(express.static("client/build"));
}

app.listen(port,()=>{console.log("connection successful")});