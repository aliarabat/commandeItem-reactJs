import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CommandCreate from "./containers/CommandCreate";
import { Provider } from "react-redux"
import Navbar from './components/Navbar';
import CommandeList from './containers/CommandeList';
import PageNotFound from './components/pages/PageNotFound';
import About from './components/pages/About';
import commandStore from './store/commandStore';
class App extends Component {
  render() {
    return (
        <Provider store={commandStore}>
          <Router>
            <div className="App">
              <Navbar />
              <Switch>
                <Route exact path="/" component={CommandeList} />
                <Route exact path="/commands/add" component={CommandCreate} />
                <Route exact path="/about" component={About} />
                <Route component={PageNotFound}/>
              </Switch>
            </div>
          </Router>
        </Provider>
    );
  }
}

export default App;
