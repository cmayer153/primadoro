import React from 'react';
import ReactDOM from 'react-dom'
import TitleMenu from './TitleMenu.jsx';
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
    //console.log('startup state cookies: ', cookies);
    this.state = {
      currentUser: null,
      logEntries: null,
      newEntry: null,
      creds: cookies.get('primadoro') || null
    }

    this.addUser = this.addUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
    //this.updateUser = this.updateUser.bind(this);
    this.addLog = this.addLog.bind(this);
    this.addUserLog = this.addUserLog.bind(this);
    this.addLocalStorageLog = this.addLocalStorageLog.bind(this);
    this.editLog = this.editLog.bind(this);
    this.editUserLog = this.editUserLog.bind(this);
    this.editLocalStorageLog = this.editLocalStorageLog.bind(this);
    this.loginOrShowUser = this.loginOrShowUser.bind(this);


  }

  componentDidMount() {
    if(this.state.creds) {
      //cookies for this site exist
      //TODO this below is copy pasted from loginUser function. should abstract it out into its own function.
      var authConfig = {
        headers: {
          authorization: "Token " + this.state.creds.token
        }
      }
      axios.get(`api/users/logs`, authConfig)
        .then( (res) => {
          if (res.data[0].logs.length > 0) {
            this.setState({logEntries: res.data[0].logs});

          }
        })
        .catch( (err) => {
          console.log('error fetching logs: ', err);
        })

    } else {
      var localLogs = JSON.parse(localStorage.getItem('primadoro_logs'));
      if (Array.isArray(localLogs)) {
        this.setState({logEntries: localLogs});
      }
    }
  }

  loginUser(user) {
    axios.post(`/api/users/login`, {user: user})
      .then ( (res) => {
        //console.log('loginUser response: ', res.data.user);
        const {cookies} = this.props;
        cookies.set('primadoro', res.data.user, {path:'/'});
        this.setState({creds: res.data.user});
        this.setState({currentUser: res.data.user.username});
        var authConfig = {
          headers: {
            authorization: "Token " + res.data.user.token
          }
        }
        axios.get(`api/users/logs`, authConfig)
          .then( (res) => {
            //console.log('back with logs: ', res.data);
            this.setState({logEntries: res.data[0].logs});
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
    // TODO could add an endpoint for this action
    axios.post(`/api/users`, {user: newUser})
      .then ( (res) => {
        console.log('addUser response: ', res);
        const {cookies} = this.props;
        cookies.set('primadoro', res.data.user, {path:'/'});
        this.setState({creds: res.data.user});
        this.setState({currentUser: res.data.user.username});

      })
      .catch ( (err) => {
        console.log('error adding user: ', err);
      });

  }

  addLog(timeStamp) {
    if (this.state.creds != null) {
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
    //console.log('got this from localStorage: ', localLogs);
    //END TEST CODE
    if (! Array.isArray(localLogs)) {
      localLogs = [];
    }
    localLogs.unshift(tempEntry);
    //console.log('saving this to localStorage: ', localLogs);
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
    if (this.state.creds != null) {
      this.editUserLog(inLog);
    } else {
      this.editLocalStorageLog(inLog);
    }
  }

  editUserLog(inLog) {
    console.log('saving log: ', inLog);
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

  editLocalStorageLog(inLog) {
    var localLogs = JSON.parse(localStorage.getItem('primadoro_logs'));
    for (let i = 0; i < localLogs.length; i++) {
      if (localLogs[i].timeStamp === inLog.timeStamp) {
        localLogs[i].description = inLog.description;
        localLogs[i].workRating = inLog.workRating;
        break;
      }
    }

    console.log('saving this to localStorage: ', localLogs);
    localStorage.setItem('primadoro_logs', JSON.stringify(localLogs));
    this.setState({logEntries: localLogs});
  }

  loginOrShowUser() {
    if (this.state.creds === null) {
      return (        
        <LoginField saveUser={this.loginUser}/>
      )
    } else {
      return ( 
        <a>Logged in as: {this.state.creds.username}</a>
      )
    }

  }


  render() {
    return (
      <div className="primadoro-main-page">
        <TitleMenu creds={this.state.creds} saveUser={this.loginUser} addUser={this.addUser}/>
        <TimingModule addLog={this.addLog}/>
        <LogList entries={this.state.logEntries} submit={this.editLog}/>
      </div>
    )
  }
}

const AppWithCookies = withCookies(App);

ReactDOM.render(<CookiesProvider><AppWithCookies /></CookiesProvider>, document.getElementById('primadoro'));