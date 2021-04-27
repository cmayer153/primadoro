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

  export default function TitleMenu({creds, saveUser, addUser}) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const modalBody = (
    <div className="primadoro-signup-form">
      <LoginField saveUser={addUser}/>
    </div>
  );

  const loginOrShowUser = () => {
    if (creds === null) {
      return (
        <React.Fragment>
        <Button color="inherit" onClick={handleOpen}>Login</Button>
        <Button color="inherit" onClick={handleOpen}>Signup</Button>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
        <a> Logged in as: {creds.username}</a>
        <Button color="inherit">Logout</Button>

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
          open={open}
          onClose={handleClose}>
          {modalBody}
        </Modal>
      </div>
    );
  }