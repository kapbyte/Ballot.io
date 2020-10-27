// import React from 'react';
// import { Link } from 'react-router-dom';
// import { withStyles } from '@material-ui/core/styles';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import DraftsIcon from '@material-ui/icons/Drafts';
// import DeleteIcon from '@material-ui/icons/Delete';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
// import PollDetailDailog from './PollDetailDailog';
// import DeletePollItem from './DeletePollItem';
// import Vote from '../Screens/Vote';


// const StyledMenu = withStyles({
//   paper: {
//     border: '1px solid #d3d4d5',
//   },
// })((props) => (
//   <Menu
//     elevation={0}
//     getContentAnchorEl={null}
//     anchorOrigin={{
//       vertical: 'bottom',
//       horizontal: 'center',
//     }}
//     transformOrigin={{
//       vertical: 'top',
//       horizontal: 'center',
//     }}
//     {...props}
//   />
// ));


// const StyledMenuItem = withStyles((theme) => ({
//   root: {
//     '&:focus': {
//       backgroundColor: theme.palette.primary.main,
//       '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
//         color: theme.palette.common.white,
//       },
//     },
//   },
// }))(MenuItem);


// export default function MenuPoll(props) {
//   const [anchorEl, setAnchorEl] = React.useState(null);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleDeleteItem = async () => {
//     console.log("item to delete -> ", props.data);
//     // const pollID = props.data._id;
//     // console.log("pollID -> ", pollID);

//     // const response = await fetch(`http://localhost:8080/user/polls/${pollID}`, {
//     //   method: 'DELETE',
//     //   headers: {
//     //     'Content-Type': 'application/json'
//     //   }
//     // });

//     // const data = await response.json();
//     // console.log("data -> ", data);
//   };

//   const [open, setOpen] = React.useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleMenuClose = (value) => {
//     setOpen(false);
//   };


//   return (
//     <div>
      // <MoreVertIcon
      //   aria-controls="customized-menu"
      //   aria-haspopup="true"
      //   variant="contained"
      //   color="primary"
      //   onClick={handleClick}
      // />
//       <StyledMenu
//         id="customized-menu"
//         anchorEl={anchorEl}
//         keepMounted
//         open={Boolean(anchorEl)}
//         onClose={handleClose}
//       >
//         {/* <StyledMenuItem onClick={ () => handleDeleteItem() }>
//           <ListItemIcon>
//             <DeleteIcon fontSize="small" />
//             <DeletePollItem />
//           </ListItemIcon>
//           <ListItemText primary="Delete" />
//         </StyledMenuItem> */}
//         <StyledMenuItem>
//           <ListItemIcon>
//             <DeletePollItem />
//           </ListItemIcon>
//         </StyledMenuItem>
//         <StyledMenuItem>
//           <ListItemIcon>
//             <PollDetailDailog 
//               data={props.data}
//               open={open} 
//               onClose={handleMenuClose} 
//               onClick={handleClickOpen} 
//             />
//           </ListItemIcon>
//         </StyledMenuItem>
//         <StyledMenuItem button component={Link} to="/vote">
//           <ListItemIcon>
//             <InboxIcon fontSize="small" />
//           </ListItemIcon>
//           <ListItemText primary="Vote" />
//         </StyledMenuItem>
//       </StyledMenu>
//     </div>
//   );
// }

import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PollDetailDailog from './PollDetailDailog';
import DeletePollItem from './DeletePollItem';
import HowToVoteOutlinedIcon from '@material-ui/icons/HowToVoteOutlined';


export default function MenuPoll(props) {
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


  return (
    <div>
      {/* <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Open Menu
      </Button> */}
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
        <MenuItem onClick={handleClose} button component={Link} to="/vote">
          <HowToVoteOutlinedIcon />
          Vote
        </MenuItem>
      </Menu>
    </div>
  );
}

