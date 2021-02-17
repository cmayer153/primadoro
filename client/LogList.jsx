import React, { useEffect, useState } from 'react';

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
          List Goes Here
      </div>
    )
  }
}

export default LogList;
