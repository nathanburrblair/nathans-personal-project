import React, { Component } from 'react';
import './App.css';
import {HashRouter} from 'react-router-dom';
import Routes from './Routes';

class App extends Component {
  render() {
    return (
      <HashRouter>
          <div className="App">
            
          {Routes}
          </div>
      </HashRouter>
    );
  }
}

export default App;
