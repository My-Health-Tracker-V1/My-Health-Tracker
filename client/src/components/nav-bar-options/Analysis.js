import React, { Component } from 'react'
import TopBar from '../shared/TopBar'
import BottomNavbar from '../shared/BottomNavbar'
import DemoData from '../Entries/DemoData'
import RealData from '../Entries/RealData'



export default class Analysis extends Component {
  render() {
    return (
      <div>
      <TopBar icon='analysis' title='Analysis'/>
      {/* <RealData user={this.props.user._id}/> */}
      <DemoData />
      <BottomNavbar/>
      </div>
    )
  }
}
