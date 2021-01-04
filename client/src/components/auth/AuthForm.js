import React, { Component } from 'react'

export default class AuthForm extends Component {
  render() {
    return (
      <div>
        <div className="flex flex-column items-center">
              <label className="mv1" htmlFor='email'> Email: </label>
              <input
                type='text'
                name='email'
                value={this.props.email}
                onChange={this.props.handleChange}
                id='email'
                className="mt1 mb3 w5"
              />
          </div>
         
          <div className="flex flex-column items-center">
            <label htmlFor='password'> Password: </label>
            <input
              type='password'
              name='password'
              value={this.props.password}
              onChange={this.props.handleChange}
              id='password'
              className="mt1 mb3 w5"
            />
             <small id="password-desc" className="f6 lh-copy black-60 db mb2">
              Password must be 8 characters long.
             </small>
          </div>

          { this.props.message && 
          <div className="flex items-center justify-center pa4 bg-lightest-blue navy">
          <svg className="w1" data-icon="info" viewBox="0 0 32 32" style={{fill:"currentcolor"}}>
            <title>info icon</title>
            <path d="M16 0 A16 16 0 0 1 16 32 A16 16 0 0 1 16 0 M19 15 L13 15 L13 26 L19 26 z M16 6 A3 3 0 0 0 16 12 A3 3 0 0 0 16 6"></path>
          </svg>
            <span className="lh-title ml2 f6">{this.props.message}</span>
          </div> }
      </div>
    )
  }
}
