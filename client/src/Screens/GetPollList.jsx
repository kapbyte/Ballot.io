import React, { useEffect, useState } from 'react';
import FormDialog from './FormDialog';
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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

function handleCheckItem() {
  console.log('handleCheckItem');
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function handleCreatePoll() {
  console.log('handleCreatePoll');
}

export default function GetPollList() {
  const classes = useStyles();
  const [ pollListData, setPollListData ] = useState({});

  useEffect(() => {
    try {
      console.log('page loaded');
      const userID = JSON.parse(localStorage.getItem('user'))._id;

      (async () => {
        let response = await fetch(`http://localhost:8080/user/polls/${userID}`);
        let data = await response.json();
        // setPollListData();
        localStorage.setItem('pollList', JSON.stringify(data));
        console.log(data);
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
      <h1>Poll list of { JSON.parse(localStorage.getItem('user')).name }</h1>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Title</TableCell>
              <TableCell align="right">Contestant</TableCell>
              <TableCell align="right">Total Vote</TableCell>
              <TableCell align="right">Expires</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.name}>
                <TableCell>{index + 1}</TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
                <MoreVertIcon onClick={handleCheckItem}/>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <Fab color="primary" aria-label="add" > 
        <AddIcon />
      </Fab> */}
      <FormDialog open={open} onClose={handleClose} onClick={handleClickOpen} />
    </div>
  );
}
