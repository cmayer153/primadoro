import React, { useEffect, useState } from 'react';
import Timer from './Timer.jsx';

function TimingModule(props) {
  const [pomMarker, setPomMarker] = useState(0);
  const intervals = [20, 12, 19, 11, 18, 30];
  const [running, setRunning] = useState(false);

  const intervalComplete = () => {
    console.log("finished interval");
  }

  return (
    <div className="timing-module">
      <Timer running={running} initTime={intervals[pomMarker]} callBack={intervalComplete}/>
      <button onClick={() => setRunning(true)}>Run</button>
      <button onClick={() => setRunning(false)}>Pause</button>
    </div>
  );

}

export default TimingModule;

