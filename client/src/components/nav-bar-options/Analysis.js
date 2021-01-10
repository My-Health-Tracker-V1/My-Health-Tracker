import React, { Component } from "react";
import TopBar from "../shared/TopBar";
import BottomNavbar from "../shared/BottomNavbar";
import axios from "axios";
import { LineChart } from "react-chartkick";
import "chart.js";

export default class Analysis extends Component {
  state = {
    userOutcomes: [],
    selectedOutcome: "",
    userEvents: [],
    selectedEvent: "",
    userSpecificEvents: [],
    selectedSpecificEvent: "",
    selectedData: [],
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });

    this.getUserOptions();
  };

  getUserOptions = () => {
    axios
      .get(`/api/analysis/user/${this.props.user._id}/options`)
      .then((res) => {
        this.setState({
          userOutcomes: [...res.data.userOutcomes],
          userEvents: [...res.data.userEvents],
        });

        if (this.state.selectedEvent && this.state.selectedEvent !== "Sleep") {
          this.setState({
            userSpecificEvents: [...res.data[this.state.selectedEvent]],
          });
        }

        this.getSelectedData();
      })
      .catch((err) => console.log(err));
  };

  getSelectedData = () => {
    axios
      .get(
        `/api/analysis/user/${this.props.user._id}/selected-data/${
          this.state.selectedOutcome
        }/${this.state.selectedEvent}/${
          this.state.selectedEvent === "Sleep"
            ? "Sleep"
            : this.state.selectedSpecificEvent
        }`
      )
      .then((res) => {
        if (typeof res.data !== "string") {
          this.setState({
            selectedData: [...res.data],
          });
        } else {
          this.setState({
            selectedData: [],
          });
        }
      })
      .catch((err) => console.log(err));
  };

  componentDidMount = () => {
    this.getUserOptions();
  };

  render() {
    let chartTitle;
    let yTitle;

    if (this.state.selectedOutcome === "Energy") {
      chartTitle = "Energy Level & ";
      yTitle = "Energy Level";
    } else {
      chartTitle = this.state.selectedOutcome + " & ";
      yTitle = "Symptom Intensity";
    }

    chartTitle += this.state.selectedSpecificEvent;
    let specificEventType = "";

    switch (this.state.selectedEvent) {
      case "Foods":
        specificEventType = "food";
        yTitle += " / Food Portions";
        break;

      case "Drinks":
        specificEventType = "drink";
        yTitle += " / Drink Portions";
        break;

      case "Exercise":
        specificEventType = "exercise";
        yTitle += " / Duration";
        break;

      default:
        chartTitle = chartTitle.split("&")[0] + "& Sleep";
        yTitle += " / Duration";
    }

    return (
      <div>
        <TopBar icon="analysis" title="Analysis" />

        <div className="flex flex-column items-center pt3 pb5">
          <div className="flex items-center">
            <label className="f6 w3 dib gray" htmlFor="selectedOutcome">
              Outcome:
            </label>
            <select
              className="f6 pa1 mr3 ml1 w4 mv1"
              name="selectedOutcome"
              id="selectedOutcome"
              onChange={this.handleChange}
              value={this.state.selectedOutcome}
            >
              {this.state.userOutcomes.map((option) => {
                return (
                  <option value={option} className="f6">
                    {option}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex items-center">
            <label className="f6 w3 dib gray" htmlFor="selectedEvent">
              Event:
            </label>
            <select
              className="f6 pa1 mr3 ml1 w4 mv1"
              name="selectedEvent"
              id="selectedEvent"
              onChange={this.handleChange}
              value={this.state.selectedEvent}
            >
              {this.state.userEvents.map((option) => {
                return (
                  <option value={option} className="f6">
                    {option}
                  </option>
                );
              })}
            </select>
          </div>

          {this.state.selectedEvent === "Sleep" ||
          this.state.selectedEvent === "Select" ||
          !this.state.selectedEvent ? (
            <></>
          ) : (
            <div className="flex items-center">
              <label className="f6 w3 dib gray" htmlFor="selectedSpecificEvent">
                Select {specificEventType}:
              </label>
              <select
                className="f6 pa1 mr3 ml1 w4 mv1"
                name="selectedSpecificEvent"
                id="selectedSpecificEvent"
                onChange={this.handleChange}
                value={this.state.selectedSpecificEvent}
              >
                {this.state.userSpecificEvents.map((option) => {
                  return (
                    <option value={option} className="f6">
                      {option}
                    </option>
                  );
                })}
              </select>
            </div>
          )}

          {this.state.selectedData.length === 0 ||
          this.state.selectedOutcome === "Select" ||
          this.state.selectedEvent === "Select" ||
          this.state.selectedSpecificEvent === "Select" ? (
            <></>
          ) : (
            <div>
              <h3 className="pt1">{chartTitle}</h3>
              <LineChart
                data={this.state.selectedData}
                xtitle="Time"
                ytitle={yTitle}
                height="50vh"
                legend="bottom"
              />
            </div>
          )}
        </div>

        <BottomNavbar />
      </div>
    );
  }
}
