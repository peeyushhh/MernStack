import React,{useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from 'react-router-dom';
import logo from '../images/web.png';
import {UserContext} from '../App';

const Navbar = () => {
  const {state,dispatch}=useContext(UserContext);
const Links=()=>{
  if(state)
  return(
  <>
  <ul className="navbar-nav ml-auto">
    <li className="nav-item  mr-3 ml-3 ">
      <NavLink exact className="nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
    </li>
    <li className="nav-item mr-3 ml-3">
      <NavLink exact className="nav-link" to="about">About</NavLink>
    </li>
    <li className="nav-item  mr-3 ml-3">
      <NavLink exact className="nav-link" to="/contact">Contact</NavLink>
    </li>
    <li className="nav-item mr-3 ml-3">
      <NavLink exact className="nav-link" to="/logout">Logout</NavLink>
    </li>
  </ul>
  </>
  )
  return(
  <>
    <ul className="navbar-nav ml-auto">
    <li className="nav-item  mr-3 ml-3 ">
      <NavLink exact className="nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
    </li>
    <li className="nav-item mr-3 ml-3">
      <NavLink exact className="nav-link" to="about">About</NavLink>
    </li>
    <li className="nav-item  mr-3 ml-3">
      <NavLink exact className="nav-link" to="/contact">Contact</NavLink>
    </li>
    <li className="nav-item mr-3 ml-3">
      <NavLink exact className="nav-link" to="/login">Login</NavLink>
    </li>
    <li className="nav-item mr-3 ml-3">
      <NavLink exact className="nav-link" to="/signup">Registration</NavLink>
    </li>
  </ul>
  </>
  )
}
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <NavLink className="navbar-brand" to="/"><img src={logo} alt="logo" style={{width:"4rem",height:"3.5rem"}}/></NavLink>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <Links/>
  </div>
</nav>
        </>
    )
}

export default Navbar;
