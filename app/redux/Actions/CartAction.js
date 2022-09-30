import * as KeyConstants from '../KeyConstants';
import BackendFactory from '../../server/BackendFactory';

export const addToCart = (item) => {
  return {
    type: KeyConstants.default.ADD_TO_CART,
    payload: item
  }
}

export const removeFromCart = (item) => {
  return {
    type: KeyConstants.default.REMOVE_FROM_CART,
    payload: item
  }
}

export const getListRequest = () => {
  return {
    type: KeyConstants.default.GET_LIST_REQUEST
  };
};

export const getListSuccess = (json) => {
  return {
    type: KeyConstants.default.GET_LIST_SUCCESS,
    payload: json
  };
};

export const getListFailure = (json) => {
  return {
    type: KeyConstants.default.GET_LIST_FAILURE,
    payload: json
  };
};

export const getList = () => {
  return (dispatch) => {
    dispatch(getListRequest());
    BackendFactory((api) => {
      api.getAll((res, error) => {
        if (res) {
          dispatch(getListSuccess(res.fruits));
        } else {
          dispatch(getListFailure(error));
        }
      })
    })
  };
};