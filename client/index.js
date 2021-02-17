import React from 'react';
import ReactDOM from 'react-dom'
import TimingModule from './TimingModule.jsx';
import LoginField from './LoginField.jsx';
import LogList from './LogList.jsx';
import LogForm from './LogForm.jsx';
import axios from 'axios';
import './fashion.css'

const blankEntry = {
  username: '',
  timeStamp: '',
  description: '',
  workRating: ''
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
      logEntries: null,
      newEntry: null
    }

    this.updateUser = this.updateUser.bind(this);
    this.addLog = this.addLog.bind(this);
    this.saveLog = this.saveLog.bind(this);
  }

  updateUser(newUser) {
    console.log('Switched to user: ', newUser);
    this.setState({currentUser: newUser});
    axios.get(`/api/logs/${newUser}`)
      .then ( (res) => {
        if (res.data.length > 0) {
          this.setState({logEntries: res.data});
        }
      })
      .catch( (err) => {
        console.log('error fetching logs: ', err);
      });
  }

  addLog(timeStamp) {
    let tempEntry = blankEntry;
    tempEntry.username = this.state.currentUser;
    tempEntry.timeStamp = timeStamp;
    this.setState({newEntry: tempEntry});
  }

  saveLog(inEntry) {
    console.log('saving log: ', inEntry)
    axios.post('/api/saveLog', {entry: inEntry})
      .then ( (res) => {
        console.log('back from server: ', res.data);
        if (res.data.length > 0) {
          this.setState({logEntries: res.data});
        }
      })
      .catch ( (err) => {
        console.log('error trying to save log: ', err);
      })

    // reset new entry to blankEntry
  }


  render() {
    return (
      <div className="primadoro-main-page">
        PRIMADORO (^)
        <LoginField saveUser={this.updateUser}/>
        <TimingModule addLog={this.addLog}/>
        <LogForm entry={this.state.newEntry} submit={this.saveLog}/>
        <LogList entries={this.state.logEntries}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('primadoro'));