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
  USER_PROFILE_LOADED,
  USER_PROFILE_LOADING,
} from "../actions/type";
function authReducer(state, action) {
  switch (action.type) {
    case USER_LOADING:
    case USER_PROFILE_LOADING:
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
    case REGISTER_SUCCESS:
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
    case USER_PROFILE_LOADED:
      return {
        ...state,
        isLoading: false,
        userProfile: action.payload,
        isAuthenticated: true,
      };
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
    case LOGIN_FAIL:
      localStorage.removeItem("authToken");
      return {
        ...state,
        isLoading: false,
        user: null,
        users: null,
        isAuthenticated: false,
      };

    default:
      return state;
  }
}

export default authReducer;
