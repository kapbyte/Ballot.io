import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


export default function VoteDashboard() {
  const classes = useStyles();
  // const pollItem = useSelector(state => state.pollItem);
  // console.log("VoteDashboard -> ", pollItem);

  // useEffect(() => {
  //   try {
  //     console.log('VoteDashboard loaded');
  //     const userID = JSON.parse(localStorage.getItem('user'))._id;

  //     const fetchData = async () => {
  //       let response = await fetch(`http://localhost:8080/user/poll/pollID/${pollItem._id}`);
  //       let data = await response.json();
  //       // dispatch(pollList(data));
        
  //       console.log("data -> ", data);
  //     };
      
  //     fetchData();

  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);


  return (
    <div className={classes.root}>
      <Typography variant="h6">Welcome to your real-time vote dashboard!</Typography>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Typography variant="h6">Graph shows here</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Typography variant="h6">Vote stats here</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h6">Vote details here: Cast your vote here</Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
