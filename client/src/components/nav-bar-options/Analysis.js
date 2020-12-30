import React, { Component } from 'react'
import TopBar from '../shared/TopBar'
import BottomNavbar from '../shared/BottomNavbar'
import axios from 'axios'
import { LineChart } from 'react-chartkick'
import 'chart.js'


export default class Analysis extends Component {

  state={
    userOutcomes:[],
    userEvents:[],
    selectedOutcome:'',
    selectedEvent:'',
    selectedData:[],
  }
  
  handleChange=event=>{

    const {name,value}=event.target;

    this.setState({
    [name]:value
    })

    this.getSelectedData();

  }

  getUserOptions=()=>{
    
    axios.get(`/api/analysis/user/${this.props.user._id}/options`)
      .then(res=>{
        this.setState({
          userOutcomes:[...res.data]
        })
      })
      .catch(err=>console.log(err))
  }

  getSelectedData=()=>{
    //request selected data from API and save it in selectedData state
    axios.get(`/api/analysis/user/${this.props.user._id}/selected-data`)
      .then(res=>console.log(res))
      .catch(err=>console.log(err))
  }

  componentDidMount=()=>{
    this.getUserOptions();
  }

  render() {

    //this.getUserOptions();

    return (
      <div>
        <TopBar icon='analysis' title='Analysis'/>

        <div className='flex flex-column items-center pv3'>

          <div className="flex">
            <label className="f6 mt3 gray" htmlFor="">Outcome:</label>
            <select name="name" id="name" onChange={this.handleChange} value={this.state.selectedOutcome} className="f6 mt1" >
              {this.state.userOutcomes.map(option=>{
                return(
                  <option value={option} className="f6">{option}</option>
                )
              })}
            </select>
          </div>
          
          <div className="flex">
            <label className="f6 mt3 gray" htmlFor="">Event:</label>
            <select name="name" id="name" onChange={this.handleChange} value={this.state.selectedEvent} className="f6 mt1" >
              {this.state.userEvents.map(option=>{
                return(
                  <option value={option} className="f6">{option}</option>
                )
              })}
            </select>
          </div>

          {this.state.selectedData.length===0? <></> :(
            <div>
              <h3>Intensity of {this.state.selectedOutcome} in time</h3>
              <LineChart data={this.state.selectedData} height="80vh" legend="right"/>
            </div>
          )}


        </div>

        <BottomNavbar/>
      </div>
    )
  }
}
