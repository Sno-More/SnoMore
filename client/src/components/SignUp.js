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
        color: 'white'
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    input: {
        color: 'white'
    }
}));


export default function SignUp() {
    const [role, setRole] = useState('');
    console.log("role", role)
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs" className='signupForm'>
            <div className='signUpForm'>
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
                                <TextField className={classes.input}
                                    autoComplete="fname"
                                    name="firstName"
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
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                            </Grid>


                            <FormControl component="fieldset">
                                <RadioGroup row aria-label="role" name="role" >
                                    <FormControlLabel style={{ color: 'black' }}
                                        value="Shoveler"
                                        control={<Radio color="primary" />}
                                        checked={role === 'Shoveler'}
                                        label="Shoveler"
                                        labelPlacement="start"
                                        onClick={() => setRole('Shoveler')}
                                    />
                                    <FormControlLabel style={{ color: 'black' }}
                                        value="User"
                                        control={<Radio color="primary" />}
                                        checked={role === 'User'}
                                        label="User"
                                        labelPlacement="start"
                                        onClick={() => setRole('User')}
                                    />
                                </RadioGroup>

                            </FormControl>

                            {/* <Form.Group inline>
                            <label></label>
                            <Form.Radio label="Shoveler" checked={role === 'Shoveler'} value="Shoveler" onClick={() => setRole('Shoveler')} />
                            <Form.Radio label="User" checked={role === 'User'} value="User" onClick={() => setRole('User')} />
                        </Form.Group> */}


                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="/LogIn" variant="body2">
                                    Already have an account? Sign in
              </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={5}>

                </Box>
            </div>
        </Container>
    );
}
