import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../../redux/apiRequest";
import "./navbar.css";
import {createAxios} from "../../redux/createInstance"
import { logoutSuccess } from "../../redux/authSlice";
const NavBar = () => {
  const user = useSelector(state =>state.auth.login.currentUser);
  console.log(user);
  const dispatch = useDispatch();
  const axiosJWT = createAxios(user,dispatch,logoutSuccess)
  const navigate = useNavigate();
  const onLogout = ()=>{
    logOut(user.accesstoken,user.user._id,dispatch,navigate,axiosJWT)
  }
  return (
    <nav className="navbar-container">
      <Link to="/" className="navbar-home"> Home </Link>
      {user? (
        <>
        <p className="navbar-user">Hi, <span> {user.user.username}  </span> </p>
        <Link to="/logout" className="navbar-logout" onClick={onLogout}> Log out</Link>
        </>
      ) : (    
        <>
      <Link to="/login" className="navbar-login"> Login </Link>
      <Link to="/register" className="navbar-register"> Register</Link>
      </>
)}
    </nav>
  );
};

export default NavBar;
