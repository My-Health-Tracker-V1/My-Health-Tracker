import React, { Component } from "react";
import axios from "axios";
import TopBar from "../../shared/TopBar";
import BottomNavbar from "../../shared/BottomNavbar";
import SearchField from "../helper-components/SearchField";
import DrinkIngrForm from "./DrinkIngrForm";
import DateTimeInput from "../helper-components/DateTimeInput";
import DataList from "../helper-components/DataList";
import { SelectRow } from "../helper-components/Rows";

export default class AddDrinks extends Component {
  state = {
    user: this.props.user,
    date:
      this.props.location.state?.day || new Date().toISOString().split("T")[0],
    startTime:
      this.props.location.state?.element.startTime ||
      new Date().toLocaleTimeString("en-US", { hour12: false }).substring(0, 5),
    name: this.props.location.state?.element.drinks[0].name,
    category: this.props.location.state?.element.drinks[0].category,
    servingAmount: this.props.location.state?.element.drinks[0].servingAmount,
    servingSize: this.props.location.state?.element.drinks[0].servingSize,
    imgUrl: "",
    drinks: [],
    query: "",
    apiCategory: "",
    editing: false,
    errors: {},
  };

  // API
  getDrinksFromApi = (alcoholic) => {
    axios
      .get(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${alcoholic}`
      )
      .then((res) => {
        this.setState({
          drinks: res.data.drinks,
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  componentDidMount = () => {
    this.getDrinksFromApi("Alcoholic");
  };

  handleQuery = (event) => {
    event?.preventDefault();
    axios
      .get(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${this.state.query}`
      )
      .then((res) => {
        this.setState({
          query: event.target.value,
          drinks: res.data.drinks,
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  handleClick = (event) => {
    event.preventDefault();
    const key = event.target.getAttribute("data-key");
    const clickedDrink = this.state.drinks.find(
      (drink) => drink.idDrink === key
    );
    this.setState({
      name: clickedDrink.strDrink,
      imgUrl: clickedDrink.strDrinkThumb
    });
  };

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };

  handleSelectCategory = (event) => {
    event?.preventDefault();
    let prefix;
    const apiCategory = event.target.value;
    if (apiCategory === "Alcoholic" || apiCategory === "Non_Alcoholic")
      prefix = "a";
    if (apiCategory === "Ordinary_Drink" || apiCategory === "Cocktail")
      prefix = "c";
    axios
      .get(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?${prefix}=${apiCategory}`
      )
      .then((res) => {
        this.setState({
          apiCategory: apiCategory,
          drinks: res.data.drinks,
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  handleDrinkValidation = () => {
    let name = this.state.name;
    let servingAmount = this.state.servingAmount;
    let errors = {};
    let formIsValid = true;

    if (!name) {
      formIsValid = false;
      errors["name"] = "Drink name cannot be empty";
    }
    if (!servingAmount) {
      formIsValid = false;
      errors["servingAmount"] = "Serving amount cannot be empty";
    }
    this.setState({ errors: errors });
    return formIsValid;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.handleDrinkValidation()) {
      const payload = this.state;
      axios
        .post(
          `/api/drinks/user/${this.props.user._id}/day/${this.state.date}`,
          payload
        )
        .then(() => {
          this.setState({
            date: "",
            startTime: "",
            servingAmount: "",
            servingSize: "",
            name: "",
            category: "",
          });
          this.props.history.push("/dashboard");
        })
        .catch((err) => console.log(err));
    }
  };

  render() {
    const options = [
      "Alcoholic",
      "Non_Alcoholic",
      "Ordinary_Drink",
      "Cocktail",
    ];
    return (
      <div>
        <TopBar title="Drinks" icon="Drinks" />
        <div className="pt3 pb6">
          <DateTimeInput
            date={this.state.date}
            startTime={this.state.startTime}
            handleChange={this.handleChange}
          />
          <SelectRow
            options={options}
            title="Category: "
            id="apiCategory"
            name="apiCategory"
            value={this.state.apiCategory}
            handleChange={this.handleSelectCategory}
          />
          <SearchField
            query={this.state.query}
            handleSearch={this.handleChange}
            handleQuery={this.handleQuery}
            placeholder="Margarita..."
          />
          <DataList
            data={this.state.drinks}
            img="strDrinkThumb"
            heading="strDrink"
            key="idDrink"
            dataKey="idDrink"
            handleClick={this.handleClick}
          />
          <h3 className="f6 db">Add a drink</h3>
          <DrinkIngrForm
            {...this.state}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleClick={this.handleClick}
          />
        </div>
        <BottomNavbar />
      </div>
    );
  }
}
