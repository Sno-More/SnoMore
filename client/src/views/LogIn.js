import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import API from "../utils/API";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
  signIn: {
    backgroundColor: theme.palette.transparentWhite.main,
    border: '5px solid black',
    width: '100vmin',
    height: 'min-content',
    position: 'absolute',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      bottom: 'auto',
      minHeight: '100vh',
      width: '100%'
    }
  },
  h2: {
    marginBottom: theme.spacing(0)
  },
  paper: {
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(2) + 'auto',
    height: '50px',
    width: '50px',
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
    textDecoration: 'none'
  },
  link: {
    position: 'absolute',
    left: 0,
    right: 0,
    margin: 'auto',
    textDecoration: 'none'
  }
}));

export default function LogIn({ handleChangeView }) {

  const [auth, setAuth] = useState({})
  // const [checkUser, setcheckUser] = useState({ loggedIn: false })
  let history = useHistory()


  const handleClick = (e) => {
    e.preventDefault()

    API.checkUser({
      username: auth.email,
      password: auth.password
    })
    .then(response => {
      if (response.status === 200) {
        history.push('/profile')
      }
 
  }).catch(error => {
      console.error(error);
      alert("Incorrect email or password")
      
  })
  }

  const handleInput = (event) => {
    const { name, value } = event.target;
    setAuth({ ...auth, [name]: value })
  }
  const classes = useStyles();

  return (
    <div className={classes.signIn}>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>

          </Avatar>
          <Typography className={classes.h2} variant="h2">
            Sign in
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
              // value={auth.email}
              onChange={handleInput}
              autoComplete="email"
              autoFocus
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

              // value={auth.password}
              onChange={handleInput}
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleClick}
              className={classes.submit}
            >
              Sign In
          </Button>
            <Grid container>

              <Grid item>
                <Button className={classes.link} onClick={handleChangeView}>
                  Don't have an account? <em style={{marginLeft: '1rem', textDecoration: 'underline', color:'#6E61C0'}}>Sign up</em>
                </Button>

              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>

        </Box>
      </Container>
    </div>
  );
}