import React from 'react';
import ReactDOM from 'react-dom'
import TimingModule from './TimingModule.jsx';
import LoginField from './LoginField.jsx';
import LogList from './LogList.jsx';
import LogForm from './LogForm.jsx';
import axios from 'axios';
import './fashion.css'

const getBlankEntry = () => {
  return {
  username: '',
  timeStamp: '',
  description: '',
  workRating: ''
  }
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
    this.editLog = this.editLog.bind(this);
  }

  updateUser(newUser) {
    console.log('Switched to user: ', newUser);
    this.setState({currentUser: newUser});
    this.setState({logEntries: null});
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
    let tempEntry = getBlankEntry();
    tempEntry.username = this.state.currentUser;
    tempEntry.timeStamp = timeStamp;
    this.setState({newEntry: tempEntry});
    
    console.log('saving log: ', tempEntry)
    axios.post('/api/saveLog', {entry: tempEntry})
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

  editLog(inLog) {
    console.log('saving log: ', inLog)
    axios.post('/api/editLog', {entry: inLog})
      .then ( (res) => {
        console.log('back from server: ', res.data);
        if (res.data.length > 0) {
          this.setState({logEntries: res.data});
        }
      })
      .catch ( (err) => {
        console.log('error trying to save log: ', err);
      })
  }


  render() {
    return (
      <div className="primadoro-main-page">
        PRIMADORO (^)
        <LoginField saveUser={this.updateUser}/>
        <TimingModule addLog={this.addLog}/>
        <LogList entries={this.state.logEntries} submit={this.editLog}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('primadoro'));