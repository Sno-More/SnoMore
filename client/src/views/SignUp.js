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


const useStyles = makeStyles((theme) => ({
    signUp: {
        backgroundColor: theme.palette.transparentWhite.main,
        border: '5px solid black',
        width: '100vmin',
        maxHeight: '80vmin',
        position: 'absolute',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        margin: 'auto'
    },
    paper: {
        marginBottom: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(2, 0, 2),
    },
    link: {
        position: 'absolute',
        left: 0,
        right: 0,
        margin: 'auto'
    }
}));




export default function SignUp({ handleChangeView }) {

    const [auth, setAuth] = useState({})
    const [role, setRole] = useState('');
    const [value, setValue] = useState('')
    console.log('value', value)

    const handleClick = (e) => {
        e.preventDefault()
        console.log("click")
        console.log(auth)
        API.saveUser({
            firstName: auth.firstName,
            lastName: auth.lastName,
            username: auth.email,
            password: auth.password,
            phone: value,
            role: role,
        })
            .then()
            .catch(err => console.log(err));
    }

    const handleInput = (event) => {

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
                    <Typography component="h1" variant="h2">
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
                                    maxlength="14"
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

                                <button className={classes.link} onClick={handleChangeView}>
                                    Already have an account? <em>Log in</em>
                                </button>

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
