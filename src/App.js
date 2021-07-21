import React from 'react';
import Nav from './Nav';
import CreateGist from './pages/CreateGist';
import Home from './pages/Home';
import EditGist from './pages/EditGist';
import ShowGists from './pages/ShowGists';
import DeleteGist from './pages/DeleteGist';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './css/App.css';

export default class App extends React.Component {
  render(){
      return(
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
      )
    }
}
