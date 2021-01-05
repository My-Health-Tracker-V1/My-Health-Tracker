import React, { Component } from "react";
import DashboardCard from "../shared/DashboardCard";
import Calendar from "../shared/Calendar";
import BottomNavbar from "../shared/BottomNavbar";
import axios from "axios";

export default class Dashboard extends Component {
  state = {
    day: new Date().toISOString().split("T")[0],
    user: this.props.user._id,
    isDayEmpty: true,
    energy: undefined,
    foods: [],
    drinks: [],
    exercises: [],
    sleep: [],
    symptoms: [],
  };

  setDate = async (date) => {
    await this.setState({
      day: date,
    });
    await this.getUserData();
  };

  getUserData() {
    axios
      .get(`/api/days/user/${this.props.user._id}/day/${this.state.day}`)
      .then((res) => {
        if (res.data === null) {
          this.setState({
            isDayEmpty: true,
          });
        } else {
          this.setState({
            isDayEmpty: false,
            energy: res.data.energy,
            foods: res.data.foods,
            drinks: res.data.drinks,
            exercises: res.data.exercises,
            sleep: res.data.sleep,
            symptoms: res.data.symptoms,
          });
        }
      })
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    this.getUserData();
  }

  render() {
    let allDayEntries;

    if (!this.state.isDayEmpty) {
      allDayEntries = (
        <div>
          {!this.state.energy ? (
            <></>
          ) : (
            <DashboardCard
              entryType="energy"
              energy={this.state.energy}
              user={this.state.user}
              day={this.state.day}
            />
          )}
          {this.state.symptoms.length === 0 ? (
            <></>
          ) : (
            <DashboardCard
              entryType="symptom"
              symptoms={this.state.symptoms}
              user={this.state.user}
              day={this.state.day}
            />
          )}
          {this.state.foods.length === 0 ? (
            <></>
          ) : (
            <DashboardCard
              entryType="food"
              foods={this.state.foods}
              user={this.state.user}
              day={this.state.day}
            />
          )}
          {this.state.drinks.length === 0 ? (
            <></>
          ) : (
            <DashboardCard
              entryType="drink"
              drinks={this.state.drinks}
              user={this.state.user}
              day={this.state.day}
            />
          )}
          {this.state.exercises.length === 0 ? (
            <></>
          ) : (
            <DashboardCard
              entryType="exercise"
              exercises={this.state.exercises}
              user={this.state.user}
              day={this.state.day}
            />
          )}
          {this.state.sleep.length === 0 ? (
            <></>
          ) : (
            <DashboardCard
              entryType="sleep"
              sleep={this.state.sleep}
              user={this.state.user}
              day={this.state.day}
            />
          )}
        </div>
      );
    }

    return (
      <div>
        <Calendar setDate={this.setDate} />
        <div className="flex flex-column items-center pv5">
          {this.state.isDayEmpty ? (
            <h1>No entries for this day!</h1>
          ) : (
            allDayEntries
          )}
        </div>
        <BottomNavbar />
      </div>
    );
  }
}
