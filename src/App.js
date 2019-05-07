import React, { Component } from 'react';
import './App.css';
import Data from './data';
import Table from './components/Table';

class App extends Component {
  constructor(props) {
    super(props);

    this.formatValue = this.formatValue.bind(this);
  }

  formatValue(property, value) {
    if (property === 'airline') {
      return Data.getAirlineById(value).name;
    } else {
      return Data.getAirportByCode(value).name;
    }
  }

  render() {
    const columns = [
      {name: 'Airline', property: 'airline'},
      {name: 'Source Airport', property: 'src'},
      {name: 'Destination Airport', property: 'dest'}
    ];

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <Table
            className="routes-table"
            columns={columns}
            rows={Data.routes}
            format={this.formatValue}
            perPage={25}
          />
        </section>
      </div>
    );
  }
}

export default App;
