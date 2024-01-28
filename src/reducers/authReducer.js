import {
  LOGIN_SUCCESS,
  USERS_LOADED,
  USERS_LOADING,
  USER_LOADED,
  USER_LOADING,
} from "../actions/type";
function authReducer(state, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("authToken", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case USERS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USERS_LOADED:
      return {
        ...state,
        users: action.payload,
        isLoading: false,
        isAuthenticated: true,
      };
    default:
      return state;
  }
}

export default authReducer;
