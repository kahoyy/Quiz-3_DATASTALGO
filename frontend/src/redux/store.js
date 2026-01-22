import { createStore, combineReducers, applyMiddleware } from 'redux';
import { authReducer } from './authReducer';
import { dataReducer } from './dataReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  data: dataReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
