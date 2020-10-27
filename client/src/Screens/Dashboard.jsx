import React, { useEffect, useState } from 'react';
import NewsCard from './NewsCards/NewsCards';
import alanBtn from "@alan-ai/alan-sdk-web";
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, signIn, pollList } from '../actions';
import { Link, Redirect } from 'react-router-dom';


export default function Dashboard() {
  const count = useSelector(state => state.count);
  const isLogged = useSelector(state => state.isLogged);
  const dispatch = useDispatch();

  const [newsArticles, setNewsArticles] = useState([]);


  useEffect(() => {
    alanBtn({
      key: '9767423808b4be1092ee90edbd6e96a02e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: ({ command }) => {
        if (command === 'Open dashboard') {
            // Call the client code that will react to the received command
          console.log('opening dashboard');
          return <Redirect to='/poll' />
        }
        // console.log('command -> ', command);
      }
    });
  }, []);


  return (
    <div>
      <h1>Welcome to your dashboard...</h1>
    </div>
  );
}