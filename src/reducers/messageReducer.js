import { chat_message_echo, last_50_messages } from "../actions/type";

function messageReducer(state, action) {
  switch (action.type) {
    case last_50_messages:
      return {
        ...state,
        messages: action.payload.messages,
      };

    case chat_message_echo:
      return {
        ...state,
        messages: [...state.messages, action.payload.message],
      };

    default:
      return state;
  }
}

export default messageReducer;
