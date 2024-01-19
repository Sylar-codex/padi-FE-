import { LOGIN_SUCCESS } from "../actions/type";
function authReducer(state, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("AuthToken", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };
  }
}

export default authReducer;
