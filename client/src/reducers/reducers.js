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

export const isLoggedReducer = (state = false, action) => {
  switch(action.type) {
    case 'Sign_In':
      return !state;
    default:
      return state;
  }
}