import React,{useState,useEffect} from 'react';
import feedback from '../images/ffedback.png';
import {useHistory} from 'react-router-dom';
const Contact = () => {
    const history=useHistory();
    const [newData,setData]=useState({name:"",email:"",phone:"",message:""});
    const userContact=async ()=>{
try{
const res = await fetch("/getdata",
{
    method:"GET",
    headers:{
        "Content-Type": "application/json"
    }
});
const data=await res.json();
setData({...newData,name:data.name,email:data.email,phone:data.phone});
if(!res.status === 200 || !data)
{
    const error=new Error(res.error);
    throw error;
}
}
catch(e){
console.log(e);
}
    }
    //we can not use async function in useEffect but we can use simple then and catch
    //useEffect [] jab page refresh hoga tabhi yeah jo iska andar function hai vo call hoga else nahi hoga
useEffect(()=>{
userContact();
},[]);
//we are storing data in state here
const handleInputs=(e)=>{
const name=e.target.name;
const value=e.target.value;
setData({...newData,[name]:value});
}
//send data to backend
const contactForm=async(e)=>{
    e.preventDefault();
    try{
    const {name,email,phone,message}=newData;
const res=await fetch('/contact',{
    method:"POST",
    headers:{
        "Content-Type": "application/json"
    },
    body:JSON.stringify({
        name,email,phone,message
    })
});
const data=await res.json(); //tki pending state main na jaae;
if(!data)
console.log("data not send");
else
{
window.alert("message send")
setData({...newData,message:""});
}
    }
    catch(e){
window.alert("Please login first");
history.push('./login');
    }
}
return (
        <div>
            <div className="contact d-flex justify-content-center align-items-center mx-auto">
                <div className="row topping">
                    <div className="col-md-10 col-12 mt-4 mb-4 mx-auto d-flex justify-content-around " style={{transform:"translateX(2rem)"}}>
                            <div className="boxx">
                            <i class="zmdi zmdi-smartphone-android"></i>
                             <div className="data">
                                 <h5 style={{fontFamily:"'Staatliches', cursive"}}>Phone</h5>
                                 <h7 style={{fontFamily:"'Staatliches', cursive"}}>{newData.phone}</h7>
                             </div>
                            </div>
                        <div className="boxx">
                        <i class="zmdi zmdi-email"></i>
                             <div className="data" >
                                 <h5 style={{fontFamily:"'Staatliches', cursive"}}>Email</h5>
                                 <h7  style={{fontFamily:"'Staatliches', cursive"}}>{newData.email}</h7>
                             </div>
                            </div>
                        <div className="boxx" >
                        <i class="zmdi zmdi-account"></i>
                             <div className="data">
                                 <h5 style={{fontFamily:"'Staatliches', cursive"}}>Name</h5>
                                 <h7 style={{fontFamily:"'Staatliches', cursive"}}>{newData.name}</h7>
                             </div>
                            </div>    
                        </div>
                </div>
                <div className="mainLogin mb-2 d-flex align-content-center justify-content-center" style={{transform:"translateX(0.5rem)"}}>
                    <div className="row">
                        <div className="col-md-6 col-12 order-md-0  d-flex align-content-center justify-content-center">
                            <img className="img-fluid my-auto p-3 mt-4 pic " src={feedback} alt="img"/>
                        </div>
                        <div className="col-md-6 col-12 order-md-1 mt-4 d-flex align-content-center justify-content-center flex-column ">
                            <h3 style={{fontFamily:"'Staatliches', cursive",fontWeight:"bolder"}}>Get In Touch</h3>
                            <form className="form" method="POST">
                    <div className="form-group">
                 <label htmlFor="name">
                 <i class="zmdi zmdi-account"></i>
                 </label>
                 <input type="text" name="name" placeholder="Your Name"  id="name" onChange={handleInputs} value={newData.name}  required={true}/>
             </div>
             <div className="form-group">
                 <label htmlFor="email">
                 <i class="zmdi zmdi-email"></i>
                 </label>
                 <input type="email" name="email" placeholder="Your Email"  id="email" onChange={handleInputs} value={newData.email} required={true}/>
             </div>
             <div className="form-group">
                 <label htmlFor="phone">
                 <i class="zmdi zmdi-phone"></i>
                 </label>
                 <input type="number" name="phone" placeholder="Your Phone Number" onChange={handleInputs} value={newData.phone}  id="phone" />
             </div>
             <div className="form-group">
        <label for="message"><i class="zmdi zmdi-comments"></i></label>
    <textarea class="form-control " id="message" placeholder="Your Message" name="message"
    style={{borderBottom: "1px solid black",color:"rgba(29, 161, 242,1)"}} onChange={handleInputs} value={newData.message} required={true}></textarea>
             </div>
             <div className="form-group form-button ">
             <input type="submit" onClick={contactForm} className="btn form-submit loginBtn mb-2" value="Submit" name="submit" id="submit" style={{minWidth:"40%"}}/>
             </div>
             </form>

                        </div>
                    </div>
                </div>          
        </div>
        </div>
    )
}

export default Contact;
