import React, { Component } from 'react';
import './FoodEntry.css'

export default class SearchField extends Component {

  handleQuery = event => {
    this.props.setQuery(event.target.value)
  }

  render() {
    return (
      <div className="search-bar"> 
        <form onSubmit={this.props.handleQuery}>
          <label id="search-label">
            <input className="f6 pa1 mr3 ml1 w4 mv1"
              id="input-style"
              type="search"
              name="query"
              placeholder="Ingredients in your dish..."
              value={this.props.query}
              onChange={this.props.handleSearch}
            />
          </label>
        </form>
      </div>
    )
  }
}
