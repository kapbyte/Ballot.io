import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
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
  const [isDeleted, setIsDeleted] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteItem = async () => {
    console.log("item to delete -> ", props.data);
    const pollID = props.data._id;
    console.log("pollID -> ", pollID);

    setIsDeleted(false);
    const response = await fetch(`http://localhost:8080/user/polls/${pollID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    setIsDeleted(true);
    const data = await response.json();
    console.log("data -> ", data);
    if (data.status) {
      toast.success(`${data.message}`);
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
        <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          { isDeleted == false ? <CircularProgress /> : "" }
          <ToastContainer />
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button 
            onClick={() => {
              handleDeleteItem();
              handleClose();
            }}
            color="secondary"
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
