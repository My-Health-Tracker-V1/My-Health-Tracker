import React, { Component } from 'react';
import { login } from '../../services/auth';
import TopBar from '../shared/TopBar';
import AuthForm from '../auth/AuthForm'


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
        <AuthForm {...this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
          {/* <div className="flex flex-column items-center">
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
             <small id="password-desc" className="f6 lh-copy black-60 db mb2">
              Password must be 8 characters long.
             </small>
          </div>

          { this.state.message && 
          <div class="flex items-center justify-center pa4 bg-lightest-blue navy">
          <svg className="w1" data-icon="info" viewBox="0 0 32 32" style={{fill:"currentcolor"}}>
            <title>info icon</title>
            <path d="M16 0 A16 16 0 0 1 16 32 A16 16 0 0 1 16 0 M19 15 L13 15 L13 26 L19 26 z M16 6 A3 3 0 0 0 16 12 A3 3 0 0 0 16 6"></path>
          </svg>
            <span className="lh-title ml3">{this.state.message}</span>
          </div> } */}

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