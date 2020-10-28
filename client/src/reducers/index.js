import { 
  countReducer, 
  isLoggedReducer, 
  pollListReducer, 
  pollItemReducer 
} from './reducers';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  count: countReducer,
  isLogged: isLoggedReducer,
  pollDataList: pollListReducer,
  pollItem: pollItemReducer
});

export default rootReducer;