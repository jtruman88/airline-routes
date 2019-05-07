import React, { Component } from 'react';

class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
    };

    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
  }

  previousPage(e) {
    this.setState({
      page: this.state.page - 1
    });
  }

  nextPage(e) {
    this.setState({
      page: this.state.page + 1
    });
  }

  render() {
    const pageStart = this.state.page * this.props.perPage;
    const pageEnd = pageStart + this.props.perPage;

    const headerNames = this.props.columns.map(col => {
      return (
        <th key={col.name}>{col.name}</th>
      );
    });

    const bodyRows = this.props.rows.slice(pageStart, pageEnd).map(row => {
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
      <div>
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
        <div className="pagination">
          <p>Showing {pageStart + 1}-{pageEnd} of {this.props.rows.length} total routes</p>
          <p>
            <button
              disabled={pageStart === 0}
              onClick={this.previousPage}
            >Previous Page</button>
            <button
              disabled={pageEnd === this.props.rows.length}
              onClick={this.nextPage}
            >Next Page</button>
          </p>
        </div>
      </div>
    );
  }
}

export default Table;
