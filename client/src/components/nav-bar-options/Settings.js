import React from "react";
import { logout } from "../../services/auth";
import { Link } from "react-router-dom";
import TopBar from "../shared/TopBar";
import BottomNavbar from "../shared/BottomNavbar";
import Icons from "../shared/Icons";
import axios from "axios";

export default class Settings extends React.Component {
  
  state = {
    newEmail: "",
    newPassword: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event?.preventDefault();

    const { newEmail, newPassword } = this.state;

    axios
      .put(`/api/users/${this.props.user._id}`, {
        data: [newEmail, newPassword],
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  handleLogout = () => {
    logout().then(() => {
      this.props.setUser(null);
    });
  };

  render() {
    return (
      <div>
        <TopBar icon="settings" title="Settings" />

        <form
          onSubmit={this.handleSubmit}
          className="flex flex-column items-center"
          action="POST"
        >
          <label className="f6 mt3" htmlFor="new-email">
            New email:
          </label>
          <input
            className="mb2"
            id="new-email"
            name="newEmail"
            onChange={this.handleChange}
            value={this.state.newEmail}
            type="text"
          />
          <label className="f6 mt3" htmlFor="newPassword">
            New password:
          </label>
          <input
            className="mb2"
            id="new-password"
            name="newPassword"
            onChange={this.handleChange}
            value={this.state.newPassword}
            type="text"
          />
          <button
            className="f6 w4 dim ph3 pv2 mt3 dib white bg-dark-green br-pill b--dark-green"
            type="submit"
          >
            Update
          </button>
        </form>

        <Link to="/" onClick={() => this.handleLogout()}>
          <div className="blue pt5">
            <Icons icon="logout" />
          </div>
          <p className="f6 w4 dim ph3 pv2 mt3 dib white bg-dark-blue br-pill b--dark-blue">
            Logout
          </p>
        </Link>

        <BottomNavbar />
      </div>
    );
  }
}
