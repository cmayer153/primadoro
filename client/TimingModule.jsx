import React, { useEffect, useState } from 'react';
import Timer, {useTimer} from 'react-compound-timer';

function TimingModule(props) {
  const [pomState, setPomState] = useState(0);
    //intervals: [1500000, 300000, 1500000, 300000, 1500000, 300000, 1500000, 900000]
    const intervals = [12000, 3000, 12000, 3000, 9000];   // quick intervals for testing

  const getTime = () => {
    return pomState.intervals[pomState.progress];
  }

  const intervalComplete = () => {
    console.log("finished interval");
    let tempProgress = pomState + 1;
    if (tempProgress === intervals.length) {
      tempProgress = 0;
    }
    console.log('setting pom state');
    debugger;
    setPomState(tempProgress);
    reset();
  }

  useEffect( () => {
    console.log('useEffect going');
    setTime(intervals[pomState]);
    console.log('setting time to: ', intervals[pomState]);
    start();
  }, [pomState]);

  var {value,
    controls: { setTime, start, pause, resume, reset}
  } = useTimer({ initialTime: intervals[pomState],
    direction: 'backward',
    startImmediately: false,
    checkpoints: [{time: 0, callback: () => intervalComplete()}]
    });


  return (
    <div className="timing-module">
      <h2>{value.m}:{value.s}</h2>
      <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={resume}>Resume</button>
      <button onClick={ () => setPomState(4)}>POMSTATE</button>
    </div>
  );

}

export default TimingModule;