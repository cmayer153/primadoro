import React, { useEffect, useState } from 'react';
import Timer from './Timer.jsx';

function TimingModule(props) {
  const [pomMarker, setPomMarker] = useState(0);
  const intervals = [20, 12, 19, 11, 18, 30];
  const [currentInterval, setCurrentInterval] = useState(intervals[pomMarker]);
  const [running, setRunning] = useState(false);

  const intervalComplete = () => {
    console.log("finished interval");
    setPomMarker(pomMarker => pomMarker + 1);
  }

  useEffect ( () => {
    console.log('new pomMarker:', pomMarker);
    console.log('updating current interval to: ', intervals[pomMarker]);
    setCurrentInterval(intervals[pomMarker]);
    
  }, [pomMarker])

  const getInitTime = () => {
    console.log('getInitTime: ', currentInterval);
    return currentInterval;
  }

  return (
    <div className="timing-module">
      <Timer running={running} setRunning={setRunning} getInitTime={() => getInitTime()} zeroCB={intervalComplete} preloadCB={() => setPomMarker(pomMarker + 1)}/>
      <button onClick={() => setRunning(true)}>Run</button>
      <button onClick={() => setRunning(false)}>Pause</button>
    </div>
  );

}

export default TimingModule;

