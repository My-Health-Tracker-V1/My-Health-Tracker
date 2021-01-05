import React, { Component } from "react";
import axios from "axios";
import DrinkIngrForm from "./DrinkIngrForm";
import TopBar from "../../shared/TopBar";
import BottomNavbar from "../../shared/BottomNavbar";
import DateTimeInput from "../helper-components/DateTimeInput";

export default class DrinkEdit extends Component {
  state = {
    user: this.props.user,
    date:
      this.props.location.state?.day || new Date().toISOString().split("T")[0],
    startTime:
      this.props.location.state?.element.startTime ||
      new Date().toLocaleTimeString("en-US", { hour12: false }).substring(0, 5),
    drink: this.props.location.state.element,
    drinkId: this.props.location.state.element._id,
    name: this.props.location.state.element.name,
    category: this.props.location.state.element.category,
    servingAmount: this.props.location.state.element.servingAmount,
    servingSize: this.props.location.state.element.servingSize,
    drinks: [],
    query: "",
    apiCategory: "",
    editing: true,
  };

  handleDeleteDrink = (event) => {
    event?.preventDefault();
    const drinkId = event.target.getAttribute("data-key");
    axios
      .put(
        `/api/drinks/user/${this.state.user._id}/day/${this.state.date}/${drinkId}/delete`
      )
      .then((res) => {
        this.props.history.push("/dashboard");
      })
      .catch((err) => console.log(err));
  };

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  };

  handleEditDrink = (event) => {
    event.preventDefault();
    this.setState((state) => {
      return {
        drink: {
          ...state.drink,
          name: state.name,
          category: state.category,
          servingAmount: state.servingAmount,
          servingSize: state.servingSize,
          startTime: state.startTime,
        },
      };
    });
    const payload = {
      user: this.state.user,
      date: this.state.date,
      drink: this.state.drink,
    };
    axios
      .put(
        `/api/drinks/user/${this.state.user._id}/day/${this.state.date}/${this.state.drinkId}/edit`,
        payload
      )
      .then(() => {
        this.props.history.push("/dashboard");
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <TopBar title="Drinks" icon="Drinks" />
        <div className="pt3 pb6">
          <DateTimeInput
            date={this.state.date}
            startTime={this.state.startTime}
            handleChange={this.handleChange}
          />
          <div className="mw6 center">
            <h3 className="f6 db">What did you drink?</h3>
            <DrinkIngrForm
              {...this.state}
              handleChange={this.handleChange}
              handleDeleteDrink={this.handleDeleteDrink}
              handleEditDrink={this.handleEditDrink}
            />
          </div>
        </div>
        <BottomNavbar />
      </div>
    );
  }
}
