import keyMirror from 'key-mirror';

export default keyMirror({
  //cart actions
  ADD_TO_CART: null,
  REMOVE_FROM_CART: null,

  //load Cart actions
  GET_LIST_REQUEST: null,
  GET_LIST_SUCCESS: null,
  GET_LIST_FAILURE: null,

  //user actions
  GET_USER_REQUEST: null,
  GET_USER_SUCCESS: null,
  GET_USER_FAILURE: null,

  //auth actions
  SESSION_TOKEN_REQUEST: null,
  SESSION_TOKEN_SUCCESS: null,
  SESSION_TOKEN_FAILURE: null,

  DELETE_TOKEN_REQUEST: null,
  DELETE_TOKEN_SUCCESS: null,

  LOGIN: null,

  LOGOUT_REQUEST: null,
  LOGOUT_SUCCESS: null,
  LOGOUT_FAILURE: null,

  LOGIN_REQUEST: null,
  LOGIN_SUCCESS: null,
  LOGIN_FAILURE: null,

  RESET_PASSWORD_REQUEST: null,
  RESET_PASSWORD_SUCCESS: null,
  RESET_PASSWORD_FAILURE: null,
});