import React, { Component } from 'react';
import './App.css';

import Data from './data';

class App extends Component {

  render() {
    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          {Data.routes.map((route, i) => {
            return (
              <li key={i}>
                Airline - {route.airline}, Source - {route.src}, Destination - {route.dest}
              </li>
            );
          })}
        </section>
      </div>
    );
  }
}

export default App;
