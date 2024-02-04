import {
  chat_message_echo,
  last_50_messages,
  load_more_messages,
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

    default:
      return state;
  }
}

export default messageReducer;
