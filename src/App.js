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
          <table className="routes-table">
            <thead>
              <tr>
                <th>Airline</th>
                <th>Sourse Airport</th>
                <th>Destination Airport</th>
              </tr>
            </thead>
            <tbody>
              {Data.routes.map((route, i) => {
                return (
                  <tr key={i}>
                    <td>{Data.getAirlineById(route.airline)}</td>
                    <td>{Data.getAirportByCode(route.src)}</td>
                    <td>{Data.getAirportByCode(route.dest)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </div>
    );
  }
}

export default App;
