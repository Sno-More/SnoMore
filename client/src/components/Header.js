import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    brand: {
      color: theme.palette.primary.main
    },
    header: {
      width: '100%',
      background: theme.palette.white.main,
      height: '10rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      '& h1': {
        marginLeft: theme.spacing(2.5)
      },
      [theme.breakpoints.down('xs')]: {
        '& h1': {
          marginLeft: theme.spacing(1),
          fontSize: '3rem'
        }
      }
    },
    avatar: {
      background: theme.palette.primary.main,
      color: 'white',
      height: '4rem',
      width: '4rem',
      fontSize: '2rem',
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 700,
      marginRight: theme.spacing(2.5),
      boxShadow: '0px 2px 5px black',
      cursor: 'pointer',
      [theme.breakpoints.down('xs')]: {
        marginRight: theme.spacing(1)
      }
    }
}));

export default function Header() {
  const classes = useStyles();

  const [user, setUser] = useState([])
  let name = user.join('');
  let history = useHistory()

  useEffect(() => {
    const getUser = async () => {
      const username = await axios.get('/user/info');
      setUser([username.data[0].firstName.charAt(0).toUpperCase(), username.data[0].lastName.charAt(0).toUpperCase()])
    };
    getUser();
  }, [])
  const logout = (e) => {
    e.preventDefault()
    axios.post("/user/logout")
      .then(response => {

        if (response.status === 200) {
            history.push('/')
          }
      }).catch(error => {
        console.error(error);

      })
  }
  const StyledMenu = withStyles(theme => ({
    paper: {
      border: '1px solid #d3d4d5',
      marginTop: theme.spacing(.5),
      marginRight: theme.spacing(-1),
      width: 'min-content'
    },
  }))((props) => (
    <Menu
      MenuListProps={{style: {padding: 0}}}
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
      margin: 0,
      padding: theme.spacing(0, 1),
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: 'white',
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
  return (
    <header className={classes.header}>
      <Typography className={classes.brand} variant='h1'>SNO' MORE</Typography>

      <Avatar
        className={classes.avatar}
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="circular"
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
    </header>


  )
}