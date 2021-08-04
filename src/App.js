import React from 'react';
import CreateGist from './components/CreateGist';
import EditGist from './components/EditGist';
import './styles/App.css';
import SearchPage from './components/SearchPage';
import Nav from './components/Nav';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';



export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isTokenWritten: false
    }
  }
  render(){
    return (
      <div className="App">
        <Router>
          <Nav />
          <Switch>
            <Route path="/" exact component={SearchPage}/>
            <Route path="/create_gist" component={CreateGist}/>
            <Route path="/edit_gist" component={EditGist}/>
          </Switch>
        </Router>
      </div>
    );
  }
}
