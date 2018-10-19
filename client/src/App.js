import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import TabBar from "./components/TabBar";
import Footer from "./components/Footer";
import Wrapper from "./components/Wrapper";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import Connection from "./components/Connections";
import Dashboard from './components/Dashboard';
import Landing from './components/Landing';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Wrapper>
            <Route exact path="/" component={Landing} />
            <Route path="/login" component={Login} />
            <Route path="/registration" component={Registration} />
            <Route path="/profile" component={Profile} />
            <Route path="/feed" component={Feed} />
            <Route path="/connections" component={Connection} />
            <Route path="/Dashboard" component={Dashboard} />
          </Wrapper>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
