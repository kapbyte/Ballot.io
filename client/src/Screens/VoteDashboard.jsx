import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Pusher from 'pusher-js';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { pollItem } from '../actions';
import { GET_POLL_BY_ID_API, VOTE_API } from '../API';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grow from '@material-ui/core/Grow';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import VoteChart from './VoteChart';
import Deposits from './Deposits';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function VoteDashboard({ match }) {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const voteData = useSelector(state => state.voteItem.data);
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false);
  const pollID = match.params.pollID;

  useEffect(() => {

    (async () => {
      const response = await fetch(`${GET_POLL_BY_ID_API}/${pollID}`);
      let data = await response.json();
      console.log("data -> ", data);

      dispatch(pollItem(data));
      setIsLoaded(true);
    })();

  }, []);

  const [value, setValue] = React.useState('');
  console.log('voteData -> ', voteData);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedIndex = voteData.options.map((item) => item.name).indexOf(value);

    const response = await fetch(`${VOTE_API}/${pollID}/vote`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ip: '5171',
        selectedIndex: selectedIndex
      })
    });

    const data = await response.json();
    console.log('data -> ', data);

    if (data.success) {
      toast.success(`${data.message}`);
    } else {
      toast.error(`${data.message}`);
    }
  }

  // Enable pusher logging - don't include this in production
  // Pusher.logToConsole = true;

  // var pusher = new Pusher('ec46cbf6ef376f98cd70', {
  //   cluster: 'eu'
  // });

  // var channel = pusher.subscribe('os-poll');
  // channel.bind('os-vote', function(data) {
  //   console.log('pusher data -> ', data);
  // });

  const graphData = [
    {
      name: 'Page A', pv: 2400, amt: 2400,
    },
    {
      name: 'Page B', pv: 1398, amt: 2210,
    },
    {
      name: 'Page C', pv: 9800, amt: 2290,
    },
    {
      name: 'Page D', pv: 3908, amt: 2000,
    }
  ];

  return (
    <div className={classes.root}>
      <CssBaseline />
      <ToastContainer />
      <div className={classes.appBarSpacer} />
        { !isLoaded ? <CircularProgress /> : (
          <Container maxWidth="lg" className={classes.container}>
            <Grow in>
              <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12} md={8} lg={6}>
                  <Paper className={fixedHeightPaper}>
                    <VoteChart 
                      data={voteData.options}
                    />
                  </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={6}>
                  <Paper className={fixedHeightPaper}>
                    <Deposits />
                  </Paper>
                </Grid>
                {/* Recent Orders */}
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <Typography variant="h6">{voteData.title}</Typography>
                    <FormControl component="fieldset">
                      <FormLabel component="legend"></FormLabel>
                      <RadioGroup aria-label={value} name={value} value={value} onChange={handleChange}>
                        {voteData.options.map((data, index) => (
                          <FormControlLabel 
                            key={index}
                            value={data.name} 
                            control={<Radio />} 
                            label={data.name} 
                          />
                        ))}
                      </RadioGroup>
                      <Button 
                        variant="contained" 
                        color="primary"
                        onClick={handleSubmit}
                      >
                        Vote
                      </Button>
                    </FormControl>
                  </Paper>
                </Grid>
              </Grid>
            </Grow>
            <Box pt={4}>
              <Copyright />
            </Box>
          </Container>
        )}
    </div>
  );
}
