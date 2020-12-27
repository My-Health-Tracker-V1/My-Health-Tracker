import React, { Component } from 'react'
import '../add-entries/FoodEntry.css'

export default class Buttons extends Component {
  render() {
    return (
      <div className="buttons">
        <button>Cancel</button>
        <button>Save all</button>
      </div>
    )
  }
}
