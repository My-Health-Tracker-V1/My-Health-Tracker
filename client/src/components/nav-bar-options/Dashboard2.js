import React, { Component } from 'react'
import DashboardCard from '../shared/DashboardCard'
import Calendar from '../shared/Calendar'
import BottomNavbar from '../shared/BottomNavbar'
import axios from 'axios';


export default class Dashboard2 extends Component {

  state ={
    day: new Date().toISOString().split('T')[0],
    user: this.props.user._id,
    isDayEmpty: true,
    energy: undefined,
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
    await this.getUserData()   
}

  getUserData(){
    axios.get(`/api/days/user/${this.props.user._id}/day/${this.state.day}`)
      .then(res=>{
        console.log(res.data);
        this.setState({
          isDayEmpty: false,
          energy: res.data.energy,
          foods: res.data.foods,
          drinks: res.data.drinks,
          exercises: res.data.exercises,
          sleep: res.data.sleep,
          symptoms: res.data.symptoms
        })
      })
      .catch(err=>console.log(err))
  }


  render() {
    return (
      <div>
        <Calendar setDate={this.setDate}/>

        {
          this.state.isDayEmpty?<h1 className="pt5">No entries for this day!</h1>:
          (
            <DashboardCard />
          )
        
        }
      
        <BottomNavbar/>
      </div>
    )
  }
}
