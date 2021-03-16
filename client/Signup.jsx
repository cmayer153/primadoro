import React, { useEffect, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import LoginField from './LoginField.jsx';
import './fashion.css';

function Signup({addUser}) {
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

  return (
    <React.Fragment> 
      <button className = "primadoro-signup-button" onClick={handleOpen} className="primadoro-modal-button">Sign Up</button>
    <Modal
      open={open}
      onClose={handleClose}>
        {modalBody}
    </Modal>
    </React.Fragment>
  )
}

export default Signup;