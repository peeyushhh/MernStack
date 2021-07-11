const mongoose=require("mongoose");
const validator= require("validator");
const jwt=require("jsonwebtoken");
const bcrypt= require("bcryptjs");
const userSchema =new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        uppercase:true,
        minlength:2
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value))
            throw new Error("Invalid Email");
        }
    },
    phone:{
        type:Number,
        min:10,
        required:true
    },
    messages:[
        {
            name:{
                type:String,
                trim:true,
                required:true,
                uppercase:true,
                minlength:2
            },
            email:{
                type:String,
                trim:true,
                required:true,
                unique:true,
                validate(value){
                    if(!validator.isEmail(value))
                    throw new Error("Invalid Email");
                }
            },
            phone:{
                type:Number,
                min:10,
                required:true
            },
            message:{
                type:String,
                trime:true,
                required:true,
            },
            date:{
                type:Date,
                default:Date.now
            }
        }
    ],
    work:{
        type:String,
        uppercase:true,
        trim:true,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    cpassword:{
        type:String,
        required:true,
    },
date:{
    type:Date,
    default:Date.now
},
tokens:[
    {
        token:{
            type:String,
            required:true
        }
    }
]

});
//store message
userSchema.methods.addMessage = async function(name,email,phone,message){
    try{
        this.messages=this.messages.concat({name,email,phone,message});
        await this.save();
        return this.message;
    }
    catch(e){
console.log(e);
    }
}
userSchema.methods.genToken = async function(){
try{
    //payload should be unique jwyt.sign(payload,string)
let  token = await jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY);
this.tokens=this.tokens.concat({token:token});
await this.save();
return token;
}
catch(e)
{
    console.log(e);
}
} 
//middleware for hashing the password
userSchema.pre("save",async function (next){
if(this.isModified("password"))
{
    //to make our password more secrue as salt is always diffrent everytime use run this piece of code
    //this make our passwordm more secue bcrypt just gonna concat our password with salt and then hash it again// in this way i
    //it is more secure. 12 here represent rounds
const salt=await bcrypt.genSalt(12);
this.password =await bcrypt.hash(this.password, salt);
this.cpassword =this.password;
console.log(this.password);
}
next();
});
const User=new mongoose.model("User",userSchema);
module.exports=User;