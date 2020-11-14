import React, { useState } from 'react';
import { CREATE_POLL_API, GET_ALL_POLLS_API } from '../API';
import { useSelector, useDispatch } from 'react-redux';
import { getCookie } from '../helpers/auth';
import { pollList } from '../actions';
import { makeStyles } from '@material-ui/core/styles';
import { ToastContainer, toast } from 'react-toastify';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function FormDialog() {
  const classes = useStyles();
  const pollData = useSelector(state => state.pollDataList.data);
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const [dataFetched, setDataFetched] = useState(false);

  let [isDisabled, setIsDisabled] = useState(false);
  const [buttonText, setButtonText] = useState({
    textChange: 'CREATE POLL'
  });

  const { textChange } = buttonText;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const [title, setTitle] = useState('');
  const [choices, setChoices] = useState(['']);

  const addAnswer = () => {
    setChoices([
      ...choices,
      ''
    ]);
  }

  const removeChoice = (index) => {
    const newChoices = choices.filter((choice, choiceIndex) => {
      return choiceIndex !== index;
    })

    setChoices(newChoices);
  }

  const onChoiceChange = (index, value) => {
    console.log('index -> ', index);
    const newChoices = choices.map((choice, choiceIndex) => {
      if (choiceIndex === index) {
        return value
      }
      return choice
    })

    console.log(newChoices);
    setChoices(newChoices)
  }

  const getPollList = async () => {
    console.log('getPollList clicked!');
    const userID = JSON.parse(localStorage.getItem('user'))._id;
    const token = getCookie('token');

    const response = await fetch(`${GET_ALL_POLLS_API}/${userID}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('response -> ', response);
    let data = await response.json();
    console.log("data -> ", data);

    dispatch(pollList(data));
  }

  const createPoll = async () => {
    console.log('createPoll clicked!');
    const userID = JSON.parse(localStorage.getItem('user'))._id;
    const token = getCookie('token');

    setIsDisabled(true);
    setButtonText({ ...buttonText, textChange: 'SUBMITTING' });
    const response = await fetch(`${CREATE_POLL_API}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        createdBy: userID,
        title: title,
        options: choices
      })
    });

    const data = await response.json();
    console.log('response -> ', data);

    setIsDisabled(false);
    setButtonText({ ...buttonText, textChange: 'CREATE POLL' });

    if (data.status) {
      toast.success(`${data.message}`);
      getPollList(); // call get poll api
      setTitle('');
      setChoices(['']);
    } else {
      toast.error(`${data.message}`);
    }
  }


  return (
    <div className={classes.root}>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog file.js
      </Button> */}
      <Tooltip title="Create Poll">
        <Fab color="primary" aria-label="add" onClick={handleClickOpen} > 
          <AddIcon />
        </Fab>
      </Tooltip>
      
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <ToastContainer />
        {/* <CircularProgress /> */}
        <DialogTitle id="form-dialog-title">Create poll</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This section enables you to create a poll of your choice.
          </DialogContentText>

        <div>
          <Typography>Enter the title of the poll</Typography>
          <TextField
            autoComplete="title"
            name="title"
            variant="outlined"
            required
            id="title"
            label="Enter title"
            size="small"
            autoFocus
            value={title}
            onChange={(event) => setTitle(event.target.value)} 
          />
        </div>

        <div>
          <Typography>Enter all the possible answers for this poll</Typography>
          {choices.map((choice, index) => (
            <div key={index}>
              <TextField
                autoComplete="title"
                name="title"
                variant="outlined"
                required
                id={index}
                label="Enter option"
                size="small"
                autoFocus
                key={index}
                value={title}
                value={choice}
                onChange={(event) => onChoiceChange(index, event.target.value)}
              />
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<DeleteIcon />}
                onClick={() => removeChoice(index)}
              >
                Delete
              </Button>
            </div>
          ))}

          <Button onClick={addAnswer} variant="contained" size="medium" color="primary">
            Add choice
          </Button>

        </div>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              createPoll();
              // handleClose();
           }}
            disabled={isDisabled}
            color="primary"
          >
            { textChange }
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}