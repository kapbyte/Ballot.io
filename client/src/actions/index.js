export const increment = (data) => {
  return {
    type: 'INCREMENT',
    payload: data
  }
}

export const decrement = () => {
  return {
    type: 'DECREMENT'
  }
}

export const isLoggedIn = () => {
  return {
    type: 'isLoggedIn'
  }
}

export const pollList = (data) => {
  return {
    type: 'POLL-LIST',
    payload: data
  }
}

export const pollItem = (data) => {
  return {
    type: 'POLL-ITEM',
    payload: data
  }
}