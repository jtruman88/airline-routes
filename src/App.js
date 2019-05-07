import React, { Component } from 'react';
import './App.css';
import Data from './data';
import Table from './components/Table';
import Select from './components/Select';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      airline: 'all',
    };

    this.formatValue = this.formatValue.bind(this);
    this.onAirlineSelect = this.onAirlineSelect.bind(this);
  }

  onAirlineSelect(airline) {
    this.setState({
      airline: airline,
    });
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

    const filteredRoutes = Data.routes.filter(route => {
      const airline = Data.getAirlineById(route.airline).name;
      return airline === this.state.airline || this.state.airline === 'all';
    });

    const perPage = (filteredRoutes.length < 25 ? filteredRoutes.length : 25)

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          Show routes for
          <Select
            options={Data.airlines}
            valueKey="id"
            titleKey="name"
            allTitle="All Airlines"
            value={this.state.airline}
            onSelect={this.onAirlineSelect}
          />
          <Table
            className="routes-table"
            columns={columns}
            rows={filteredRoutes}
            format={this.formatValue}
            perPage={perPage}
          />
        </section>
      </div>
    );
  }
}

export default App;
