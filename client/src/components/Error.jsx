import React from 'react'
import { NavLink } from 'react-router-dom';
const Error = () => {
    return (
        <>
        <div className="container gif">
             <div className="notfound">
                 <h1 className="text-center text-dark mt-4">404 ERROR</h1>
             </div>
             <h3 className="text-center">...Oops!Something is missing</h3>
             <h5 className="text-center">Would you like to go back to Home page??</h5>
            <NavLink to='/' className="nav-link"><button className="btn btn-info">Go Back</button></NavLink>
            </div>
        </>
    )
}

export default Error;
