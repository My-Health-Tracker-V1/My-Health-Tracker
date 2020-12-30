import React, { Component } from 'react';
import Icons from '../../shared/Icons'
import '../food/FoodEntry.css'

export default class DateTimeInput extends Component {
  render() {
    return (
      <div>
        <form className="date-form">
              <div className="row-container">
                <Icons icon="date-picker" />
                <input type="date" id="date" className="f6 pa1 mr2 ml1 w4 mv1"
                      name="date" value={this.props.date}
                  onChange={this.props.handleChange}
                />
              </div>
              <div className="row-container">
                <Icons icon="time-picker" />
                <input type="time" id="startTime" className="f6 pa1 mr2 ml1 w4 mv1"
                    name="startTime" value={this.props.startTime}
                  onChange={this.props.handleChange}
                />
              </div>
        </form>
      </div>
    )
  }
}
