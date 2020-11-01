import React, { useEffect, useState } from 'react';
import { GET_ALL_USER_POLLS_API, test } from '../API';
import { useSelector, useDispatch } from 'react-redux';
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
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';


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

function handleCheckItem(index) {
  console.log('handleCheckItem', index);
}


export default function GetPollList() {
  const classes = useStyles();
  const [isLoaded, setIsLoaded] = useState(false);
  const pollData = useSelector(state => state.pollDataList.pollDataList);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      console.log('page loaded');
      console.log('GET_ALL_USER_POLLS_API ', GET_ALL_USER_POLLS_API);
      console.log('test ', test)

      const userID = JSON.parse(localStorage.getItem('user'))._id;

      (async () => {
        let response = await fetch(`http://localhost:8080/user/polls/userID/${userID}`);
        console.log("response -> ", response);
        
        let data = await response.json();
        console.log("data -> ", data);

        dispatch(pollList(data));
        setIsLoaded(true);
      })();

    } catch (error) {
      console.log(error);
    }
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
      <Typography variant="h6">Poll list of { JSON.parse(localStorage.getItem('user')).name }</Typography>
      { !isLoaded ? <CircularProgress /> : isLoaded && (pollData === undefined || !pollData.length) ? <DeleteIcon /> : (
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
                    onClick={() => {
                      handleCheckItem(index);
                    }}
                  />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {/* <Fab color="primary" aria-label="add" > 
        <AddIcon />
      </Fab> */}
      <FormDialog open={open} onClose={handleClose} onClick={handleClickOpen} />
    </div>
  );
}
