import {
  unread_count,
  new_message_notification,
  GET_ACTIVE_CONVERSATIONS,
} from "../actions/type";

function notificationReducer(state, action) {
  switch (action.type) {
    case unread_count:
      return {
        ...state,
        unreadMessageCount: action.payload.unread_count,
        activeConversations: action.payload.conversations,
      };
    case new_message_notification:
      return {
        ...state,
        unreadMessageCount: state.unreadMessageCount + 1,
        activeConversations: state.activeConversations.map(
          (activeConversation) =>
            activeConversation.id === action.payload.conversation.id
              ? { ...action.payload.conversation }
              : activeConversation
        ),
      };
    case GET_ACTIVE_CONVERSATIONS:
      return {
        ...state,
        activeConversations: action.payload,
      };
    default:
      return state;
  }
}

export default notificationReducer;
