import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ACTIVATE_USER_ACCOUNT_API } from '../API';
import { ToastContainer, toast } from 'react-toastify';
import jwt from 'jsonwebtoken';
import { isAuth } from '../helpers/auth';
import { Redirect } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
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


export default function Activate({ match }) {
  const classes = useStyles();

  let [isDisabled, setIsDisabled] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    token: '',
    textChange: 'Activate your Account'
  });

  useEffect(() => {
    let token = match.params.token;
    let { name } = jwt.decode(token);

    if (token) {
      setFormData({ ...formData, name, token });
    }
  }, [match.params]);

  const { name, token, textChange } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (token) {
      setIsDisabled(true);
      setFormData({ ...formData, textChange: 'Please wait...' });

      const response = await fetch(`${ACTIVATE_USER_ACCOUNT_API}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token
        })
      });

      const data = await response.json();
      setIsDisabled(false);

      if (data.success) {
        setFormData({ 
          ...formData, 
          token: '',
          textChange: 'Activate your Account' 
        });
        toast.success(`${data.message}`);
      } else {
        toast.error(`${data.message}`);
      }
    } else {
      toast.error(`This token has been used!`);
    }
  };


  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      { isAuth() ? <Redirect to='/' /> : null }
      <ToastContainer />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Welcome { name }
          </Typography>
          <form className={classes.form} noValidate>
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
            <Grid container>
              <Grid item xs>
                <Link to="/" variant="body2">
                  Sign In
                </Link>
              </Grid>
              <Grid item>
                <Link to="/register" variant="body2">
                  Don't have an account? Sign Up
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