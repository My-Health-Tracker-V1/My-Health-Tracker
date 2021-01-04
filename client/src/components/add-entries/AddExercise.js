import React, { Component } from "react";
import TopBar from "../shared/TopBar";
import BottomNavbar from "../shared/BottomNavbar";
import axios from "axios";

export default class AddExercise extends Component {
  state = {
    startDate:
      this.props.location.state?.day || new Date().toISOString().split("T")[0],
    startTime:
      this.props.location.state?.element.startTime ||
      new Date().toLocaleTimeString("en-US", { hour12: false }).substring(0, 5),
    name: this.props.location.state?.element.name,
    intensityLevel: this.props.location.state?.element.intensityLevel,
    duration: this.props.location.state?.element.duration,
    id: this.props.location.state?.element._id,
    editing: this.props.location.state?.editing,
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event?.preventDefault();

    const exerciseEntry = this.state;

    axios
      .post(
        `/api/exercise/user/${this.props.user._id}/day/${this.state.startDate}`,
        exerciseEntry
      )
      .then((res) => {
        this.props.history.push("/dashboard");
      })
      .catch((err) => console.log(err));
  };

  handleDelete = (event) => {
    event?.preventDefault();

    const exerciseToDeleteId = this.state.id;

    axios
      .delete(
        `/api/exercise/user/${this.props.user._id}/day/${this.state.startDate}`,
        { params: exerciseToDeleteId }
      )
      .then((res) => {
        this.props.history.push("/dashboard");
      })
      .catch((err) => console.log(err));
  };

  handleEditing = (event) => {
    event?.preventDefault();

    const updatedExercise = this.state;

    axios
      .put(
        `/api/exercise/user/${this.props.user._id}/day/${this.state.startDate}`,
        { data: updatedExercise }
      )
      .then((res) => {
        this.props.history.push("/dashboard");
      })
      .catch((err) => console.log(err));
  };

  render() {
    const nameOptions = [
      "Choose an option",
      "Aerobics",
      "Baseball",
      "Boxing",
      "Climbing",
      "Cycling",
      "Dancing",
      "Diving",
      "Football",
      "Golf",
      "Hiking",
      "Hockey",
      "Martial Arts",
      "Rowing",
      "Rugby",
      "Running",
      "Skiing",
      "Softball",
      "Swimming",
      "Tennis",
      "Volleyball",
      "Walking",
      "Weights",
      "Yoga",
      "Other",
    ];

    return (
      <div className="flex flex-column">
        <TopBar title="Exercise" icon="Exercise" />

        <div className="flex flex-column items-center">
          <form
            onSubmit={
              this.state.editing ? this.handleEditing : this.handleSubmit
            }
            className="flex flex-column items-center"
            action="POST"
          >
            <label htmlFor="start-date" className="f6 mt3">
              Date:
            </label>
            <input
              onChange={this.handleChange}
              value={this.state.startDate}
              type="date"
              id="start-date"
              name="startDate"
              className="mb2"
            />

            <label htmlFor="start-time" className="f6 mt3">
              Time:
            </label>
            <input
              onChange={this.handleChange}
              value={this.state.startTime}
              type="time"
              id="start-date"
              name="startTime"
              className="mb2"
            />

            <label htmlFor="name" className="f6 mt3">
              Name:
            </label>
            <select
              name="name"
              id="name"
              onChange={this.handleChange}
              value={this.state.name}
              className="f6 mt1"
            >
              {nameOptions.map((option) => {
                return (
                  <option value={option} className="f6">
                    {option}
                  </option>
                );
              })}
            </select>

            <label htmlFor="intensityLevel" className=" f6 mt3">
              Intensity:
            </label>
            <input
              onChange={this.handleChange}
              value={this.state.intensityLevel}
              type="range"
              name="intensityLevel"
              min="1"
              max="10"
              className="mt1 mb3"
            />

            <div className="f6 mt2">
              <label htmlFor="duration" className="f6 mt3">
                Duration:{" "}
              </label>
              <input
                onChange={this.handleChange}
                value={this.state.duration}
                type="number"
                id="duration"
                name="duration"
                min="0"
                max="24"
                className="mb2 w3"
              />
              <span> hrs</span>
            </div>

            <button
              type="submit"
              className="f6 w4 dim ph3 pv2 mt3 dib white bg-dark-blue br-pill b--dark-blue"
            >
              Save
            </button>
          </form>

          <button
            onClick={() => this.handleDelete()}
            className="f6 w4 dim ph3 pv2 mt3 dib white bg-dark-red br-pill b--dark-red"
          >
            Delete
          </button>

          <BottomNavbar />
        </div>
      </div>
    );
  }
}
