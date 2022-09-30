import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import * as KeyConstants from '../KeyConstants';

const INITIAL_STATE = {
  userProfile: []
};
const UserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case KeyConstants.default.GET_USER_REQUEST:
    case KeyConstants.default.GET_USER_SUCCESS: {
      return {
        ...state,
        userProfile: action.payload
      }
    }
    case KeyConstants.default.GET_USER_FAILURE:
    default:
      return state;
  }
};

const persistConfig = {
  key: 'user',
  storage: storage,
  whitelist: ['userProfile']
};

export default persistReducer(persistConfig, UserReducer);