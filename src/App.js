import React, { Component } from 'react';
import './App.css';

import Data from './data';

class App extends Component {
  rawValues() {
    return Data.routes.map((route, i) => {
      return (
        <li key={i}>
          `airline: ${route.airline} - src: ${route.src} - dest: ${route.dest}`
        </li>
      );
    });
  }

  render() {
    const values = this.rawValues();

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <ul>{values}</ul>
        </section>
      </div>
    );
  }
}

export default App;
