import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Grow,
  Typography
} from '@material-ui/core';
import DashboardCard from './DashboardCard/DashboardCard';
import DashboardPollDetails from './DashboardPollDetails/DashboardPollDetails';
import NewsCard from './NewsCards/NewsCards';
import alanBtn from "@alan-ai/alan-sdk-web";
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, signIn, pollList } from '../actions';


const useStyles = makeStyles({
  container: {
    padding: '0 5%', width: '100%', margin: 0,
  },
});



export default function Dashboard() {
  const classes = useStyles();
  const count = useSelector(state => state.count);
  const isLogged = useSelector(state => state.isLogged);
  const dispatch = useDispatch();

  // const [newsArticles, setNewsArticles] = useState([]);


  // useEffect(() => {
  //   alanBtn({
  //     key: '9767423808b4be1092ee90edbd6e96a02e956eca572e1d8b807a3e2338fdd0dc/stage',
  //     onCommand: ({ command, articles }) => {
  //       if (command === 'newHeadlines') {
  //           // Call the client code that will react to the received command
  //           // console.log(articles);
  //           // setNewsArticles(articles);
  //         }
  //       }
  //   });
  // }, []);


  return (
    <div>
      <Typography variant="h6">Welcome to your dashboard!!</Typography>
      <Grow in>
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
          {['1', '2', '3'].map(() => (
            <Grid item xs={12} sm={6} md={4} lg={4} style={{ display: 'flex' }}>
              <DashboardCard />
            </Grid>
          ))}
        </Grid>
      </Grow>
      <Grow in>
        <DashboardPollDetails />
      </Grow>
    </div>
  );
}