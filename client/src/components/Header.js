import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import "../css/header.css"
import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useHistory } from "react-router-dom";

export default function Header() {

  const [user, setUser] = useState("")
  let name = user.charAt(0).toUpperCase()
  let history = useHistory()

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
    <div className="header">
      <h1 className="title">SNO MORE</h1>
      {/* <img  className="logo" src={logo} /> */}



      <Avatar
        className="avatar"
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="circular"
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