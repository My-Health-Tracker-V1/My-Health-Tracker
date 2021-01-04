import React, { Component } from 'react';
import { login } from '../../services/auth';
import TopBar from '../shared/TopBar';


export default class Login extends Component {
  state = {
    email: '',
    password: '',
    message: ''
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    login(email, password).then(data => {
      if (data.message) {
        this.setState({
          message: data.message,
          email: '',
          password: ''
        });
      } else {
        this.props.setUser(data);
        this.props.history.push('/dashboard');
      }
    });
  };

  render() {
    return (
      <div>
      <TopBar icon='health-icon' title='My Health Diary'/>
        <form onSubmit={this.handleSubmit} className="pt5 flex flex-column">
          <div className="flex flex-column items-center">
              <label className="mv1" htmlFor='email'> Email: </label>
              <input
                type='text'
                name='email'
                value={this.state.email}
                onChange={this.handleChange}
                id='email'
                className="mt1 mb3 w5"
              />
          </div>
         
          <div className="flex flex-column items-center">
            <label htmlFor='password'> Password: </label>
            <input
              type='password'
              name='password'
              value={this.state.password}
              onChange={this.handleChange}
              id='password'
              className="mt1 mb3 w5"
            />
          </div>

          <div className="w-100 pa3 mr2">
            <button className="f6 link dim br-pill ph3 pv2 mb2 dib white bg-dark-blue" 
                    type='submit'> Login 
            </button>
          </div>
        </form>
      </div>
    );
  }
}