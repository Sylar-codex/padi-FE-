import {
  chat_message_echo,
  last_50_messages,
  load_more_messages,
  online_user_list,
  user_join,
  user_leave,
} from "../actions/type";

function messageReducer(state, action) {
  switch (action.type) {
    case last_50_messages:
      return {
        ...state,
        messages: action.payload.messages,
        hasMoreMessages: action.payload.has_more,
      };

    case chat_message_echo:
      return {
        ...state,
        messages: [action.payload.message, ...state.messages],
      };

    case load_more_messages:
      return {
        ...state,
        messages: [...state.messages, ...action.payload.results],
        hasMoreMessages: action.payload.next !== null,
      };

    case user_join:
      return {
        ...state,
        onlineUsers: !state.onlineUsers.includes(action.payload.user)
          ? [...state.onlineUsers, action.payload.user]
          : state.onlineUsers,
      };
    case user_leave:
      return {
        ...state,
        onlineUsers: state.onlineUsers.filter(
          (user) => user.id !== action.payload.user.id
        ),
      };
    case online_user_list:
      return {
        ...state,
        onlineUsers: action.payload.users,
      };

    default:
      return state;
  }
}

export default messageReducer;
