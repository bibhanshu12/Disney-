import Reactfrom "react";
import { Routes, Route} from "react-router-dom";
import "./App.css"
import Login from "./Components/Login";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Movies from "./Components/Movies";
import Series from "./Components/Series";
import Originals from "./Components/Originals";
import Watchlist from "./Components/Watchlist";

const App=()=>{

  return(
    <div >

    <Header/>
    
    <div className="content">
    <Routes>
    
    <Route path='/' element={ <Login/>}  />
    <Route path='/home' element={ <Home/>}  />
    <Route path='/movies' element={ <Movies/>}  />
    <Route path='/series' element={ <Series/>}  />
    <Route path='/originals' element={ <Originals/>}  />
    <Route path='/watchlist' element={ <Watchlist/>}  />
    
    </Routes>

    </div>
    
    </div>
  )
}

export default App;