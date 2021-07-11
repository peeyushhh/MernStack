import React, { useEffect ,useState} from 'react'
import avatar from '../images/avatar.png';
import pic from '../images/peeyush.jpg';
import {useHistory} from 'react-router-dom';
const About = () => {
    const [newData,setData]=useState({});
    const history = useHistory();
    const callAboutPage=async ()=>{
try{
const res = await fetch("/about",
{
    method:"GET",
    headers:{
        "Accept":"application/json", //for sending cookie to server side
        "Content-Type": "application/json"
    },
    credentials:"include"//sending token to server side
});
const data=await res.json();
setData(data);
if(!res.status === 200 || !data)
{
    const error=new Error(res.error);
    throw error;
}
}
catch(e){
console.log(e);
history.push("/login");
}
    }
    //we can not use async function in useEffect but we can use simple then and catch
    //useEffect [] jab page refresh hoga tabhi yeah jo iska andar function hai vo call hoga else nahi hoga
useEffect(()=>{
callAboutPage();
},[]);
    return (
        <>
        <div className="container emp-profile">
            <form method="GET">
                <div className="row">
                    <div className="col-md-4"> 
                    <div className="profile-img mt-4">
                        <img 
                        src={newData.name==="PEEYUSH"?pic:avatar} className="img-fluid images" alt="profile" />
                    </div>
                    </div>
                    <div className="col-md-6">
                        <div className="profile-head ">
                            <h5 style={{fontFamily:"'Staatliches', cursive",color:"rgba(29, 161, 242,1)"}}>{newData.name}</h5>
                            <h6>{newData.work}</h6>
                            <p className="profile-rating mt-3 mb-5" style={{fontFamily:"'Staatliches', cursive"}}>RANKINGS: <span>1/10</span></p>
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                 <li className="nav-item" role="presentation">
                                   <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                 </li>
                                 <li className="nav-item" role="presentation">
                                 <a className="nav-link " id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Timeline</a>
                                 </li>
                             </ul>
                        </div>
                    </div>
                    <div className="col-md-2 d-flex justify-content-center align-items-center mb-3 mt-4">
                        <input type="button"  className="profile-edit-btn btn btn-primary" value="Edit Profile" style={{fontFamily:"'Staatliches', cursive"}} name="btnAddMore"/>
                    </div>
                </div>
                <div className="row">
                    {/* left side url */}
                    <div className="col-md-4">
                        <div className="profile-work">
                            <p>WORK LINK</p>
                            <a href="https://www.instagram.com/_peeyush_23/" target="_blank" rel="noreferrer">Instagram</a><br/>
                            <a href="https://www.linkedin.com/feed/?trk=homepage-basic_signin-form_submit" target="_blank" rel="noreferrer">LinkedIn</a><br/>
                        </div>
                    </div>
                    {/* Right side data toggle*/}
                    <div className="col-8 pt-5 about-info">
                        <div className="tab-content profile-tab" id="myTabContent">
                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <div className="row">
                                <div className="col-md-6">
                                    <label>User ID</label>
                                </div>
                                <div className="col-md-6">
                                    <p>1910990423</p>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-6">
                                    <label>Name</label>
                                </div>
                                <div className="col-md-6">
                                    <p>{newData.name}</p>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-6">
                                    <label>Email</label>
                                </div> 
                                <div className="col-md-6">
                                    <p style={{wordBreak:"break-word"}}>{newData.email}</p>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-6">
                                    <label >Phone</label>
                                </div>
                                <div className="col-md-6">
                                    <p>{newData.phone}</p>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-6">
                                    <label>Profession</label>
                                </div>
                                <div className="col-md-6">
                                    <p>{newData.work}</p>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                        <div className="row mt-3">
                                <div className="col-md-6">
                                    <label>Experience</label>
                                </div>
                                <div className="col-md-6">
                                    <p>Moderate</p>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-6">
                                    <label>Charges</label>
                                </div>
                                <div className="col-md-6">
                                    <p>10$/hour</p>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-6">
                                    <label>total Projects</label>
                                </div>
                                <div className="col-md-6">
                                    <p>20</p>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-6">
                                    <label>English Proficiency</label>
                                </div>
                                <div className="col-md-6">
                                    <p>Moderate</p>
                                </div>
                            </div>
                            
                        </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        </>
    )
}

export default About;

