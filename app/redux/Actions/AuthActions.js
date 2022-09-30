import { Actions, ActionConst } from 'react-native-router-flux';
import { appAuthToken } from '../../functions/AppAuthToken';
import * as KeyConstants from '../KeyConstants';
import BackendFactory from '../../server/BackendFactory';
const _ = require('underscore');

export function logoutState() {
  return {
    type: KeyConstants.default.LOGOUT
  }
}

export function loginState() {
  return {
    type: KeyConstants.default.LOGIN
  }
}

export function forgotPasswordState() {
  return {
    type: KeyConstants.default.FORGOT_PASSWORD
  }
}

/**
 * ## Logout actions
 */
export function logoutRequest() {
  return {
    type: KeyConstants.default.LOGOUT_REQUEST
  }
}

export function logoutSuccess() {
  return {
    type: KeyConstants.default.LOGOUT_SUCCESS
  }
}
export function logoutFailure(error) {
  return {
    type: KeyConstants.default.LOGOUT_FAILURE,
    payload: error
  }
}

export function logout() {
  return dispatch => {
    dispatch(logoutRequest());
    //dispatch(loginState());
    dispatch(logoutSuccess());
    dispatch(deleteSessionToken());
    Actions.Unauthenticated({ type: ActionConst.RESET });
  }
}

/**
 * ## SessionToken actions
 */
export function sessionTokenRequest() {
  return {
    type: KeyConstants.default.SESSION_TOKEN_REQUEST
  }
}
export function sessionTokenRequestSuccess(token) {
  return {
    type: KeyConstants.default.SESSION_TOKEN_SUCCESS,
    payload: token
  }
}
export function sessionTokenRequestFailure(error) {
  return {
    type: KeyConstants.default.SESSION_TOKEN_FAILURE,
    payload: _.isUndefined(error) ? null : error
  }
}

/**
 * ## DeleteToken actions
 */
export function deleteTokenRequest() {
  return {
    type: KeyConstants.default.DELETE_TOKEN_REQUEST
  }
}
export function deleteTokenRequestSuccess() {
  return {
    type: KeyConstants.default.DELETE_TOKEN_SUCCESS
  }
}

/**
 * ## Delete session token
 *
 * Call the AppAuthToken deleteSessionToken
 */
export function deleteSessionToken() {
  return dispatch => {
    dispatch(deleteTokenRequest());
    return appAuthToken.deleteSessionToken()
      .then(() => {
        dispatch(deleteTokenRequestSuccess())
      })
  }
}

export function getSessionToken() {
  return (dispatch) => {
    dispatch(sessionTokenRequest());
    return appAuthToken.getSessionToken()
      .then((token) => {
        if (token) {
          dispatch(sessionTokenRequestSuccess(token));
          //dispatch(logoutState());
          Actions.Authenticated({ type: ActionConst.RESET })
        } else {
          dispatch(sessionTokenRequestFailure());
          Actions.Unauthenticated({ type: ActionConst.RESET })
        }
      })
      .catch((error) => {
        dispatch(sessionTokenRequestFailure(error));
        //dispatch(loginState());
        Actions.Unauthenticated({ type: ActionConst.RESET })
      })
  }
}

export function saveSessionToken(json) {
  return appAuthToken.storeSessionToken(json)
}

/**
 * ## Login actions
 */
export function loginRequest() {
  return {
    type: KeyConstants.default.LOGIN_REQUEST
  }
}

export function loginSuccess(json) {
  return {
    type: KeyConstants.default.LOGIN_SUCCESS,
    payload: json
  }
}

export function loginFailure(error) {
  return {
    type: KeyConstants.default.LOGIN_FAILURE,
    payload: error
  }
}

export const login = (email, password) => {
  return (dispatch) => {
    dispatch(loginRequest());
    BackendFactory((api) => {
      api.login({
        username: email,
        password: password
      }, (res, error) => {
        if (res && res.data) {
          //appAuthToken.storeLoggedOut(false);
          return saveSessionToken(res.data)
            .then(function () {
              dispatch(loginSuccess(res.data));
              Actions.FetchUser({ type: ActionConst.RESET, userId: email });
              //dispatch(logoutState());
            })
        } else {
          dispatch(loginFailure(error));
        }
      });
    });
  }
}

/**
 * ## ResetPassword actions
 */
export function resetPasswordRequest() {
  return {
    type: KeyConstants.default.RESET_PASSWORD_REQUEST
  }
}

export function resetPasswordSuccess() {
  return {
    type: KeyConstants.default.RESET_PASSWORD_SUCCESS
  }
}

export function resetPasswordFailure(error) {
  return {
    type: KeyConstants.default.RESET_PASSWORD_FAILURE,
    payload: error
  }
}

export function resetPassword(email) {
  return dispatch => {
    dispatch(resetPasswordRequest());
    BackendFactory(function (api) {
      api.resetPassword({
        email: email
      })
        .then(() => {
          dispatch(loginState());
          dispatch(resetPasswordSuccess());
          Actions.Login()
        })
        .catch((error) => {
          dispatch(resetPasswordFailure(error))
        })
    })
  }
}
