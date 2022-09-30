import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { persistStore } from 'redux-persist';

// creates the store
export default (rootReducer) => {
  const createAppropriateStore = createStore;
  const createStoreWithMiddleware = applyMiddleware(thunk)(createAppropriateStore);
  const store = createStoreWithMiddleware(rootReducer);
  const persistor = persistStore(store);
  return { store, persistor };
}