import { chat_message_echo, last_50_messages } from "../actions/type";

function messageReducer(state, action) {
  switch (action.type) {
    case last_50_messages:
      return {
        ...state,
        messasge: action.payload,
      };

    case chat_message_echo:
      return {
        ...state,
        message: [...state.message, action.payload],
      };

    default:
      return state;
  }
}

export default messageReducer;
