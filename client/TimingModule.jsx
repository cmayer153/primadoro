import React, { useEffect, useState } from 'react';
import Timer from './Timer.jsx';
import './fashion.css'
import alarm from './sounds/alarm_gentle_CUT.wav';


function TimingModule({addLog}) {
  const [pomMarker, setPomMarker] = useState(0);
  // quick intervals for testing
  //const intervals = [25, 5, 25, 5, 25, 5, 25, 20];
  //prod intervals
  const intervals = [1500, 300, 1500, 300, 1500, 300, 1500, 1200];
  const [currentInterval, setCurrentInterval] = useState(intervals[pomMarker]);
  const [running, setRunning] = useState(false);
  const alarmAudio = new Audio(alarm);

  const intervalComplete = () => {
    console.log("finished interval");
    alarmAudio.play();
    addLog(Date.now());
  }

  useEffect ( () => {
    //console.log('updating current interval to: ', intervals[pomMarker]);
    setCurrentInterval(intervals[pomMarker % intervals.length]);
    
  }, [pomMarker])

  const getInitTime = () => {
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

