import React, { useEffect, useState } from 'react';
import Timer, {useTimer} from 'react-compound-timer';

function TimingModule(props) {
  var [pomState, setPomState] = useState({
    progress: 0,
    intervals: [25, 5, 25, 5, 25, 5, 25, 15]
  });

  const getTime = () => {
    return pomState.intervals[pomState.progress];
  }

  const intervalComplete = () => {
    console.log("finished interval");
  }

  var {value,
    controls: { setTime, start, pause, resume, reset}
  } = useTimer({ initialTime: 120000,
    direction: 'backward',
    startImmediately: false,
    checkpoints: [{time: 0, callback: () => intervalComplete()}]
    });


  return (
    <div className="timing-module">
      <h2>{value.m}:{value.s}</h2>
    </div>
  );

}

export default TimingModule;