import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isLoggedIn } from '../actions';
import { Link, Redirect } from 'react-router-dom';
import { USER_LOGIN_API } from '../API';
import { authenticate, isAuth } from '../helpers/auth';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
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

export default function Login() {
  const classes = useStyles();
  const isLogged = useSelector(state => state.isLogged);
  const dispatch = useDispatch();

  let [isDisabled, setIsDisabled] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    textChange: 'Sign In'
  });

  const { email, password, textChange } = formData;

  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (email && password) {
      setIsDisabled(true);
      setFormData({ ...formData, textChange: 'Submitting' });
      
      axios.post(`${USER_LOGIN_API}`, {
        email,
        password
      })
      .then(res => {
        authenticate(res, () => {
          setFormData({
            ...formData,
            email: '',
            password: '',
            textChange: 'Sign In'
          });
          setIsDisabled(false);
        });
      })
      .catch(err => {
        setFormData({
          ...formData,
          textChange: 'Sign In'
        });
        setIsDisabled(false);
        console.log(err.response);
        toast.error(err.response.data.message);
      });
    } else {
      toast.error('Please fill all fields');
    }
  };


  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      { isAuth() ? <Redirect to='/dashboard' /> : null }
      <ToastContainer />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Ballot Sign In
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={handleChange('email')}
            />
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
              onChange={handleChange('password')}
            />
            <Grid container>
              <Grid item xs>
                <Link to='/auth/forgot-password' variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to='/register' variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={isDisabled}
              onClick={handleSubmit}
            >
              { textChange }
            </Button>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}