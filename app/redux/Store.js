import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import CartReducer from './Reducers/CartReducer';
import UserReducer from './Reducers/UserReducer';
import configureStore from './CreateStore';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

export default () => {
	const persistConfig = {
		key: 'root',
		storage: storage,
		stateReconciler: autoMergeLevel2
	};

	const rootReducer = combineReducers({
		card: CartReducer,
		user: UserReducer
	});
	const pReducer = persistReducer(persistConfig, rootReducer);
	return configureStore(pReducer);
}
