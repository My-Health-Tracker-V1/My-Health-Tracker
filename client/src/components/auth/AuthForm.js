import React, { Component } from "react";

export default class AuthForm extends Component {
  render() {
    return (
      <div>
        <div className="flex flex-column items-center">
          <label className="mv1" htmlFor="email"> Email: </label>
          <input
            type="email"
            name="email"
            value={this.props.email}
            onChange={this.props.handleChange}
            id="email"
            className="mt1 mb3 w5"
          />
        </div>

        <div className="flex flex-column items-center">
          <label htmlFor="password"> Password: </label>
          <input
            type="password"
            name="password"
            value={this.props.password}
            onChange={this.props.handleChange}
            id="password"
            className="mt1 mb3 w5"
            minLength="8"
            maxLength="20"
          />
        </div>

        {this.props.message && (
          <span style={{ color: "red" }}>{this.props.message}</span>
        )}
      </div>
    );
  }
}
