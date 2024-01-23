import { createContext, useReducer } from "react";
import authReducer from "../reducers/authReducer";

const AuthContext = createContext(null);

const { Provider } = AuthContext;

const initialState = {
  user: null,
  users: [{}],
  token: localStorage.getItem("authToken"),
  isAuthenticated: false,
  isLoading: false,
  isSubmitting: false,
};

const AuthProvider = ({ children }) => {
  const [auth, dispatchAuth] = useReducer(authReducer, initialState);
  return <Provider value={{ auth, dispatchAuth }}>{children}</Provider>;
};

export { AuthProvider, AuthContext };
