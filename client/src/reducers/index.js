import { 
  countReducer, 
  isLoggedInReducer, 
  pollListReducer, 
  pollItemReducer 
} from './reducers';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  count: countReducer,
  isLoggedIn: isLoggedInReducer,
  pollDataList: pollListReducer,
  voteItem: pollItemReducer
});

export default rootReducer;