import React from 'react'
import { Link } from 'react-router-dom'
import TopBar from './shared/TopBar'

export default function Home(props) {
  return (
    <div>
      <TopBar icon='health-icon' title='My Health Diary'/>
      <div className="flex flex-column justify-center items-center pv6">
          <Link className="f5 link dim br-pill ba bw2 ph3 pv2 mb3 dib dark-blue w4" to="/signup">Signup</Link>
          <Link className="f5 link dim br-pill ba bw2 ph3 pv2 mb2 dib dark-blue w4" to="/login">Login</Link>
      </div>
    </div>
  )
}



