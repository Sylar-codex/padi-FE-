import { unread_count } from "../actions/type";

function notificationReducer(state, action) {
  switch (action.type) {
    case unread_count:
      return {};
    default:
      return state;
  }
}

export default notificationReducer;
