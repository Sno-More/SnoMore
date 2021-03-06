import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import RadioGroup from '@material-ui/core/RadioGroup';
import API from "../utils/API";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input/input';
import CustomPhoneNumber from '../components/CustomPhoneInput';
import { useHistory } from "react-router-dom";
import axios from 'axios'


const useStyles = makeStyles((theme) => ({
    signUp: {
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
        marginBottom: theme.spacing(1)
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
        padding: '0 3.5rem',
        margin: 'auto',
        textDecoration: 'none',
        whiteSpace: 'normal',
    }
}));




export default function SignUp({ handleChangeView }) {

    const [auth, setAuth] = useState({})
    const [role, setRole] = useState('');
    const [value, setValue] = useState('')
    let history = useHistory()

    const handleClick = (e) => {
        e.preventDefault()
        API.saveUser({
            firstName: auth.firstName,
            lastName: auth.lastName,
            username: auth.email,
            password: auth.password,
            phone: value,
            role: role,
        })
            .then(res => {
                if (res.status === 200) {
                    console.log("status")
                    history.push('/profile')
                }
            })
            .catch(err => console.error(err));
        let SMS = (role === 'Poster') ? {
            messageTo: value,
            messageBody: `Welcome to Sno-More ${auth.firstName}, we can't wait to help you make your snow no more!`,
            submitting: false,
            error: false
        } : {
            messageTo: value,
            messageBody: `Welcome to Sno-More ${auth.firstName}, thanks for helping your neighbors make their snow no more!`,
            submitting: false,
            error: false
        }

        axios.post('/sms/messages', SMS)
            .then(data => {
                if (data.data.success) {
                    SMS = {
                        error: false,
                        submitting: false,
                        messageTo: '',
                        messageBody: ''
                    };
                } else {
                    SMS.error = true
                    SMS.submitting = false
                };
            }
            )
    }

    const handleInput = (event, limit = undefined) => {
        if (limit) {
            if (limit < event.target.value.length) return;
        };
        const { name, value } = event.target;
        setAuth({ ...auth, [name]: value })
    }

    const classes = useStyles();

    return (
        <div className={classes.signUp}>


            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>

                    </Avatar>
                    <Typography className={classes.h2} variant="h2">
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
                                    name="email"
                                    value={auth.email}
                                    onChange={handleInput}
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <PhoneInput
                                    country="US"
                                    value={value}
                                    required
                                    fullWidth
                                    autoComplete="phone number"
                                    onChange={setValue}
                                    inputComponent={CustomPhoneNumber}
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
                                        value="Poster"
                                        control={<Radio color="primary" />}
                                        checked={role === 'Poster'}
                                        label="Poster"
                                        labelPlacement="start"
                                        onClick={() => setRole('Poster')}
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

                                <Button className={classes.link} onClick={handleChangeView}>
                                <span style={{margin: '0 .25rem 0 .5rem'}}>Already have an account?</span> <em style={{ margin: '0 .5rem 0 .25rem', textDecoration: 'underline', color:'#6E61C0'}}>Log In</em>
                                </Button>

                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={6}>

                </Box>
            </Container>
        </div>
    );
}
