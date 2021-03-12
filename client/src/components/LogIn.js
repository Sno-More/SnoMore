import React, { useState } from 'react';
import API from "../utils/API";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';




const useStyles = makeStyles((theme) => ({

  paper: {
    marginTop: theme.spacing(8),
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

export default function LogIn() {

  const [auth, setAuth] = useState({})


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
            // update App.js state
            // this.props.updateUser({
            //     loggedIn: true,
            //     username: response.data.username
            // })
            // update the state to redirect to home
            // this.setState({
            //     redirectTo: '/'
            // })
            console.log("Signed in!")
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
    <div style={{ margin: "200px 300px", backgroundColor: "#ffffff", border: "1px solid black" }}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
     
        </Avatar>
        <Typography component="h1" variant="h5">
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
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>

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