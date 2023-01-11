import React, { useEffect, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LoginField from './LoginField.jsx';
import Signup from './Signup.jsx';
import './fashion.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

  export default function TitleMenu({creds, saveUser, addUser, logoutUser}) {
  const classes = useStyles();

  const [openSignup, setOpenSignup] = React.useState(false);
  const [openLogin, setOpenLogin] = React.useState(false);


  const handleOpenSignup = () => {
    setOpenSignup(true);
  };

  const handleOpenLogin = () => {
    setOpenLogin(true);
  };

  const handleCloseSignup = () => {
    setOpenSignup(false);
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  const modalBodySignup = (
    <div className="primadoro-signup-form">
      <LoginField saveUser={addUser}/>
    </div>
  );

  const modalBodyLogin = (
    <div className="primadoro-signup-form">
      <LoginField saveUser={saveUser} closeModal={handleCloseLogin}/>
    </div>
  );

  const loginOrShowUser = () => {
    if (creds === null) {
      return (
        <React.Fragment>
        <Button color="inherit" onClick={handleOpenLogin}>Login</Button>
        <Button color="inherit" onClick={handleOpenSignup}>Signup</Button>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
        <a> Logged in as: {creds.username}</a>
        <Button color="inherit" onClick={logoutUser}>Logout</Button>

        </React.Fragment>
      )
    }
  }

    return (
      <div className={`primadoro-title-bar ${classes.root}`}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={`typo-title ${classes.title}`}>
              Primadoro (^)
            </Typography>
            {loginOrShowUser()}
          </Toolbar>
        </AppBar>
        <Modal
          open={openSignup}
          onClose={handleCloseSignup}>
          {modalBodySignup}
        </Modal>
        <Modal
          open={openLogin}
          onClose={handleCloseLogin}>
          {modalBodyLogin}
        </Modal>
      </div>
    );
  }