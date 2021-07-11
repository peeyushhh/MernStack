import React,{useReducer,createContext}from 'react';
import Navbar from './components/Navbar';
import {Switch,Route} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.css';
import Signup from './components/Signup';
import Error from './components/Error';
import Logout from './components/Logout';
import './index.css';
import {initialState,reducer} from './reducer/UseReducer';

export const UserContext=createContext();
const Routing=()=>{
  return (
    <Switch>
    <Route exact path="/" component={Home} />

    <Route exact path="/about" component={About} />
    
    <Route exact path="/contact" component={Contact} />
     
    <Route exact path="/login" component={Login}/>
     
    <Route exact path="/signup" component={Signup}/>
    
    <Route exact path="/logout" component={Logout}/>
    <Route component={Error} />
    </Switch>
  )
}
const App = () => {
  const [state,dispatch] = useReducer(reducer,initialState);
  return (
    <>
   <UserContext.Provider value={{state,dispatch}}>
      <Navbar/>
      <Routing/>
     </UserContext.Provider>
    </>
  )
}

export default App;
