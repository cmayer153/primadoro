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
    setCurrentInterval(intervals[pomMarker]);
    
  }, [pomMarker])

  return (
    <div className="timing-module">
      <Timer running={running} setRunning={setRunning} initTime={currentInterval} callBack={intervalComplete}/>
      <button onClick={() => setRunning(true)}>Run</button>
      <button onClick={() => setRunning(false)}>Pause</button>
    </div>
  );

}

export default TimingModule;

