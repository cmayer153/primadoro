import React from 'react';
import ReactDOM from 'react-dom'
import TimingModule from './TimingModule.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {

    }
  }


  render() {
    return (
      <div>
        PRIMADORO (^)
        <TimingModule />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('primadoro'));