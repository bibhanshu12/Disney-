import React from "react";
import { Routes, Route} from "react-router-dom";
import "./App.css"
import Login from "./Components/Login";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Detailed from "./Components/Detailed";




const App=()=>{

  return(
    <div >

    <Header/>
    
    <div className="content">
    <Routes>
    
    <Route path='/' element={ <Login/>}  />
    <Route path='/home' element={ <Home/>}  />
    <Route path="/detail/:id" element={ <Detailed/>} />
    
   
   
    
    </Routes>

    </div>
    
    </div>
  )
}

export default App;