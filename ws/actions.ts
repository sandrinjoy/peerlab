// websocket message TYPES - REQUEST
export const NEW_USER = "NEW_USER";
export const FIND_USER = "FIND_USER";
export const NEW_LAB = "NEW_LAB";
export const JOIN_LAB = "JOIN_LAB";

export const SET_USERNAME = "SET_USERNAME";

// websocket message TYPES _RESPONSES
export const WS_SUCCESS = "WS_SUCCESS";
export const VALIDATE_USER = "VALIDATE_USER";
// ws message req functions
export function newUserRequest(payload: string) {
  return {
    type: NEW_USER,
    payload: payload,
  };
}

export function newLabRequest() {
  return {
    type: NEW_LAB,
  };
}
export function joinLabRequest(payload) {
  return {
    type: JOIN_LAB,
    payload,
  };
}

export function setUsername(payload) {
  return {
    type: SET_USERNAME,
    payload,
  };
}
