import React, { useEffect, useState } from 'react';

function Timer({running, setRunning, getInitTime, zeroCB, preloadCB}) {
  const [currentTime, setCurrentTime] = useState(getInitTime());
  console.log('running: ', running);

  
  useEffect( () => {
    if (running) {
      setCurrentTime(currentTime => currentTime - 1);
    } 
  }, [running]);

  /*
  useEffect( () => {
    setCurrentTime(initTime);
  }, [initTime]);
  */

  
  useEffect( () => {
    if (currentTime === 10) {
      preloadCB();
    }
    if (currentTime === 0) {
      zeroCB();
      setRunning(false);
      setCurrentTime(getInitTime());
      setTimeout( () => setRunning(true), 0);
    } else if (running) {
      setTimeout( () => {setCurrentTime(currentTime - 1)}, 1000 );
    }

  }, [currentTime, running]);
  

  return (
    <h1>{currentTime}</h1>
  )
  

}

export default Timer;