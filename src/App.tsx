import React from "react";
import { Routes, Route} from "react-router-dom";
import "./App.css"
import Login from "./Components/Login";
import Header from "./Components/Header";
import Home from "./Components/Home";




const App=()=>{

  return(
    <div >

    <Header/>
    
    <div className="content">
    <Routes>
    
    <Route path='/' element={ <Login/>}  />
    <Route path='/home' element={ <Home/>}  />
   
   
    
    </Routes>

    </div>
    
    </div>
  )
}

export default App;