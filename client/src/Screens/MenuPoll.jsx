import React from 'react';
import { useDispatch } from 'react-redux';
import { pollItem } from '../actions';
import { Link } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PollDetailDailog from './PollDetailDailog';
import DeletePollItem from './DeletePollItem';
import HowToVoteOutlinedIcon from '@material-ui/icons/HowToVoteOutlined';


export default function MenuPoll(props) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleMenuClose = (value) => {
    setOpen(false);
  };

  const handleCheck = (data) => {
    console.log("data -> ", data);
    // const pollItem = useSelector(state => state.pollItem);
    // const dispatch = useDispatch();
    dispatch(pollItem(data));
  };


  return (
    <div>
      <MoreVertIcon
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <DeletePollItem 
            data={props.data}
          />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <PollDetailDailog 
            data={props.data}
            open={open} 
            onClose={handleMenuClose} 
            onClick={handleClickOpen} 
          />
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCheck(props.data);
            handleClose();
          }}
          button 
          component={Link} 
          to={`poll/${props.data._id}/vote`}
        >
          <HowToVoteOutlinedIcon />
          Vote
        </MenuItem>
      </Menu>
    </div>
  );
}

