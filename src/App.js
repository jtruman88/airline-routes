import React, { Component } from 'react';
import './App.css';
import Data from './data';
import Table from './components/Table';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      airline: 'all',
    };

    this.formatValue = this.formatValue.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleSelectChange(e) {
    this.setState({
      airline: e.target.value,
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

    const airlineOptions = Data.airlines.map(airline => {
      return (
        <option key={airline.id} value={airline.name}>{airline.name}</option>
      );
    });

    const perPage = (filteredRoutes.length < 25 ? filteredRoutes.length : 25)

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          Show routes for
          <select value={this.state.airline} onChange={this.handleSelectChange}>
            <option value="all">All Airlines</option>
            { airlineOptions }
          </select>
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
