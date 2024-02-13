import { unread_count, new_message_notification } from "../actions/type";

function notificationReducer(state, action) {
  switch (action.type) {
    case unread_count:
      return {
        ...state,
        unreadMessageCount: action.payload.unread_count,
      };
    case new_message_notification:
      return {
        ...state,
        unreadMessageCount: state.unreadMessageCount + 1,
      };
    default:
      return state;
  }
}

export default notificationReducer;
