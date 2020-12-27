import React, { Component } from 'react'
import DashboardCard from '../shared/DashboardCard'
import Calendar from '../shared/Calendar'
import BottomNavbar from '../shared/BottomNavbar'

export default class Dashboard2 extends Component {

  state ={
    day: new Date().toISOString().split('T')[0],
    user: this.props.user._id,
    data: null,
    energy: null,
    foods: [],
    drinks: [],
    exercises: [],
    sleep: [],
    symptoms: []
  }



  render() {
    return (
      <div>
        <Calendar setDate={this.setDate}/>
        <DashboardCard/>
        <BottomNavbar/>
      </div>
    )
  }
}
