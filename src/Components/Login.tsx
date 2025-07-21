import styled from "styled-components";
import { auth, provider } from "../firebase";

import {signInWithPopup,User } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  selectuserName,
  // selectuserEmail,
  setusersLogindetails,setuserSignoutstate
} from "../features/users/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector(selectuserName);

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
    

  return (
    <Container>
      <Content>
        <CTA>
          <CTAimagesOne src="/images/cta-logo-one.svg" alt="CTA One " />
          <SignUpbtn onClick={handleauth}  >GET ALL THERE </SignUpbtn>
          <Discription>
            Get the best of Disney, Pixar, Marvel, Star Wars, and National
            Geographic. Sign up now for unlimited streaming of your favorite
            movies and shows in stunning HD. Join Disney Premium today!
          </Discription>

          <CTAimagesTwo  src="images/cta-logo-two.png" alt="CTA Two" />
        </CTA>
        <BgImg />
      </Content>
    </Container>
  );
};

const Container = styled.section`
  overflow: hidden;
  display: flex;
  // justify-content:center;
  text-align: center;
  flex-direction: column;
  height: 100vh;
`;

const Content = styled.div`
  margin-bottom: 10vw;
  width: 100%;
  position: relative;
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  font-size: 20px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 80px 40px;
  height: 100%;
`;

const BgImg = styled.div`
  height: 100%;
  background-position: top;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url("/images/login-background.jpg");
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: -1;
`;

const CTA = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 650px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom:2vw
  transition-timing-function: ease-out;
  transition: opacity 0.2s;


`;
const CTAimagesOne = styled.img`
  margin-bottom: 12px;
  width: 100%;
  max-width: 600px; /* Adjust size as needed */
  display: block;
`;

const SignUpbtn = styled.a`
  font-weight: bold;
  padding: 16.5px 0;
  color: #f9f9f9;
  background-color: #0063e5;
  width: 100%;
  letter-spacing: 1.5px;
  font-size: 18px;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 12px;

  &:hover {
    background-color: #0483ee;
  }
`;

const Discription= styled.p`
width:100%;
color: hsla(0,0%,95.3,1);
font-size:12px;
margin: 0 0 12px;
line-height:1.5; 
letter-spacing:1.5px;


`;

const CTAimagesTwo=styled.img`
display: block;
max-width:600px;
width:100%;


`;




export default Login;
