import React, { Component } from 'react'
import TopBar from '../shared/TopBar'
import BottomNavbar from '../shared/BottomNavbar'
import axios from 'axios'
import { LineChart } from 'react-chartkick'
import 'chart.js'


export default class Analysis extends Component {

  state={
    userOutcomes:[],
    selectedOutcome:'',
    userEvents:[],
    selectedEvent:'',
    userSpecificEvents:[],
    selectedSpecificEvent:'',
    selectedData:[]
  }
  
  handleChange=event=>{

    const {name,value}=event.target;

    this.setState({
    [name]:value
    })

    this.getUserOptions();

  }

  getUserOptions=()=>{
    
    axios.get(`/api/analysis/user/${this.props.user._id}/options`)
      .then(res=>{

        this.setState({
          userOutcomes:[...res.data.userOutcomes],
          userEvents:[...res.data.userEvents]
        })

        if(this.state.selectedEvent && this.state.selectedEvent!=='Sleep'){
           this.setState({
             userSpecificEvents:[...res.data[this.state.selectedEvent]]
           })
        }

        this.getSelectedData();

      })
      .catch(err=>console.log(err))
  }

  getSelectedData=()=>{
    //request selected data from API and save it in selectedData state
     axios.get(`/api/analysis/user/${this.props.user._id}/selected-data/${this.state.selectedOutcome}/${this.state.selectedEvent}/${this.state.selectedEvent==="Sleep"? "Sleep":this.state.selectedSpecificEvent}`)
       .then(res=>{
         this.setState({
           selectedData:[...res.data]
         })
         console.log(res)})
       .catch(err=>console.log(err))
  }

  componentDidMount=()=>{
    this.getUserOptions();
  }

  componentDidUpdate=()=>{
 
  }

  render() {
    let specificEventType='';

    switch(this.state.selectedEvent){
      case('Foods'):
        specificEventType='food';
        break;
      case('Drinks'):
        specificEventType='drink';
        break;
      case('Exercise'):
        specificEventType='exercise';
        break;
      default:
    }

    return (
      <div>
        <TopBar icon='analysis' title='Analysis'/>

        <div className='flex flex-column items-center pt3 pb5'>

          <div className="flex">
            <label className="f6 mt3 gray" htmlFor="selectedOutcome">Outcome:</label>
            <select name="selectedOutcome" id="selectedOutcome" onChange={this.handleChange} value={this.state.selectedOutcome} className="f6 mt1" >
              {this.state.userOutcomes.map(option=>{
                return(
                  <option value={option} className="f6">{option}</option>
                )
              })}
            </select>
          </div>
          
          <div className="flex">
            <label className="f6 mt3 gray" htmlFor="selectedEvent">Event:</label>
            <select name="selectedEvent" id="selectedEvent" onChange={this.handleChange} value={this.state.selectedEvent} className="f6 mt1" >
              {this.state.userEvents.map(option=>{
                return(
                  <option value={option} className="f6">{option}</option>
                )
              })}
            </select>
          </div>

          {this.state.selectedEvent==='Sleep'||!this.state.selectedEvent?<></>:(
            <div className="flex">
              <label className="f6 mt3 gray" htmlFor="selectedSpecificEvent">Select {specificEventType}:</label>
              <select name="selectedSpecificEvent" id="selectedSpecificEvent" onChange={this.handleChange} value={this.state.selectedSpecificEvent} className="f6 mt1" >
                {this.state.userSpecificEvents.map(option=>{
                  return(
                    <option value={option} className="f6">{option}</option>
                  )
                })}
              </select>
            </div>
          )}

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
