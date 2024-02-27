import {
  AUTH_ERROR,
  FORM_SUBMISSION,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  SUBMISSION_SUCCESS,
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
        isSubmitting: false,
        user: action.payload,
      };
    case FORM_SUBMISSION:
      return {
        ...state,
        isSubmitting: true,
      };
    case SUBMISSION_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("authToken", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
        isSubmitting: false,
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
    case AUTH_ERROR:
      localStorage.removeItem("authToken");
      return {
        ...state,
        isLoading: false,
        user: null,
        users: null,
        isAuthenticated: false,
        isSubmitting: false,
      };

    default:
      return state;
  }
}

export default authReducer;
