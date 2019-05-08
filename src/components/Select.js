import React, { Component } from 'react';

class Select extends Component {
  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
  }

  handleSelect(e) {
    this.props.onSelect(e.target.value);
  }

  isDisabled(option) {
    if (this.props.valueKey === 'id') {
      return (this.props.value !== 'all' && this.props.value !== option.name) ||
             !this.props.enabledValues.includes(option.name);
    } else {
      if (this.props.enabledValues.includes(option.name)) {
        return false;
      } else {
        return this.props.value !== 'all' || this.props.value !== option.name;
      }
    }
  }

  render() {
    let options = this.props.options.map(option => {
      return (
        <option key={option.id || option.code} value={option.name}
                disabled={this.isDisabled(option)}>
          {option.name}
        </option>
      );
    });

    const allOption = <option key="all" value="all">{this.props.allTitle}</option>;
    options = [allOption, ...options];

    return (
      <select value={this.props.value} onChange={this.handleSelect}>
        { options }
      </select>
  );
  }
}

export default Select;

/*
Airlines are disabled if:
  props.value !== 'all' AND
  props.value !-- option.name
  AND routes does not have a dest or src airport with the airline
    loop through routes checking if getairport.code(route.dest or route.src) === state.airport.
      add getAirlineById(route.airline) to airlines array.

Airports are disabled if:
  props.value !== 'all' AND
  props.value doesn't equal option.name
  routes does not have an airline with the dest or src airport AND
  routes does not have a dest or src airport with current airport

*/
