import React, { useEffect, useState } from 'react';
import LogEntry from './LogEntry.jsx';

function LogList({entries}) {

  if(entries === null) {
    return (
      <div>
        Complete Pomodoros to generate logs.
      </div>
    )
  } else {
    return (
      <div>
          {entries.map( (entry) => (
            <LogEntry entry={entry} />
          ))}
      </div>
    )
  }
}

export default LogList;
