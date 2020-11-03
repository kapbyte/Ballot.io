export const countReducer = (state = 0, action) => {
  switch(action.type) {
    case 'INCREMENT':
      return state + action.payload;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

export const isLoggedInReducer = (state = false, action) => {
  switch(action.type) {
    case 'isLoggedIn':
      return !state;
    default:
      return state;
  }
}

export const pollListReducer = (state = {}, action) => {
  switch(action.type) {
    case 'POLL-LIST':
      return action.payload;
    default:
      return state;
  }
}

export const pollItemReducer = (state = {}, action) => {
  switch(action.type) {
    case 'POLL-ITEM':
      return action.payload;
    default:
      return state;
  }
}