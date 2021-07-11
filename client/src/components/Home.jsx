import React,{useState,useEffect} from 'react'

const Home = () => {
    const [newData,setData]=useState({});
    const homeData=async ()=>{
try{
const res = await fetch("/getdata",
{
    method:"GET",
    headers:{
        "Accept":"application/json",
        "Content-Type": "application/json"
    },
    credentials:"include"
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
    newData.name="We Are Mern Developer";
console.log(e);
}
    }
    //we can not use async function in useEffect but we can use simple then and catch
    //useEffect [] jab page refresh hoga tabhi yeah jo iska andar function hai vo call hoga else nahi hoga
useEffect(()=>{
homeData();
},[]);
    return (
        <>
             <div className="home_page">
                 <div className="home_div">
                     <p className="pt-5 text-center" >WELCOME</p>
                     <h1 style={{color:"black"}}>{newData.name}</h1>
                     <h2 >{!newData.name?"We Are Mern DEVELOPER":"So happy to see you again!"}</h2>
                     
                 </div>
             </div>
        </>
    )
}

export default Home;
