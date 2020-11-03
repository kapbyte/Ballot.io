import React, { useEffect, useState } from 'react';
import { getCookie } from '../helpers/auth';
import { GET_ALL_POLLS_API } from '../API';
import { useSelector, useDispatch } from 'react-redux';
import { ReactComponent as EmptyPoll } from '../assests/noData.svg';
import { pollList } from '../actions';
import FormDialog from './FormDialog';
import MenuPoll from './MenuPoll';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

function NoData() {
  return (
    <div>
      <EmptyPoll />
    </div>
  );
}


export default function GetPollList() {
  const classes = useStyles();
  const [isLoaded, setIsLoaded] = useState(false);
  const pollData = useSelector(state => state.pollDataList.data);
  const dispatch = useDispatch();

  useEffect(() => {
    const userID = JSON.parse(localStorage.getItem('user'))._id;
    const token = getCookie('token')
    console.log('useEffect token -> ', token);

    (async () => {
      const response = await fetch(`${GET_ALL_POLLS_API}/${userID}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log('response -> ', response);
      let data = await response.json();
      console.log("data -> ", data);

      dispatch(pollList(data));
      setIsLoaded(true);

    })();
    
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };
  

  return (
    <div className={classes.root}>
      { !isLoaded ? <CircularProgress /> : isLoaded && (pollData === undefined || !pollData.length) ? <NoData /> : (
        <div className={classes.root}>
          <Typography variant="h5">Poll List</Typography>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell align="center">Contestant</TableCell>
                  <TableCell align="center">Total Vote</TableCell>
                  <TableCell align="center">Expires</TableCell>
                  <TableCell align="center">Poll ID</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pollData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell component="th" scope="row">
                      { row.title }
                    </TableCell>
                    <TableCell align="center">{ row.options.length }</TableCell>
                    <TableCell align="center">{ row.totalVotes }</TableCell>
                    <TableCell align="center">{ row.date }</TableCell>
                    <TableCell align="center">{ row._id }</TableCell>
                    <MenuPoll
                      data={row}
                    />
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
      <FormDialog 
        open={open} 
        onClose={handleClose} 
        onClick={handleClickOpen} 
      />
    </div>
  );
}
