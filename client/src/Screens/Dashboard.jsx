import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, signIn } from '../actions';

export default function Dashboard() {
  const count = useSelector(state => state.count);
  const isLogged = useSelector(state => state.isLogged);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Welcome to your dashboard...</h1>
      <h1>Your count is: { count }</h1>
      <button onClick={ () => dispatch(increment(5)) }>+</button>
      <button onClick={ () => dispatch(decrement()) }>-</button>
      <div>
        <h1>isLoggedIn: { isLogged ? <h1>True</h1> : <h1>False</h1> }</h1>
        <button onClick={ () => dispatch(signIn()) } >Login</button>
      </div>
    </div>
  );
}