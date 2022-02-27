import axios from "axios";
import jwt_decode from "jwt-decode";
const refreshtoken = async () => {
  try {
    const res = await axios.get("/user/refreshtoken", {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
export const createAxios = (user, dispatch, stateSucess) => {
  const newInstance = axios.create();
  newInstance.interceptors.request.use(
    async (config) => {
      const decodetoken = jwt_decode(user?.accesstoken);
      let date = new Date();
      if (decodetoken.exp < date.getTime() / 1000) {
        const data = await refreshtoken();
        const refreshUser = {
          ...user,
          accesstoken: data.accesstoken,
        };
        dispatch(stateSucess(refreshUser));
        config.headers.token = `Bearer ${data.accesstoken}`;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  return newInstance;
};
