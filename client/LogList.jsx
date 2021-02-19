import React, { useEffect, useState } from 'react';
import LogEntry from './LogEntry.jsx';
import './fashion.css';

function LogList({entries}) {

  if(entries === null) {
    return (
      <div className="primadoro-log-list">
        Complete Pomodoros to generate logs.
      </div>
    )
  } else {
    return (
      <div className="primadoro-log-list">
          {entries.map( (entry) => (
            <LogEntry entry={entry} />
          ))}
      </div>
    )
  }
}

export default LogList;
