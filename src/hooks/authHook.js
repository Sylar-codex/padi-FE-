import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { handleApiCall } from "../services/httpConfig";
import {
  LOGIN_SUCCESS,
  USERS_LOADED,
  USERS_LOADING,
  USER_LOADED,
  USER_LOADING,
} from "../actions/type";

const useAuthState = () => {
  const { auth, dispatchAuth } = useContext(AuthContext);

  const [activeConversations, setActiveConversations] = useState([{}]);

  const login = async (payload) => {
    try {
      dispatchAuth({ type: USER_LOADING });
      const response = await handleApiCall("api/auth/login", "POST", payload);
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
    login,
    loadUser,
    loadUsers,
    loadActiveConversations,
    activeConversations,
  };
};

export default useAuthState;
