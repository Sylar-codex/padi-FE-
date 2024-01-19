import { LOGIN_SUCCESS } from "../actions/type";
function authReducer(state, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
      };
  }
}

export default authReducer;
