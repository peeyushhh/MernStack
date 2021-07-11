import React, { useContext, useState } from 'react'
import login from '../images/login.png';
import avatar from '../images/avatar.png';
import { NavLink, useHistory } from 'react-router-dom';
import {UserContext} from '../App';

const Login = () => {
   const {state,dispatch}= useContext(UserContext);
    const history =useHistory();
    const [email,setEmail]=useState("");
    const [password,setPassword] =useState("");
    const sendData=async (e)=>{
        e.preventDefault();
        if(!email || !password)
        return window.alert("enter fields correctly");

        const res=await fetch('/signin',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,password
            })
    
        });
        const data=await res.json();
        if(data.error === "invalid credentials" || data.error === "user doesn't exist"|| !data )
{
    window.alert("INVALID DATA");
    console.log("INVALID DATA");
}
else
{
    window.alert("login successful");
    console.log("login successful");
    dispatch({type:"USER",payload:true});
    history.push("/");
}
    }
    return (
        <div>
            <section className="login w-auto">
                <div className="mainLogin h-auto ">
                    <div className="row">
                        <div className="col-md-6 col-12 order-md-0 h-100 w-100 order-1 d-flex align-items-center flex-column justify-content-center">
                            <img className="img-fluid my-auto p-3 mt-4 pic " src={login} alt="img"/>
                            <NavLink to="/signup" className="textLogin mb-3  mt-1 text-center" style={{fontFamily:"'Staatliches', cursive"}} >Create An Account</NavLink>
                        </div>
                        <div className="col-md-6 col-12 order-md-1 order-0 d-flex align-items-center flex-column justify-content-center ">
                            <img className="img-fluid avatar" src={avatar} alt="avatar"/>
                            <form className="form" method="POST">
             <div className="form-group">
                 <label htmlFor="email">
                 <i class="zmdi zmdi-email"></i>
                 </label>
                 <input type="email" name="email" placeholder="Your Email"  id="email" required={true} value={email} onChange={(e)=>setEmail(e.target.value)} />
             </div>
             <div className="form-group">
                 <label htmlFor="password">
                 <i class="zmdi zmdi-case"></i>
                 </label>
                 <input type="password" name="password" placeholder="Password"  id="password" required={true} value={password} onChange={(e)=>setPassword(e.target.value)} />
             </div>
             <div className="form-group form-button">
             <input type="submit" className="btn form-submit loginBtn" onClick={sendData} value="Login" name="signup" id="signup" />
             </div>
             </form>
             <div className="social-icon">
                 <h7 >or Login with
                 <span>   <i class="zmdi zmdi-linkedin-box"></i>  </span>
                 <span>  <i class="zmdi zmdi-github-box"></i> </span>
                 <span>  <i class="zmdi zmdi-skype mdc-text-light-blue"></i>      </span>
                 <span>  <i class="zmdi zmdi-google"></i>     </span>
                 </h7>
             </div>

                        </div>
                    </div>
                </div>
            </section>
            
        </div>
    )
}

export default Login;
