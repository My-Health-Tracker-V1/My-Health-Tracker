import axios from "axios";
import React, { Component } from "react";
import TopBar from "../../shared/TopBar";
import BottomNavbar from "../../shared/BottomNavbar";
import DateTimeInput from "../helper-components/DateTimeInput";
import RepForm from "./RepForm";
import FoodBase from "./FoodBase";

export default class FoodEdit extends FoodBase {
  constructor(props) {
    super(props);
    this.state.food = props.location.state.element;
    this.state.editing = true;
  }

  editIngrSave = (event) => {
    event.preventDefault();
    this.setState((state) => {
      state.food.ingredients.splice(state.tempIngIdx, 1, state.tempIngredient);
      return {
        food: state.food,
        edit: false,
        tempIngredient: {
          name: "",
          brand: "",
          category: "",
          servingAmount: "",
          servingSize: "",
        },
      };
    });
  };

  addNewIngrSave = (event) => {
    event.preventDefault();
    this.setState((state) => {
      return {
        food: {
          ...state.food,
          ingredient: state.food.ingredients.push(state.tempIngredient),
        },
        add: false,
      };
    });
  };

  editRecipeSubmit = (event) => {
    event.preventDefault();
    const payload = {
      user: this.state.user,
      date: this.state.date,
      food: this.state.food,
    };
    axios
      .put(
        `/api/ingredients/user/${this.props.user._id}/day/${this.state.date}/${this.state.food._id}/edit`,
        payload
      )
      .then(() => {
        this.props.history.push("/dashboard");
      })
      .catch((err) => console.log(err));
  };

  // delete
  handleDeleteIngredient = (event) => {
    event?.preventDefault();
    const ingIdx = event.target.getAttribute("data-key");
    this.setState((state) => {
      state.food.ingredients.splice(ingIdx, 1);
      return { food: state.food };
    });
  };

  handleDeleteFood = (event) => {
    event?.preventDefault();
    const foodId = event.target.getAttribute("data-key");
    axios
      .put(
        `/api/ingredients/user/${this.state.user._id}/day/${this.state.date}/${foodId}/delete`
      )
      .then((res) => {
        this.props.history.push("/dashboard");
      })
      .catch((err) => console.log(err));
  };

  toggleAddIngr = (event) => {
    event?.preventDefault();
    this.setState({
      add: true,
      tempIngredient: {
        name: "",
        brand: "",
        category: "",
        servingAmount: "",
        servingSize: "",
      },
    });
  };

  toggleEditIngr = (event) => {
    event?.preventDefault();
    const ingIdx = event.target.getAttribute("data-key");
    this.setState((state) => {
      return {
        edit: true,
        tempIngredient: Object.assign({}, state.food.ingredients[ingIdx]),
        tempIngIdx: ingIdx,
      };
    });
  };

  render() {
    return (
      <div>
        <TopBar icon="Foods" title="Your Foods" />
        <div className="pb5">
          <DateTimeInput
            startTime={this.state.tempStartTime}
            date={this.state.date}
            handleChange={this.handleChange}
          />
          <div className="mw6 center">
            <RepForm
              {...this.state}
              handleChange={this.handleChange}
              editRecipeSubmit={this.editRecipeSubmit}
              handleDeleteIngredient={this.handleDeleteIngredient}
              handleDeleteFood={this.handleDeleteFood}
              toggleAddIngr={this.toggleAddIngr}
              toggleEditIngr={this.toggleEditIngr}
              editIngrSave={this.editIngrSave}
              addNewIngrSave={this.addNewIngrSave}
            />
          </div>
        </div>
        <BottomNavbar />
      </div>
    );
  }
}
