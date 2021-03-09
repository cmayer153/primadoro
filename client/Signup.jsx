import React, { useEffect, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import './fashion.css';

function Signup({submit}) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const modalBody = (
    <div className="primadoro-signup-form">
    <form onSubmit={submit}>
      <label>
        Description:
        <input className="primadoro-signup-user" type="text" name="description" value={myEntry.description} onChange={handleChange}/>
      </label>
      <label>
        Rating:
        <input type="text" name="workRating" value={myEntry.workRating} onChange={handleChange}/>
      </label>
      <input type="submit" value="Save Log" />
    </form>
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