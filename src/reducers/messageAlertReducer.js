import { CREATE_MESSAGE_ALERT } from "../actions/type";

function messageAlertReducer(state, action) {
  switch (action.type) {
    case CREATE_MESSAGE_ALERT:
      return (state = action.payload);
    default:
      return state;
  }
}

export default messageAlertReducer;
