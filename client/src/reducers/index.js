import { countReducer, isLoggedReducer } from './reducers';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  count: countReducer,
  isLogged: isLoggedReducer
});

export default rootReducer;