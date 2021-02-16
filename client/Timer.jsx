import React, { useEffect, useState } from 'react';

function Timer({running, initTime, callBack}) {
  const [currentTime, setCurrentTime] = useState(initTime);

  useEffect( () => {
    if (running) {
      countDown();
    } 
  }, [running]);

  function countDown() {
    if (running) {
      setCurrentTime(currentTime - 1);
      setTimeout( () => {countDown()}, 1000);
    }
  }

  useEffect( () => {
    if (currentTime <= 0) {
      callBack();
    }
  }, [currentTime]);

  return (
    <h1>currentTime</h1>
  )
  

}

export default Timer;