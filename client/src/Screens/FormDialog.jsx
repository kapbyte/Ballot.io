import React, { useState } from 'react';
import { CREATE_POLL_API } from '../API/index';
import { getCookie } from '../helpers/auth';
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


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function FormDialog() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [dataFetched, setDataFetched] = useState(false)

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

  const createPoll = async () => {
    console.log('createPoll clicked!');
    const userID = JSON.parse(localStorage.getItem('user'))._id;
    const token = getCookie('token');

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

    if (data.status) {
      toast.success(`${data.message}`);
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
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <div className="w-full max-w-3xl mx-auto rounded shadow-md bg-gray">
        <div className="py-5 px-8">

          <div className="mb-6">
            <label htmlFor="title" className="text-sm mb-2 inline-block">Enter the title of the poll</label>
            <input 
              onChange={(event) => setTitle(event.target.value)} 
              value={title}  
              name='title' 
              id='title' 
              type="text" 
              className='w-full py-2 border border-gray-400 rounded px-4' 
            />
          </div>

          <div className="mb-3">
            <label className="text-sm mb-2 inline-block">Enter all the possible answers for this poll</label>
            {choices.map((choice, index) => (
              <div key={index} className="w-full flex items-center mb-2">
                <input onChange={(event) => onChoiceChange(index, event.target.value)} key={index} type="text" value={choice} className='w-full py-2 border border-gray-400 rounded px-4' />
                <button onClick={() => removeChoice(index)} className='py-2 ml-2 px-3 bg-red-500 text-white rounded hover:bg-red-600'>Remove</button>
              </div>
            ))}
          </div>

          <button onClick={addAnswer} className='bg-blue-600 text-white px-3 py-2 border border-blue-600 active:border-blue-700 text-sm rounded-sm hover:bg-blue-700 transition duration-150 ease-in-out'>Add choice</button>
        </div>
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
            color="primary">
            Create Poll
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}