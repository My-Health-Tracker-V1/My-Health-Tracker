import React, { Component } from 'react'

export default class SearchField extends Component {

  handleSearch = event => {
    this.props.setQuery(event.target.value)
  }

  render() {
    return (
      <div>
          <input 
            type="search"
            name="query"
            placeholder="Search for..."
            value={this.props.query}
            onChange={this.handleSearch}
          />
      </div>
    )
  }
}
