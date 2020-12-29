import React, { Component } from 'react'
import { signup } from '../../services/auth';
import TopBar from '../shared/TopBar'


export default class Signup extends Component {

  state = {
    email: '',
    password: '',
    message: ''
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    signup(email, password)
      .then(data => {
        if (data.message) {
          this.setState({
            message: data.message,
            email: '',
            password: ''
          })
        } else {
          this.props.setUser(data);
          this.props.history.push('/login');
        }
      })
  }

  render() {
    return (
      <div>
        <TopBar icon='health-icon' title='My Health Diary'/>
        <form onSubmit={this.handleSubmit} className="pt5 flex flex-column">
          <div className="flex flex-column items-center">
            <label className="mv1" htmlFor='email'>Email: </label>
            <input
              type='text'
              name='email'
              id='email'
              value={this.state.email}
              onChange={this.handleChange}
              className="mt1 mb3 w5"
            />
          </div>
           <div className="flex flex-column items-center">
            <label className="mv1" htmlFor='password'>Password: </label>
            <input
              type='password'
              name='password'
              id='password'
              value={this.state.password}
              onChange={this.handleChange}
              className="mt1 mb3 w5"
            />
          </div>
          <div className="w-100 pa3 mr2">
            <button className="f6 link dim br-pill ba bw1 ph3 pv2 mb2 dib dark-blue" 
            type='submit'> Signup 
            </button>
          </div>
        </form>
      </div>
    )
  }
}