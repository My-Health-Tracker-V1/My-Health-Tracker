import React, { Component } from 'react'
import BottomNavbar from '../shared/BottomNavbar'
import EntryList from '../shared/EntryList'
import TopBar from '../shared/TopBar'

export default class AddFrequent extends Component {
  render() {
    const frequentArr=['Symptoms','Foods','Exercise', 'Sleep', 'Energy']

    return (
      <div className='flex flex-column justify-center items-center'>
        <TopBar className='ba pa3 w-100' title='Frequent Entries' icon='frequent'/>
        <div className='flex justify-center pv5'>
          <EntryList title="" entries={frequentArr}/>
        </div>
        <BottomNavbar/>
      </div>
    )
  }
}
