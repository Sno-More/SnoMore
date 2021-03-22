import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import "../css/header.css"
import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useHistory } from "react-router-dom";
import snomoreImg from '../images/snomoreImg.png';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
      textAlign: 'center'
    },
  },
  title: {
    color: theme.palette.primary.main,
    justifyContent: 'center',
    fontSize: 50,
    margin: '-20px'
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    width: theme.spacing(4),
    height: theme.spacing(4),
    marginBottom: '10px'
  },
  img: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '50%',
    padding: '10px'
  }
}));

export default function Header() {
  const classes = useStyles();
  const [userFirst, setUserFirst] = useState("")
  const [userLast, setUserLast] = useState("")
  let firstInitial = userFirst.charAt(0).toUpperCase()
  let lastInitial = userLast.charAt(0).toUpperCase()
  let history = useHistory()

  useEffect(() => {
    const getUser = async () => {
      const user = await axios.get('/user/info');
      console.log(user.data);
      setUserFirst(user.data[0].firstName)
      setUserLast(user.data[0].lastName)
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
          history.push('/')
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
  return (
    <>
    <div className="header" style={{justifyContent: 'center'}}>
      <img className={classes.img} src={snomoreImg} alt='sno-more' style={{ width: '5%', height: '3%', margin: '10px 0px 1px 10px', marginRight:'500px'}} />
      <h1 className={classes.title}>SNO MORE</h1>
      <Avatar
      style={{marginLeft:'500px'}}
        className={classes.avatar}
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="circular"
        color="primary"
        onClick={handleClick}
      >
        {firstInitial}{lastInitial}
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

</>
  )
}