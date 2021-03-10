import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import RadioGroup from '@material-ui/core/RadioGroup';
import API from "../utils/API";



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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));




export default function SignUp() {

    const [auth, setAuth] = useState({})
    const [role, setRole] = useState('');



    const handleClick = (e) => {
      e.preventDefault()
      console.log("click")
      console.log(auth)
      API.saveUser({
        firstName: auth.firstName,
        lastName: auth.lastName,
        username: auth.email,
        password: auth.password,
        role: role,
      })
      .then()
      .catch(err => console.log(err));
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
                    Sign up
        </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                value={auth.firstName}
                                onChange={handleInput}
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                value={auth.lastName}
                                onChange={handleInput}
                                autoComplete="lname"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name= "email"
                                value={auth.email}
                                onChange={handleInput}
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                
                                value={auth.password}
                                onChange={handleInput}
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>


                        <FormControl component="fieldset">
                            <RadioGroup row aria-label="role" name="role" >
                                <FormControlLabel
                                    value="Shoveler"
                                    control={<Radio color="primary" />}
                                    checked={role === 'Shoveler'} 
                                    label="Shoveler"
                                    labelPlacement="start"
                                    onClick={() => setRole('Shoveler')}
                                />
                                <FormControlLabel
                                    value="User"
                                    control={<Radio color="primary" />}
                                    checked={role === 'User'}
                                    label="User"
                                    labelPlacement="start"
                                    onClick={() => setRole('User')}
                                />
                            </RadioGroup>

                        </FormControl>

      


                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleClick}
                    >
                        Sign Up
          </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2">
                                Already have an account? Sign in
              </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>

            </Box>
        </Container>
        </div>
    );
}
