import {useEffect,useState} from "react";
import * as React from "react";
import styled from "styled-components";
import { auth, provider } from "../firebase";
import {signInWithPopup,User } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

import {
  selectuserName,
  // selectuserEmail,
  selectuserPhotos,
  setusersLogindetails,setuserSignoutstate
} from "../features/users/userSlice";
import { useNavigate } from "react-router-dom";


const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector(selectuserName);
  // const email = useSelector(selectuserEmail);
  const userPhoto = useSelector(selectuserPhotos);
  const [isAuthChecked, setIsAuthChecked] = useState(false);



  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // Wait a moment to ensure all user data is loaded
        setTimeout(() => {
          setUser(user);
        }, 500);
      }
      setIsAuthChecked(true);
    });
    return () => unsubscribe();
  }, []);

  const handleauth = () => {
    if (!username) {
      // User logs in
      signInWithPopup(auth, provider)
        .then((result) => {
          setUser(result.user); 
          navigate("/home"); // Navigate only after login
        })
        .catch((error) => alert(error.message));
    } else {
      // User logs out
      auth.signOut()
        .then(() => {
          dispatch(setuserSignoutstate());
          navigate("/");
        })
        .catch((err) => alert(err.message));
    }
  };
  

  const setUser=(user:User)=>{
        dispatch(
            setusersLogindetails({
            name:user.displayName,
            email:user.email,
            photo:user.photoURL,
            })
        )

  }
  if (!isAuthChecked) return null;
  return (
    <Nav>
        <Link to='/home' >
        <Logo  src="images/logo.svg" alt="Logos" />
        </Link>
     
      {!username ? <LoginBtn onClick={handleauth}> Login
      </LoginBtn>
      :<>

      <NavMenu>
      <NavLink to='/home' >
          <img src="images/home-icon.svg" alt="home icon" />
          <span>HOME</span>
        </NavLink>

        <NavLink to="/search">
          <img src="images/search-icon.svg" alt="home icon" />
          <span>SEARCH</span>
        </NavLink>

        <NavLink to="/watchlist">
          <img src="images/watchlist-icon.svg" alt="home icon" />
          <span>WATCHLIST</span>
        </NavLink>

        <NavLink to="/originals">
          <img src="images/original-icon.svg" alt="home icon" />
          <span>ORIGINALS</span>
        </NavLink>

        <NavLink to="/movies">
          <img src="images/movie-icon.svg" alt="home icon" />
          <span>MOVIES</span>
        </NavLink>

        <NavLink to="/series">
          <img src="images/series-icon.svg" alt="home icon" />
          <span>SERIES</span>
        </NavLink>
      </NavMenu>

      <SignOut>
      {userPhoto ? (
  <UserImg src={userPhoto} alt={username} />
) : (
  <UserImg src="/images/default-user.png" alt="Default User" />
)}
        <DropDown>
            <span onClick={handleauth}>SignOut </span>
        </DropDown>

      </SignOut>
      </>}
    
    </Nav>
  );
};

const Nav = styled.nav`
  position: fixed;
  height: 70px;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
  background-color: #090b13;
`;

const Logo = styled.img`
  height: 70px;
  padding: 5px 0;
  cursor: pointer;
  display: inline-block;
`;

const LoginBtn = styled.button`
  margin: 4px;
  border-radius: 4px;
  font-weight: bold;
  color: #f9f9f9;
  cursor: pointer;
  padding: 5px 10px;
  background-color: #040714;
  font-size: 16px;
  border: 1px solid white
  outline: none;

  display: flex;
  align-items: center;
  gap: 8px;

  img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    border:1px solid whit
    object-fit: cover;
  }

  &:hover {
    background-color: rgba(4, 7, 20, 0.8);
  }
`;

const NavMenu = styled.div`
  align-items: center;
  text-align: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;

  margin: 0px;
  padding: 0px;
  position: relative;
  margin-right: auto;
  margin-left: 25px;

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;
    gap: 2px;
    position: relative;

    img {
      width: 20px;
      min-width: 20px;
      height: 20px;
      z-index: auto;
    }

    span {
      color: rgb(249, 249, 249);
      font-size: 14px;
      letter-spacing: 0;
      position: relative;

      &:before {
        background-color: rgb(249, 249, 249);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
        content: "";
        height: 2px;
        left: 0px;
        opacity: 0;
        position: absolute;
        right: 0px;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: 100%;
      }
    }

    &:hover {
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }
  }

  @media (max-width: 960px) {
    display: none;
  }
`;

const UserImg=styled.img`
    height:30px;
    width:30px;
    border-radius:50%;
    letter-spacing:0;
    margin-right:12px;
    object-fit: cover; 
    border: 1px solid transparent; 
`;


const DropDown = styled.div`
  position: absolute;
  top:48px;
  right:0px;
  background:rgb(19,19,19);
  border:2px solid rgba(151,151,151,0.34);
  border-radius:4px;
  box-shadow:rgb(0 0 0 /50%) 0px 0px 18px 0px;
  padding:10px;
  font-size:14px;
  letter-spacing:4px; 
    opacity:0;
`;

const SignOut = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;

  img {
    width: 60px; /* Adjust size */
    height: auto;
  }

  &:hover {
  img{
  border:4px solid rgb(116, 173, 219);
  transition-duration:0.5s;

  }
  ${DropDown}{
  opacity:1;
  transition-duration:1s;
  }
    visibility: visible;
    opacity: 1;
  }
`;



export default Header;
