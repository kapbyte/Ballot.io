import { countReducer, isLoggedReducer, pollListReducer } from './reducers';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  count: countReducer,
  isLogged: isLoggedReducer,
  pollDataList: pollListReducer
});

export default rootReducer;