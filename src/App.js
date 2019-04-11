import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CommandCreate from "./Components/Commande/CommandCreate";
import { Provider } from "./Components/Controller/context"
import Navbar from './Components/Navbar';
import CommandeList from './Components/Commande/CommandeList';
import PageNotFound from './Components/Commande/pages/PageNotFound';
import About from './Components/Commande/pages/About';
class App extends Component {
  render() {
    return (
        <Provider>
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
