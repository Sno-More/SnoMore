import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import axios from 'axios';
import "../css/header.css"
import logo from "../images/snomore2.png"
import Weather from "./Weather"
import React,{useEffect, useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
}));

export default function Header() {

const [user, setUser] = useState("")
let name = user.charAt(0).toUpperCase()

useEffect(() => {
    const getUser = async () => {
        const user = await axios.get('/user/info');
        console.log(user.data);
        setUser(user.data[0].firstName)
    };
    getUser();
}, [])
    const logout = (e) => {
        e.preventDefault()
        console.log("test1")
    axios.post("/user/logout")
    .then(response => {
        
        if (response.status === 200) {
          console.log(response)
          window.location.href = "http://localhost:3000/"
        }
    }).catch(error => {
        console.log('login error: ')
        console.log(error);
        
    })
}
const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));
  
  const StyledMenuItem = withStyles((theme) => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);
  

    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
    const classes = useStyles();
    return (
        <div className="header">
            <h1 className="title">SNO MORE</h1>
            {/* <img  className="logo" src={logo} /> */}
           
            <Weather />
            
            
      <Avatar
        className={classes.purple}
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        {name}
      </Avatar>
      <StyledMenu
     
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
      
        <StyledMenuItem>
          <ListItemText onClick={logout} primary="Log Out" />
        </StyledMenuItem>
      </StyledMenu>
    </div>

        
    )
}