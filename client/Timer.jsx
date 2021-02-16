import React, { useEffect, useState } from 'react';

function Timer({running, initTime, callBack}) {
  const [currentTime, setCurrentTime] = useState(initTime);
  console.log('running: ', running);

  
  useEffect( () => {
    if (running) {
      countDown_A();
    } 
  }, [running]);
  

  function countDown_A() {
    if (running) {
      setCurrentTime(currentTime - 1);
      let tmpCount = setTimeout(countDown_B, 1000);
    }
  }

  function countDown_B() {
    if (running) {
      setCurrentTime(currentTime - 1);
      let tmpCount = setTimeout(countDown_A, 1000);
    }
  }

  useEffect( () => {
    if (currentTime <= 0) {
      callBack();
    }
  }, [currentTime]);
  

  return (
    <h1>{currentTime}</h1>
  )
  

}

export default Timer;