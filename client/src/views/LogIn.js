import React, { useState } from 'react';
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
    maxHeight: '65vmin',
    position: 'absolute',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    margin: 'auto'
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
  },
  link: {
    position: 'relative',
    left: '33%',
    right: '33%'
  }
}));

export default function LogIn({handleChangeView}) {

  const [auth, setAuth] = useState({})
  const [checkUser, setcheckUser] = useState({loggedIn: false})


  const handleClick = (e) => {
    e.preventDefault()
    console.log("click")
    console.log(auth)
    
    API.checkUser({
        username: auth.email,
        password: auth.password
    })
    .then(response => {
        console.log('login response: ')
        console.log(response)
        if (response.status === 200) {
          setcheckUser({loggedIn: true})
          window.location.href = window.location.href + "profile"
        }
    }).catch(error => {
        console.log('login error: ')
        console.log(error);
        
    })
  }

  const handleInput = (event) => {
    const { name, value } = event.target;
    setAuth({...auth, [name]: value})
}
  const classes = useStyles();

  return (
    <div className={classes.signIn}>  
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
     
        </Avatar>
        <Typography component="h1" variant="h2">
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
            name= "email"
            value={auth.email}
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
          
            value={auth.password}
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
              <button className={classes.link} onClick={handleChangeView}>
                Don't have an account? <em>Sign up</em>
              </button>

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