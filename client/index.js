import React from 'react';
import ReactDOM from 'react-dom'
import TimingModule from './TimingModule.jsx';
import './fashion.css'

class App extends React.Component {
  constructor() {
    super();
    this.state = {

    }
  }


  render() {
    return (
      <div className="primadoro-main-page">
        PRIMADORO (^)
        <TimingModule />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('primadoro'));