import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { handleApiCall } from "../services/httpConfig";
import { LOGIN_SUCCESS, USER_LOADED, USER_LOADING } from "../actions/type";

const useAuthState = () => {
  const { auth, dispatchAuth } = useContext(AuthContext);

  const login = async (payload) => {
    try {
      dispatchAuth({ type: USER_LOADING });
      const response = await handleApiCall("api/auth/login", "POST", payload);
      console.log(response.data);
      dispatchAuth({ type: LOGIN_SUCCESS, payload: response.data });
    } catch (err) {
      console.log(err);
    }
  };

  //  get logged in user
  const loadUser = async () => {
    try {
      dispatchAuth({ type: USER_LOADING });
      const response = await handleApiCall("api/auth/user", "GET");
      dispatchAuth({ type: USER_LOADED, payload: response.data });
    } catch (err) {
      console.log(err);
    }
  };

  // get all users
  const loadUsers = async () => {
    try {
      // logic goes here
    } catch (err) {
      console.log(err);
    }
  };

  return {
    auth,
    login,
    loadUser,
    loadUsers,
  };
};

export default useAuthState;
