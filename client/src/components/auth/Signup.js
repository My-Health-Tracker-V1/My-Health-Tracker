import React, { Component } from 'react'
import { signup } from '../../services/auth';
import TopBar from '../shared/TopBar';
import AuthForm from '../auth/AuthForm'


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
          <AuthForm {...this.state} handleChange={this.handleChange} 
                    handleSubmit={this.handleSubmit}/>
          <div className="w-100 pa3 mr2">
            <button className="f6 link dim br-pill ph5 pv2 mb2 dib white bg-dark-blue" 
            type='submit'> Create an account
            </button>
          </div>
        </form>
      </div>
    )
  }
}