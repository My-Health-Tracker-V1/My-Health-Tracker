import React, { Component } from 'react'
import Calendar from '../shared/Calendar'
import axios from 'axios';
import BottomNavbar from '../shared/BottomNavbar'
import Energy from '../Entries/Energy';
import Foods from '../Entries/Foods';
import Drinks from '../Entries/Drinks.js';
import Exercise from '../Entries/Exercise.js';
import Sleep from '../Entries/Sleep.js';
import Symptoms from '../Entries/Symptoms.js';

export default class Dashboard extends Component {

  state = {
    day: new Date().toISOString().split('T')[0],
    user: this.props.user._id,
    data: null,
    energy: 0,
    foods: [],
    drinks: [],
    exercises: [],
    sleep: [],
    symptoms: []
  }

  setDate = async (date) => {
      await this.setState({
        day: date
      })
      await this.getData()   
  }

  getData = () => {
    console.log('getting data from api')
    axios.get(`/api/days/user/${this.props.user._id}/day/${this.state.day}`)
    .then(res => {
      console.log(res.data)
      if(res.data === null){
        this.setState({
          data: res.data,
          energy: null,
          foods: [],
          drinks: [],
          exercises: [],
          sleep: [],
          symptoms: []
        })
      } else {
        this.setState({
          data: res.data,
          energy: res.data.energy ,
          foods: res.data.foods || [],
          drinks: res.data.drinks || [],
          exercises: res.data.exercises || [],
          sleep: res.data.sleep || [],
          symptoms: res.data.symptoms || []
        })
      }

    })
    .catch(err => console.log(err))
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    console.log('checking for updates', this.props)
    // this.getData()
  }

  componentDidMount = () => {
    // this.setState({
    //   user: this.props.user._id
    // })
    this.getData()
    this.setState()
  }
  // information from api -> for logged in user get all data with date today

  render() {
    // console.log(this.state.data)
    // console.log(this.state.excercises)
    return (
      <div>
          <Calendar setDate={this.setDate}/>
        <div className="mt10">
          {/* <h1 className="fw4 blue">Daily entries</h1> */}
          <section className="ph4 ph4-ns pt4 pb5">
          {!this.state.data ? (<p className="f1"> No entries for this day!</p>) : (<div>
            {!this.state.energy ? (<p></p>) : (<Energy energy={this.state.energy.energyLevel} user={this.state.user} day={this.state.day}/>)}
            {this.state.symptoms.length === 0 ? (<p></p>) : (<Symptoms symptoms={this.state.symptoms} user={this.state.user} day={this.state.day}/>)}
            {this.state.foods.length === 0 ? (<p></p>) : (<Foods foods={this.state.foods} user={this.state.user} day={this.state.day}/>)}
            {this.state.drinks.length === 0 ? (<p></p>) : (<Drinks drinks={this.state.drinks} user={this.state.user} day={this.state.day}/>)}
            {this.state.exercises.length === 0 ? (<p></p>) : (<Exercise exercises={this.state.exercises} user={this.state.user} day={this.state.day}/>)}
            {this.state.sleep.length === 0 ? (<p></p>) : (<Sleep sleep={this.state.sleep} user={this.state.user} day={this.state.day}/>)}
            </div>)}
          </section>
        </div>
        <BottomNavbar />
      </div>
    )
  }
}
