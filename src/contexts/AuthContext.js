import { createContext, useReducer } from "react";
import authReducer from "../reducers/authReducer";

const AuthContext = createContext(null);

const { Provider } = AuthContext;

const initialState = {
  user: null,
  token: localStorage.getItem("authToken"),
  isAuthenticated: false,
  isLoading: false,
  isSubmitting: false,
};

const AuthProvider = ({ children }) => {
  const [auth, dispatchAuth] = useReducer(initialState, authReducer);
  return <Provider value={{ auth, dispatchAuth }}>{children}</Provider>;
};

export { AuthProvider, AuthContext };
