import React, { useEffect, useState } from 'react';
import './fashion.css';

function LogEntry({entry}) {

  return (
    <div className="primadoro-log-entry">
      <h3>{entry.username}</h3>
      <h3>{entry.timeStamp}</h3>
      <p>{entry.description}</p>
      <h3>{entry.workRating}</h3>
    </div>
  )
}

export default LogEntry;