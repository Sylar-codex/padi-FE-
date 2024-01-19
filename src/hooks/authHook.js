import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { handleApiCall } from "../services/httpConfig";
import { LOGIN_SUCCESS } from "../actions/type";

const useAuthState = () => {
  const { auth, dispatch } = useContext(AuthContext);

  const login = async (payload) => {
    try {
      const response = await handleApiCall("api/auth/login", "POST", payload);
      console.log(response.data);
      dispatch({ type: LOGIN_SUCCESS, payload: response.data });
    } catch (err) {
      console.log(err);
    }
  };
  return {
    auth,
    login,
  };
};

export default useAuthState;
