/*
* App Starting page
* Contents
* --Header
* --Router
* --Footer
*/

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'assets/Theme.css';
import { Header } from 'components';
import { Home } from 'containers';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="Background" style={{ height: window.innerHeight }} />
          <Header />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              <Home type="login" />
            </Route>
            <Route path="/signup">
              <Home type="signup" />
            </Route>
            <Route path="/logout">
              <Home type="logout" />
            </Route>
            <Route path="/dashboard">
              <Home type="dashboard" />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}


export { Main }
