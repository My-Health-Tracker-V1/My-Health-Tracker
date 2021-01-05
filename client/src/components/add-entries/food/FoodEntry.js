import axios from "axios";
import React from "react";
import TopBar from "../../shared/TopBar";
import BottomNavbar from "../../shared/BottomNavbar";
import DateTimeInput from "../helper-components/DateTimeInput";
import DataList from "../helper-components/DataList";
import SearchField from "../helper-components/SearchField";
import IngrForm from "./IngrForm";
import RepForm from "./RepForm";
import FoodBase from "./FoodBase";
import "./FoodEntry.css";

export default class FoodEntry extends FoodBase {
  constructor(props) {
    super(props);
    this.state.food = {
      startTime:
        this.props.location.state?.element.startTime ||
        new Date()
          .toLocaleTimeString("en-US", { hour12: false })
          .substring(0, 5),
      name: "",
      portion: "",
      eatenPortion: "",
      ingredients: [],
    };
    this.state.ingredients = [];
    this.state.recipes = [];
    this.state.editing = false;
  }

  // API

  componentDidMount = () => {
    this.getIngredientsFromEdamam();
    this.getRecipeFromEdamam();
  };

  getIngredientsFromEdamam = () => {
    axios
      .get(
        `https://api.edamam.com/api/food-database/v2/parser?ingr=apple&app_id=a8d04f87&app_key=9bef4ef3849ca36424acf675dc4bde39`
      )
      .then((res) => {
        this.setState({
          ingredients: res.data.hints.map((hint) => hint.food),
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  getRecipeFromEdamam = () => {
    axios
      .get(
        "https://api.edamam.com/search?q=chicken&app_id=94c8109f&app_key=9368a28ab0cd2aa9f4ecde91644867cf"
      )
      .then((res) => {
        this.setState({
          recipes: res.data.hits.map((hit) => {
            return { ...hit.recipe, healthLabels: hit.recipe.healthLabels[0] };
          }),
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  apiFormat = (apiObj) => {
    return {
      name: apiObj.text,
      servingAmount: apiObj.weight,
      servingSize: "g",
    };
  };

  // populate ingredient data to ingredient form
  handleClick = (event) => {
    event.preventDefault();
    const key = event.target.getAttribute("data-key");
    this.setState((state) => {
      const clickedIngr = state.ingredients.find(
        (ingredient) => ingredient.foodId === key
      );
      return {
        tempIngredient: {
          ...state.tempIngredient,
          name: clickedIngr.label,
          brand: clickedIngr.brand,
          category: clickedIngr.category,
        },
      };
    });
  };

  // populate recipe data to recipe form
  handleClickRecipe = (event) => {
    event.preventDefault();
    const key = event.target.getAttribute("data-key");
    this.setState((state) => {
      const clickedRecipe = state.recipes.find((recipe) => recipe.uri === key);
      return {
        food: {
          ...state.food,
          name: clickedRecipe.label,
          portion: clickedRecipe.yield,
          category: clickedRecipe.healthLabels,
          ingredients: clickedRecipe.ingredients.map(this.apiFormat),
        },
      };
    });
  };

  // Handle search bar
  handleSearch = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  };

  // Handle query
  handleQuery = (event) => {
    event?.preventDefault();
    axios
      .get(
        `https://api.edamam.com/api/food-database/v2/parser?ingr=${this.state.query}&app_id=a8d04f87&app_key=9bef4ef3849ca36424acf675dc4bde39`
      )
      .then((res) => {
        this.setState({
          query: event.target.value,
          ingredients: res.data.hints.map((hint) => hint.food),
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  handleRecipeQuery = (event) => {
    event?.preventDefault();
    axios
      .get(
        `https://api.edamam.com/search?q=${this.state.recipeQuery}&app_id=94c8109f&app_key=9368a28ab0cd2aa9f4ecde91644867cf`
      )
      .then((res) => {
        this.setState({
          recipeQuery: event.target.value,
          recipes: res.data.hits.map((hit) => {
            return { ...hit.recipe, healthLabels: hit.recipe.healthLabels[0] };
          }),
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  // Toggle Recipe
  toggleRecipe = () => {
    this.setState({
      handleShowSingle: false,
    });
  };

  toggleSingle = () => {
    this.setState({
      handleShowSingle: true,
    });
  };

  handleRecipeValidation = () => {
    let food = this.state.food;
    let errors = {};
    let formIsValid = true;

    if (!food["name"]) {
      formIsValid = false;
      errors["name"] = "Food name cannot be empty";
    }
    if (food["eatenPortion"] === "") {
      formIsValid = false;
      errors["eatenPortion"] = "Your portion cannot be empty";
    }
    this.setState({ errors: errors });
    return formIsValid;
  };

  // Submit Single form
  handleSingleSubmit = (event) => {
    event.preventDefault();
    if (this.handleSingleValidation()) {
      this.setState(
        (state) => {
          return {
            food: {
              ...state.food,
              ingredients: [state.tempIngredient],
              name: this.capitalizeFirstLetter(state.tempIngredient.name),
              portion: 1,
              eatenPortion: 1,
              startTime: state.tempStartTime,
            },
          };
        },
        () => {
          const payload = {
            user: this.state.user,
            date: this.state.date,
            food: this.state.food,
          };
          axios
            .post(
              `/api/ingredients/user/${this.props.user._id}/day/${this.state.date}`,
              payload
            )
            .then(() => {
              this.props.history.push("/dashboard");
            })
            .catch((err) => console.log(err));
        }
      );
    } else {
      console.log("validation failed");
    }
  };

  // Submit Recipe form
  handleRecipeSubmit = (event) => {
    event.preventDefault();
    if (this.handleRecipeValidation()) {
      this.setState(
        (state) => {
          return {
            food: {
              ...state.food,
              name: this.capitalizeFirstLetter(state.food.name),
              startTime: state.tempStartTime,
            },
          };
        },
        () => {
          const payload = {
            user: this.state.user,
            date: this.state.date,
            food: this.state.food,
          };
          axios
            .post(
              `/api/ingredients/user/${this.props.user._id}/day/${this.state.date}`,
              payload
            )
            .then(() => {
              this.props.history.push("/dashboard");
            })
            .catch((err) => console.log(err));
        }
      );
    }
  };

  render() {
    let dataComponent, formComponent, searchField, title;
    if (this.state.handleShowSingle) {
      dataComponent = (
        <DataList
          data={this.state.ingredients}
          img="image"
          heading="label"
          subtitle="category"
          key="foodId"
          dataKey="foodId"
          handleClick={this.handleClick}
        />
      );
      formComponent = (
        <IngrForm
          {...this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleSingleSubmit}
        />
      );
      searchField = (
        <SearchField
          handleSearch={this.handleSearch}
          handleQuery={this.handleQuery}
          query={this.state.query}
          placeholder="Ingredients in your dish..."
        />
      );
      title = <h4>Suggested Foods</h4>;
    } else {
      dataComponent = (
        <DataList
          data={this.state.recipes}
          img="image"
          heading="label"
          subtitle="healthLabels"
          key="uri"
          dataKey="uri"
          handleClick={this.handleClickRecipe}
        />
      );
      formComponent = (
        <RepForm
          {...this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleRecipeSubmit}
        />
      );
      searchField = (
        <SearchField
          handleSearch={this.handleSearch}
          handleQuery={this.handleRecipeQuery}
          query={this.state.query}
          placeholder="Find your recipe..."
        />
      );
      title = <h4>Suggested Recipes</h4>;
    }

    return (
      <div>
        <TopBar title="Foods" icon="Foods" />
        <div className="pt3 pb6">
          <DateTimeInput
            startTime={this.state.tempStartTime}
            date={this.state.date}
            handleChange={this.handleChange}
          />
          <button
            className="f6 link dim br4 ph2 pv1 mb2 dib white bg-dark-blue"
            onClick={this.toggleSingle}
          >
            {" "}
            + Add a single food
          </button>
          <button
            className="f6 link dim br4 ph3 pv1 mb2 dib white bg-dark-blue"
            onClick={this.toggleRecipe}
          >
            {" "}
            + Add a recipe
          </button>
          <div>
            {title}
            {searchField}
            {dataComponent}
            {formComponent}
          </div>
        </div>
        <BottomNavbar />
      </div>
    );
  }
}
