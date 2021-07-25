import React from 'react';
import Nav from './Nav';
import CreateGist from './pages/CreateGist';
import EditGist from './pages/EditGist';
import ShowGists from './pages/ShowGists';
import DeleteGist from './pages/DeleteGist';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './css/App.css';

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      token: '',
      isTokenWritten: false
    }
  }
  tokenSubmit = e => {
    e.preventDefault()
    this.setState({ isTokenWritten: true });
    localStorage.setItem('token', this.state.token)
  }
  onChange = e => {
    this.setState({ token: e.target.value })
    console.log(this.state.token)
  }
  render(){
      return(
        <div className="app">
          {this.state.isTokenWritten ? (
            <Router>
            <div className="App">
              <Nav />
              <Switch>
                <Route path="/" exact component={ShowGists} />
                <Route path="/create_gist" component={CreateGist}/>
                <Route path="/edit_gist" component={EditGist} render={(props) => <EditGist {...props}/>}/>
                <Route path="/delete_gist" component={DeleteGist} />
              </Switch>
            </div>
          </Router>
          ) : (
            <div className="token-setup">
              <h3>Set up your token!</h3>
              <form onSubmit={this.tokenSubmit}>
                <input className="token-input" type="text" onChange={this.onChange} />
                <button className="token-btn">GIST TIME</button>
              </form>
            </div>
          )}
        </div>
      )
    }
}
