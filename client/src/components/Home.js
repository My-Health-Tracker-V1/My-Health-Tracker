import React from 'react'
import {Link} from 'react-router-dom'
import {logout} from '../services/auth'
import TopBar from './shared/TopBar'


const handleLogout = props => {
  console.log(props);
  logout().then(() => {
    props.setUser(null);
  })
}

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



// export default class Home extends Component {

//   state = {
//     showSignup: false,
//     showLogin: false
//   }

//   handleSignupClick = () => {
//     this.setState({
//       showSignup: !this.state.style
//     })
//   }

//   handleLoginClick = () => {
//     this.setState({
//       showLogin: !this.state.showLogin
//     })
//   }

//   render() {
//     return (
//       <div style={{"height": "700px","display": "flex", "flexDirection": "column", "justifyContent": 'center', "alignItems": "center"}}>

//       <nav className='ba blue pv2 w-100 fixed top-2' style={{"marginBottom": "10px"}}>
//           <div className="link blue hover-silver dib mh3 tc" style={{
//             "display": "flex", "flexDirection":"row", "justifyContent": "center", "alignItems":"center"}}>
            
//             <Icons icon='health-icon'/>
//             <span class="f6 db">My Health Diary</span>
//           </div>
//       </nav>
    
//       <div style={{"display": "flex", "flexDirection": "column", "justifyContent": 'center', "alignItems": "center"}}>
//         <button onClick={this.handleSignupClick} className="f8 link dim br-pill ba bw1 ph5 pv2 mb4 dib dark-blue" >Signup</button>
//         <button onClick={this.handleLoginClick} className="f8 link dim br-pill ba bw1 ph5 pv2 mb2 dib dark-blue" >Login</button>
//       </div>

//       <div>
//         {
//           this.state.showSignup === true && 
//           <Signup />
//         }
//       </div>

//       <div>
//         {
//           this.state.showLogin === true &&
//           <Login />
//         }
//       </div>
      
//     </div>
//     )
//   }
// }


