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
      airport: 'all',
    };

    this.formatValue = this.formatValue.bind(this);
    this.onAirlineSelect = this.onAirlineSelect.bind(this);
    this.onAirportSelect = this.onAirportSelect.bind(this);
    this.hasAirport = this.hasAirport.bind(this);
    this.hasAirline = this.hasAirline.bind(this);
    this.showAllRoutes = this.showAllRoutes.bind(this);
    this.availableAirlines = this.availableAirlines.bind(this);
    this.availableAirports = this.availableAirports.bind(this);
    this.filterByAirports = this.filterByAirports.bind(this);
  }

  onAirlineSelect(airline) {
    this.setState({
      airline: airline,
    });
  }

  onAirportSelect(airport) {
    this.setState({
      airport: airport,
    });
  }

  formatValue(property, value) {
    if (property === 'airline') {
      return Data.getAirlineById(value).name;
    } else {
      return Data.getAirportByCode(value).name;
    }
  }

  hasAirline(airline) {
    return airline === this.state.airline ||
           this.state.airline === 'all';
  }

  hasAirport(dest, src) {
    return (dest === this.state.airport || src === this.state.airport) ||
            this.state.airport === 'all';
  }

  showAllRoutes(e) {
    this.setState({
      airline: 'all',
      airport: 'all',
    });
  }

  availableAirlines() {
    if (this.state.airport === 'all') {
      return Data.airlines.map(airline => airline.name);
    }

    const airlines = [];

    Data.routes.forEach(route => {
      if (this.state.airport === Data.getAirportByCode(route.dest).name ||
          this.state.airport === Data.getAirportByCode(route.src).name) {
            airlines.push(Data.getAirlineById(route.airline).name);
      }
    });

    return airlines;
  }

  availableAirports() {
    if (this.state.airline === 'all') {
      if (this.state.airport === 'all') {
        return Data.airports.map(airport => airport.name);
      } else {
        return this.filterByAirports(Data.routes);
      }
    }

    const routes = Data.routes.filter(route => {
      return Data.getAirlineById(route.airline).name === this.state.airline;
    });

    if (this.state.airport === 'all') {
      const dests = routes.map(route => Data.getAirportByCode(route.dest).name);
      const srcs = routes.map(route => Data.getAirportByCode(route.src).name);

      return [...dests, ...srcs];
    } else {
      return this.filterByAirports(routes);
    }
  }

  filterByAirports(routes) {
    const filteredRoutes = routes.filter(route => {
      return this.state.airport === Data.getAirportByCode(route.dest).name ||
             this.state.airport === Data.getAirportByCode(route.src).name;
    });

    const dests = filteredRoutes.map(route => Data.getAirportByCode(route.dest).name);
    const srcs = filteredRoutes.map(route => Data.getAirportByCode(route.src).name);

    return [...dests, ...srcs];
  }

  render() {
    const columns = [
      {name: 'Airline', property: 'airline'},
      {name: 'Source Airport', property: 'src'},
      {name: 'Destination Airport', property: 'dest'}
    ];

    const filteredRoutes = Data.routes.filter(route => {
      const airline = Data.getAirlineById(route.airline).name;
      const destination = Data.getAirportByCode(route.dest).name;
      const source = Data.getAirportByCode(route.src).name;
      return this.hasAirline(airline) && this.hasAirport(destination, source);
    });

    const perPage = (filteredRoutes.length < 25 ? filteredRoutes.length : 25);
    const allRoutesShown = this.state.airline === 'all' &&
                           this.state.airport === 'all';

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
            enabledValues={this.availableAirlines()}
          />
          flying in or out of
            <Select
              options={Data.airports}
              valueKey="code"
              titleKey="name"
              allTitle="All Airports"
              value={this.state.airport}
              onSelect={this.onAirportSelect}
              enabledValues={this.availableAirports()}
            />
          <button onClick={this.showAllRoutes} disabled={allRoutesShown}>
            Show All Routes
          </button>
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
