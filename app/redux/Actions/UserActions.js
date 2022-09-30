import * as KeyConstants from '../KeyConstants';
import BackendFactory from '../../server/BackendFactory';
import { Actions, ActionConst } from 'react-native-router-flux';

export function getUserRequest() {
  return {
    type: KeyConstants.default.GET_USER_REQUEST
  }
}

export function getUserSuccess(json) {
  return {
    type: KeyConstants.default.GET_USER_SUCCESS,
    payload: json
  }
}

export function getUserFailure(error) {
  return {
    type: KeyConstants.default.GET_USER_FAILURE,
    payload: error
  }
}

export const getUserById = (userID) => {
  return (dispatch) => {
    dispatch(getUserRequest());
    BackendFactory((api) => {
      api.getUser(userID, (res, error) => {
        if (res && res.data) {
          dispatch(getUserSuccess(res.data));
          Actions.Authenticated({ type: ActionConst.RESET });
        } else {
          dispatch(getUserFailure(error));
        }
      })
    })
  };
};
