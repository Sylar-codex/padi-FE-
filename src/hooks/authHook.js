import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { handleApiCall } from "../services/httpConfig";
import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USERS_LOADED,
  USERS_LOADING,
  USER_LOADED,
  USER_LOADING,
} from "../actions/type";
// import { returnError } from "../actions/messages";

const useAuthState = () => {
  const { auth, dispatchAuth } = useContext(AuthContext);

  const [activeConversations, setActiveConversations] = useState([{}]);

  // Register new user
  const register = async (payload) => {
    payload = JSON.stringify(payload);
    try {
      const response = await handleApiCall(
        "api/auth/register",
        "POST",
        payload
      );
      console.log("success");
      dispatchAuth({ type: REGISTER_SUCCESS, payload: response.data });
    } catch (err) {
      dispatchAuth({ type: REGISTER_FAIL });
      console.log(err);
    }
  };

  // login existing user
  const login = async (payload) => {
    try {
      dispatchAuth({ type: USER_LOADING });
      const response = await handleApiCall("api/auth/login", "POST", payload);
      dispatchAuth({ type: LOGIN_SUCCESS, payload: response.data });
    } catch (err) {
      console.log(err);
      dispatchAuth({ type: LOGIN_FAIL });
    }
  };

  // logout user
  const logout = async () => {
    try {
      const response = await handleApiCall("api/auth/logout", "POST", null);
      dispatchAuth({ type: LOGOUT_SUCCESS });
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
      dispatchAuth({ type: USERS_LOADING });
      const response = await handleApiCall("api/auth/get_all_users", "GET");
      dispatchAuth({ type: USERS_LOADED, payload: response.data });
    } catch (err) {
      console.log(err);
    }
  };
  const loadActiveConversations = async () => {
    try {
      const response = await handleApiCall("api/conversations", "GET");
      console.log(response.data);
      setActiveConversations(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    auth,
    register,
    login,
    logout,
    loadUser,
    loadUsers,
    loadActiveConversations,
    activeConversations,
  };
};

export default useAuthState;
