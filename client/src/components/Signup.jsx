import React,{useState} from 'react';
import register from '../images/register.png';
import { NavLink,useHistory } from 'react-router-dom';
const Signup = () => {
    const history=useHistory();
    const [user,setUser]=useState({
        name:"",email:"",phone:"",work:"",password:"",cpassword:""
    });
    let name,value;
const handleInputs=(e)=>{
name=e.target.name;
value=e.target.value;
setUser({...user,[name]:value})
console.log(user);
} 
const postData=async (e)=>{
e.preventDefault();
const {name,email,phone,work,password,cpassword}=user;
if(!name || !email || !phone || !work || !password || !cpassword)
 return window.alert("fill registration form correctly!");
 if(password === cpassword)
 {
    if(password.length < 8)
    return window.alert("password must be greater than or equal to 8 characters");
 }
 else
 {
    return window.alert("password does not match");
 }
if(phone.length!==10)
return window.alert("phone number must contain 10 digits.");
const res=await fetch("/register",
{
 method:"POST",
 headers:{
     "Content-Type": "application/json"
 },
 body:JSON.stringify({
    name,email,phone,work,password,cpassword
 })
});
const data= await res.json();
if(data.status === 422 || !data )
{
    window.alert("INVALID DATA");
    console.log("INVALID DATA");
}
else
{
    window.alert("registration successful");
    console.log("registration successful");
    history.push("/login");
}
}
    return (
        <div>
           
            <div className="row d-flex justify-content-center align-items-center mx-auto" style={{width:"100vw"}}>
 <div className="col-md-10 col-12 mx-auto">
     <div className="row">
         <div className="col-md-6 col-12 order-1 d-flex justify-content-center align-content-center flex-column">
         <h1 className="form-title">Sign Up</h1>
         <form className="form" method="POST">
             <div className="form-group">
                 <label htmlFor="name">
                 <i class="zmdi zmdi-account"></i>
                 </label>
                 <input type="text" name="name" placeholder="Your Name"  value={user.name} onChange={handleInputs} id="name" required={true}/>
             </div>
             <div className="form-group">
                 <label htmlFor="email">
                 <i class="zmdi zmdi-email"></i>
                 </label>
                 <input type="email" name="email" placeholder="Your Email"  value={user.email} onChange={handleInputs} id="email" required={true}/>
             </div>
             <div className="form-group">
                 <label htmlFor="phone">
                 <i class="zmdi zmdi-phone"></i>
                 </label>
                 <input type="number" name="phone" placeholder="Your Number" min="0000000000"max="9999999999" value={user.phone} onChange={handleInputs} id="phone" required={true}/>
             </div>
             <div className="form-group">
                 <label htmlFor="work">
                 <i class="zmdi zmdi-graduation-cap"></i>
                 </label>
                 <input type="text" name="work" placeholder="Your Profession"  value={user.work} onChange={handleInputs} id="work" required={true}/>
             </div>
             <div className="form-group">
                 <label htmlFor="password">
                 <i class="zmdi zmdi-case"></i>
                 </label>
                 <input type="password" name="password" placeholder="Password"  value={user.password} onChange={handleInputs} id="password" required={true}/>
             </div>
             <div className="form-group">
                 <label htmlFor="cpassword">
                 <i class="zmdi zmdi-case-check"></i>
                 </label>
                 <input type="password" name="cpassword" placeholder="Confirm Password"  value={user.cpassword} onChange={handleInputs} id="cpassword" required={true}/>
             </div>
    <div className="form-group form-button">
             <input type="submit" className="btn form-submit loginBtn" onClick={postData} value="Register" name="signup" id="signup" style={{backgroundColor:"rgba(29, 161, 242,1)",color:"#fff"}}/>
             </div>
         </form> 
         </div>
         <div className="col-md-6 col-12 order-0 d-flex align-items-center justify-content-center flex-column p-3">
               <img src={register} className="mt-3img-fluid img mb-5 mt-2" alt="img" style={{width: '90%', height: '60vh'}}/>
               <NavLink exact className="text-center m-1 registered" to="/login" style={{color:"rgba(0,0,0,0.6)",fontWeight:"bold",fontSize:"2rem",fontFamily: "'Staatliches', cursive;"}}>I'M ALREADY REGISTERED</NavLink>
         </div>
     </div>
     
 </div>
            </div>
            
        </div>
        
    
    )
}
export default Signup;