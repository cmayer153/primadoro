import React from 'react';
import ReactDOM from 'react-dom'
import TimingModule from './TimingModule.jsx';
import LoginField from './LoginField.jsx';
import LogList from './LogList.jsx';
import Signup from './Signup.jsx';
import {CookiesProvider, Cookies, withCookies} from 'react-cookie';
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
  constructor(props) {
    super(props);
    const {cookies} = props;
    console.log('startup state cookies: ', cookies);
    this.state = {
      currentUser: null,
      logEntries: null,
      newEntry: null,
      creds: cookies.get('primadoro') || null
    }

    this.addUser = this.addUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.addLog = this.addLog.bind(this);
    this.addUserLog = this.addUserLog.bind(this);
    this.editLog = this.editLog.bind(this);
    //this.editUserLog = this.editUserLog.bind(this);

  }

  componentDidMount() {
    if(this.state.creds) {
      //cookies for this site exist
      console.log('found this cookie: ', this.state.creds);
      //TODO this below is copy pasted from loginUser function. should abstract it out into its own function.
      var authConfig = {
        headers: {
          authorization: "Token " + this.state.creds.token
        }
      }
      axios.get(`api/users/logs`, authConfig)
        .then( (res) => {
          console.log('CDM BACK with logs: ', res.data);
          if (res.data[0].logs.length > 0) {
            this.setState({logEntries: res.data[0].logs});
          }
        })
        .catch( (err) => {
          console.log('error fetching logs: ', err);
        })

    }
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

  loginUser(user) {
    console.log('CREDS: ', user.username);
    console.log(user.password);
    axios.post(`/api/users/login`, {user: user})
      .then ( (res) => {
        console.log('loginUser response: ', res.data.user);
        const {cookies} = this.props;
        cookies.set('primadoro', res.data.user, {path:'/'});
        this.setState({creds: res.data.user});
        var authConfig = {
          headers: {
            authorization: "Token " + res.data.user.token
          }
        }
        axios.get(`api/users/logs`, authConfig)
          .then( (res) => {
            console.log('back with logs: ', res.data);
          })
          .catch( (err) => {
            console.log('error fetching logs: ', err);
          })
      })
      .catch ( (err) => {
        console.log('error logging in user: ', err);
      });
  }

  addUser(newUser) {
    console.log('CREDS: ', newUser.username);
    console.log(newUser.password);
    axios.post(`/api/users`, {user: newUser})
      .then ( (res) => {
        console.log('addUser response: ', res);
        const {cookies} = this.props;
        cookies.set('primadoro', res.data.user, {path:'/'});
        this.setState({creds: res.data.user});
      })
      .catch ( (err) => {
        console.log('error adding user: ', err);
      });

  }

  addLog(timeStamp) {
    if (this.state.currentUser != null) {
      this.addUserLog(timeStamp)
    } else {
      this.addLocalStorageLog(timeStamp);
    }
  }

  addLocalStorageLog(timeStamp) {
    let tempEntry = getBlankEntry();
    tempEntry.timeStamp = timeStamp;
    //this.setState({newEntry: tempEntry});
    var localLogs = JSON.parse(localStorage.getItem('primadoro_logs'));
    //TEST CODE
    console.log('got this from localStorage: ', localLogs);
    //END TEST CODE
    if (! Array.isArray(localLogs)) {
      localLogs = [];
    }
    localLogs.push(tempEntry);
    console.log('saving this to localStorage: ', localLogs);
    localStorage.setItem('primadoro_logs', JSON.stringify(localLogs));
    this.setState({logEntries: localLogs});
  }

  addUserLog(timeStamp) {
    let tempEntry = getBlankEntry();
    tempEntry.username = this.state.currentUser;
    tempEntry.timeStamp = timeStamp;
    this.setState({newEntry: tempEntry});
    
    console.log('saving log: ', tempEntry)
    var authConfig = {
      headers: {
        authorization: "Token " + this.state.creds.token
      }
    }
    axios.post('/api/users/saveLog', {entry: tempEntry}, authConfig)
      .then ( (res) => {
        //console.log('back from server: ', res.data.logs);
        if (res.data.logs.length > 0) {
          this.setState({logEntries: res.data.logs});
        }
      })
      .catch ( (err) => {
        console.log('error trying to save log: ', err);
      })

    // reset new entry to blankEntry
  }

  editLog(inLog) {
    console.log('saving log: ', inLog)
    var authConfig = {
      headers: {
        authorization: "Token " + this.state.creds.token
      }
    }
    axios.post('/api/users/editLog', {entry: inLog}, authConfig)
      .then ( (res) => {
        //console.log('back from server: ', res.data);
        if (res.data.logs.length > 0) {
          this.setState({logEntries: res.data.logs});
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
        <LoginField saveUser={this.loginUser}/>
        <Signup addUser={this.addUser}/>
        <TimingModule addLog={this.addLog}/>
        <LogList entries={this.state.logEntries} submit={this.editLog}/>
      </div>
    )
  }
}

const AppWithCookies = withCookies(App);

ReactDOM.render(<CookiesProvider><AppWithCookies /></CookiesProvider>, document.getElementById('primadoro'));