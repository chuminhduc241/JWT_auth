import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser, getAllUsers } from "../../redux/apiRequest";
import { loginSuccess } from "../../redux/authSlice";
import { createAxios } from "../../redux/createInstance";
import "./home.css";
const HomePage = () => {
  //DUMMY DATA
  const user = useSelector(state=>state.auth.login.currentUser);
  const userList = useSelector(state=>state.users.users?.allUsers);
  const msg = useSelector(state=>state.users.msg);
  console.log(msg)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(user);
  const axiosJWT = createAxios(user,dispatch,loginSuccess);
  useEffect(()=>{
      if(!user)
      {
        navigate("/login")
      }
     
        getAllUsers(user?.accesstoken,dispatch,axiosJWT);
  },[]);

  const handledelete  = (id)=>{
    deleteUser(user.accesstoken,dispatch,id,axiosJWT)
  }


  return (
    <main className="home-container">
      <div className="home-title">User List</div>
      <div className="home-role">
        Your role : {user?.user?.admin ? 'Admin':'User'}
      </div>
      <div className="home-userlist">
        {userList?.map((user) => {
          return (
            <div className="user-container" key={user._id}>
              <div className="home-user">{user.username}</div>
              <div className="delete-user" onClick={ () => handledelete(user._id)}> Delete </div>
            </div>
          );
        })}
        <div className="error-message">{msg}</div>
      </div>
    </main>
  );
};

export default HomePage;
