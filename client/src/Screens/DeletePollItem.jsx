import React, { useState } from 'react';
import { DELETE_POLL_API, GET_ALL_POLLS_API } from '../API';
import { getCookie } from '../helpers/auth';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { pollList } from '../actions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';


export default function DeletePollItem(props) {
  const [open, setOpen] = React.useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getPollList = async () => {
    const userID = JSON.parse(localStorage.getItem('user'))._id;
    const token = getCookie('token');

    const response = await fetch(`${GET_ALL_POLLS_API}/${userID}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    let data = await response.json();
    dispatch(pollList(data));
  }

  const handleDeleteItem = async () => {
    const userID = JSON.parse(localStorage.getItem('user'))._id;
    const pollID = props.data._id;
    const token = getCookie('token');

    setIsDeleted(true);
    setIsDisabled(true);
    const response = await fetch(`${DELETE_POLL_API}/${pollID}/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        createdBy: userID
      })
    });

    setIsDeleted(false);
    setIsDisabled(false);

    const data = await response.json();
    console.log("data -> ", data);

    if (data.status) {
      toast.success(`${data.message}`);

      // call get poll api
      getPollList();
    } else {
      toast.error(`${data.message}`);
    }

  };


  return (
    <div>
      <Typography onClick={handleClickOpen}>
        <DeleteOutlineOutlinedIcon />
        Delete
      </Typography>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
        <DialogContent>
          { isDeleted ? <CircularProgress /> : "" }
          <ToastContainer />
          <DialogContentText id="alert-dialog-description">
            Do you really want to delete these record? This process cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button 
            onClick={() => {
              handleDeleteItem();
              // handleClose();
            }}
            disabled={isDisabled}
            color="secondary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
