import axios from "axios";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logoutSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from "./authSlice";
import {
  deleteUsersFailed,
  deleteUserStart,
  deleteUserSuccsess,
  getUsersFailed,
  getUserStart,
  getUserSuccsess,
} from "./userSlice";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart);
  try {
    const res = await axios.post("/user/login", user);
    dispatch(loginSuccess(res.data));
    navigate("/");
  } catch (err) {
    dispatch(loginFailed());
  }
};

export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart);
  try {
    await axios.post("/user/register", user);
    dispatch(registerSuccess());
    navigate("/login");
  } catch (err) {
    dispatch(registerFailed());
  }
};

export const getAllUsers = async (accesstoken, dispatch, axiosJWT) => {
  dispatch(getUserStart);
  try {
    const res = await axiosJWT.get("/user", {
      headers: { token: `Bearer ${accesstoken}` },
    });
    console.log(res.data);
    dispatch(getUserSuccsess(res.data));
  } catch (err) {
    dispatch(getUsersFailed());
  }
};
export const deleteUser = async (accesstoken, dispatch, id, axiosJWT) => {
  dispatch(deleteUserStart);
  try {
    const res = await axiosJWT.delete("/user/" + id, {
      headers: { token: `Bearer ${accesstoken}` },
    });
    dispatch(deleteUserSuccsess(res.data));
  } catch (err) {
    dispatch(deleteUsersFailed(err.response.data));
  }
};
export const logOut = async (
  accesstoken,
  id,
  dispatch,
  navgigate,
  axiosJWT
) => {
  dispatch(loginStart());
  try {
    await axiosJWT.post("/user", id, {
      headers: { token: accesstoken },
    });
    dispatch(logoutSuccess());
    navgigate("/");
  } catch (err) {
    dispatch(loginFailed());
  }
};
