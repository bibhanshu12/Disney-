import { Routes, Route } from "react-router-dom";
import "./App.css"
import Login from "./Components/Login";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Detailed from "./Components/Detailed";
import ProtectedRoute from "./Components/ProtectionRoute";

const App = () => {
  return (
    <div>
      <Header />
      <div className="content">
        <Routes>
          <Route path='/' element={<Login />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path='/home' element={<Home />} />
            <Route path="/:category/detail/:id" element={<Detailed />} />
            <Route path="/search" element={<div>Search Page</div>} />
            <Route path="/watchlist" element={<div>Watchlist Page</div>} />
            <Route path="/originals" element={<div>Originals Page</div>} />
            <Route path="/movies" element={<div>Movies Page</div>} />
            <Route path="/series" element={<div>Series Page</div>} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;