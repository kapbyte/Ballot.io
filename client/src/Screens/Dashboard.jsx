import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, signIn, pollList } from '../actions';

export default function Dashboard() {
  const count = useSelector(state => state.count);
  const isLogged = useSelector(state => state.isLogged);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   try {
  //     console.log('page loaded');
  //     const userID = JSON.parse(localStorage.getItem('user'))._id;

  //     (async () => {
  //       let response = await fetch(`http://localhost:8080/user/polls/${userID}`);
  //       let data = await response.json();
  //       dispatch(pollList(data));
  //       console.log("dashboard -> ", data);
  //     })();

  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);


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