
import { auth, provider } from "../../firebase";
import { signInWithPopup, User } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
// import {
//   selectuserName,
//   setusersLogindetails,setuserSignoutstate
// } from "";
import {
  selectuserName,
  setusersLogindetails,
  setuserSignoutstate,
} from "../../features/users/userSlice";
import { useNavigate } from "react-router-dom";

const AuthenticationFB = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector(selectuserName);

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
    auth
      .signOut()
      .then(() => {
        dispatch(setuserSignoutstate());
        navigate("/");
      })
      .catch((err) => alert(err.message));
  }

  const setUser = (user: User) => {
    dispatch(
      setusersLogindetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    );
  };

  return <div>AuthenticationFB</div>;
};

export default AuthenticationFB;
