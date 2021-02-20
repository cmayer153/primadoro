import React, { useEffect, useState } from 'react';
import Timer from './Timer.jsx';
import './fashion.css'


function TimingModule({addLog}) {
  const [pomMarker, setPomMarker] = useState(0);
  const intervals = [1500, 300, 1500, 300, 1500, 300, 1500, 1200];
  const [currentInterval, setCurrentInterval] = useState(intervals[pomMarker]);
  const [running, setRunning] = useState(false);

  const intervalComplete = () => {
    console.log("finished interval");
    //console.log("testing time: ", DateTime.now());
    addLog(Date.now());
  }

  useEffect ( () => {
    console.log('new pomMarker:', pomMarker);
    console.log('updating current interval to: ', intervals[pomMarker]);
    setCurrentInterval(intervals[pomMarker % intervals.length]);
    
  }, [pomMarker])

  const getInitTime = () => {
    console.log('getInitTime: ', currentInterval);
    return currentInterval;
  }

  return (
    <div className="primadoro-timing-module">
      <div className="primadoro-timer">
        <Timer running={running} setRunning={setRunning} getInitTime={() => getInitTime()} zeroCB={intervalComplete} preloadCB={() => setPomMarker(pomMarker + 1)}/>
      </div>
      <div className="primadoro-timer-control-panel">
        <button className="primadoro-timer-control-button" onClick={() => setRunning(true)}>Run</button>
        <button className="primadoro-timer-control-button" onClick={() => setRunning(false)}>Pause</button>
      </div>
    </div>
  );

}

export default TimingModule;

