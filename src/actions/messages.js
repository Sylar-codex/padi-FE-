import { CREATE_MESSAGE_ALERT, GET_ERROR } from "./type";

const createMessageAlert = (msg) => {
  return {
    type: CREATE_MESSAGE_ALERT,
    payload: msg,
  };
};
const returnError = (msg, status) => {
  return {
    type: GET_ERROR,
    payload: { msg, status },
  };
};
export { createMessageAlert, returnError };
