import React, { useEffect, useState } from 'react';
import Modal from '@material-ui/core/Modal';
var { DateTime } = require('luxon');
import LogForm from './LogForm.jsx';
import './fashion.css';

function LogEntry({entry, submit}) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const modalBody = (
    <div className="primadoro-log-modal">
      <LogForm entry={entry} submit={submit} />
    </div>
  );

  return (
    <React.Fragment>
    <div className="primadoro-log-entry">
      <h3>{entry.username}</h3>
      <h3>{entry.timeStamp}</h3>
      <p>{entry.description}</p>
      <h3>{entry.workRating}</h3>
      <button onClick={handleOpen} className="primadoro-modal-button">Edit</button>
    </div>
    <Modal
      open={open}
      onClose={handleClose}>
        {modalBody}
      </Modal>
      </React.Fragment>
  )
}

export default LogEntry;