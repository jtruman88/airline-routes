import React, { Component } from 'react';
import Data from '../data';

class Table extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const headerNames = this.props.columns.map(col => {
      return (
        <th key={col.name}>{col.property}</th>
      );
    });

    const bodyRows = this.props.rows.map(row => {
      const rows = this.props.columns.map(col => {
        const value = row[col.property];
        return (
          <td key={col.property + value}>
            { this.props.format(col.property, value) }
          </td>
        );
      });

      return (
        <tr key={Object.values(row).join(':')}>
          { rows }
        </tr>
      );
    });

    return (
      <table className={this.props.className}>
        <thead>
          <tr>
            { headerNames }
          </tr>
        </thead>
        <tbody>
          { bodyRows }
        </tbody>
      </table>
    );
  }
}

export default Table;
