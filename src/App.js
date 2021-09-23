import React, { useState } from 'react';
import CreateGist from './components/CreateGist';
import EditGist from './components/EditGist';
import './styles/App.css';
import SearchPage from './components/SearchPage';
import Nav from './components/Nav';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';



export default function App() {
  const [isTokenWritten, setIsTokenWritten] = useState(false);
  const [token, setToken] = useState('')

  const setActualToken = e => {
    setToken(e.target.value)
  }
  const handleEnter = e => {
    if(e.code === "Enter"){
      setLocalToken()
    }
  }
  const setLocalToken = () => {
    localStorage.setItem('token', token)
    setIsTokenWritten(true)
  }
  return (
    <div className="App">
      {!isTokenWritten ? <div className="token-setup">
        <input onKeyDown={handleEnter} onChange={setActualToken} placeholder="Input your token"/>
        <button onClick={setLocalToken}>Show my gists!</button>
      </div> : 
        <Router>
          <Nav />
          <Switch>
            <Route path="/" exact component={SearchPage}/>
            <Route path="/create_gist" component={CreateGist}/>
            <Route path="/edit_gist" component={EditGist}/>
          </Switch>
        </Router>
      }
    </div>
  );
}
