import React, { useEffect, useState } from 'react';

function Timer({running, setRunning, getInitTime, zeroCB, preloadCB}) {
  const [currentTime, setCurrentTime] = useState(getInitTime());
  
  useEffect( () => {
    if (running) {
      setCurrentTime(currentTime => currentTime - 1);
    } 
  }, [running]);

    
  useEffect( () => {
    if (currentTime === 1) {
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

  const formatTime = (timeInSeconds) => {
    let minutes = Math.floor(timeInSeconds / 60);
    let seconds = timeInSeconds % 60;
    return '' + minutes.toString().padStart(2, '0') + ':' + 
      seconds.toString().padStart(2, '0');
  }
  

  return (
    <h1>{formatTime(currentTime)}</h1>
  )
  

}

export default Timer;