import React, { Component } from 'react';

class Select extends Component {
  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(e) {
    this.props.onSelect(e.target.value);
  }

  render() {
    let options = this.props.options.map(airline => {
      return (
        <option key={airline.id} value={airline.name}>{airline.name}</option>
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
