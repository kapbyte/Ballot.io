// import React, { useState, useEffect } from 'react';
// import authSvg from '../assests/reset.svg';
// import { ToastContainer, toast } from 'react-toastify';
// import axios from 'axios';


// const ResetPassword = ({ match }) => {
  // const [formData, setFormData] = useState({
  //   password1: '',
  //   password2: '',
  //   token: '',
  //   textChange: 'Submit'
  // });

  // const { password1, password2, token, textChange } = formData;
  
  // useEffect(() => {
  //   let token = match.params.token
    
  //   if (token) {
  //     setFormData({ ...formData, token });
  //   }
  // }, []);

  // const handleChange = text => e => {
  //   setFormData({ ...formData, [text]: e.target.value });
  // };
  
//   const handleSubmit = e => {
//     e.preventDefault();
//     console.log(`${process.env.REACT_APP_API_URL}/reset-password`);

    // if (password1 && password2) {
    //   if (password1 === password2) {
    //     setFormData({ 
    //       ...formData, 
    //       textChange: 'Submitting' 
    //     });
    //     axios.put(`https://ballot-io.herokuapp.com/auth/reset-password`, {
          // newPassword: password1,
          // resetPasswordLink: token
    //     })
    //     .then(res => {
    //       console.log(res.data.message)
    //       setFormData({ ...formData, password1: '', password2: '' });
    //       toast.success(res.data.message);
    //     })
    //     .catch(err => {
    //       console.log(err);
    //       toast.error('Something is wrong try again');
    //     });
    //   } else {
    //     toast.error('Password does not match!');
    //   }
    // } else {
    //   toast.error('Please fill all fields');
    // }
//   };

//   return (
//     <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
//       <ToastContainer />
//       <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
//         <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
//           <div className='mt-12 flex flex-col items-center'>
//             <h1 className='text-2xl xl:text-3xl font-extrabold'>
//               Reset Your Password
//             </h1>
//             <div className='w-full flex-1 mt-8 text-indigo-500'>
              
//               <form
//                 className='mx-auto max-w-xs relative '
//                 onSubmit={handleSubmit}
//               >
//                 <input
//                   className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
//                   type='password'
//                   placeholder='password'
//                   onChange={handleChange('password1')}
//                   value={password1}
//                   />
//                   <input
//                   className='w-full mt-5 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
//                   type='password'
//                   placeholder='Confirm password'
//                   onChange={handleChange('password2')}
//                   value={password2}
//                 />
//                 <button
//                   type='submit'
//                   className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
//                 >
//                   <i className='fas fa-sign-in-alt  w-6  -ml-2' />
//                   <span className='ml-3'>Submit</span>
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//         <div className='flex-1 bg-indigo-100 text-center hidden lg:flex'>
//           <div
//             className='m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat'
//             style={{ backgroundImage: `url(${authSvg})` }}
//           ></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { USER_RESET_PASSWORD_API } from '../API/index';
import { ToastContainer, toast } from 'react-toastify';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

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
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function ResetPassword({ match }) {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    password1: '',
    password2: '',
    token: '',
    textChange: 'Submit'
  });

  const { password1, password2, token, textChange } = formData;

  useEffect(() => {
    let token = match.params.token
    if (token) {
      setFormData({ ...formData, token });
    }
  }, []);

  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('form data -> ', formData);

    if (password1 && password2) {
      if (password1 === password2) {
        setFormData({ ...formData, textChange: 'Submitting' });

        // axios.put(`https://ballot-io.herokuapp.com/auth/reset-password`, {
        //   newPassword: password1,
        //   resetPasswordLink: token
        // })
        // .then(res => {
        //   console.log(res.data.message)
        //   setFormData({ ...formData, password1: '', password2: '' });
        //   toast.success(res.data.message);
        // })
        // .catch(err => {
        //   console.log(err);
        //   toast.error('Something is wrong try again');
        // });

        const response = await fetch(`${USER_RESET_PASSWORD_API}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            newPassword: password1,
            resetPasswordLink: token
          })
        });
    
        console.log('response -> ', response);
        const data = await response.json();
  
        console.log('data -> ', data);

        if (data.success) {
          setFormData({
            ...formData,
            textChange: 'Submit'
          });
          toast.success(`${data.message}`);
        } else {
          setFormData({
            ...formData,
            textChange: 'Submit'
          });
          toast.error(`${data.message}`);
        }

      } else {
        toast.error('Password does not match!');
      }
    } else {
      toast.error('Please fill all fields');
    }

  }


  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <ToastContainer />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Your Password
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange('password1')}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Confirm Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange('password2')}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              { textChange }
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                <Link to='/' variant="body2">
                  Sign In
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}