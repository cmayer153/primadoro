import React, { useEffect, useState } from 'react';

function Timer({running, setRunning, initTime, callBack}) {
  const [currentTime, setCurrentTime] = useState(initTime);
  console.log('running: ', running);

  
  useEffect( () => {
    if (running) {
      setCurrentTime(currentTime => currentTime - 1);
    } 
  }, [running]);

  useEffect( () => {
    setCurrentTime(initTime);
  }, [initTime]);
  

  
  useEffect( () => {
    if (currentTime === 0) {
      callBack();
      setRunning(false);
    }
    if (running) {
      setTimeout( () => {setCurrentTime(currentTime - 1)}, 1000 );
    }

  }, [currentTime, running]);
  

  return (
    <h1>{currentTime}</h1>
  )
  

}

export default Timer;