import axios from "axios";
import React, { useState, useEffect } from "react";
import TopBar from "../../shared/TopBar";
import BottomNavbar from "../../shared/BottomNavbar";
import DateTimeInput from "../helper-components/DateTimeInput";
import DataList from "../helper-components/DataList";
import SearchField from "../helper-components/SearchField";
import IngrForm from "./IngrForm";
import RepForm from "./RepForm";
import { useFoodbase } from "./FoodBase";
import "./FoodEntry.css";

export default function FoodEntry(props) {
  const [
    user,
    setUser,
    date,
    setDate,
    tempStartTime,
    setTempStartTime,
    tempIngredient,
    setTempIngredient,
    food,
    setFood,
    add,
    setAdd,
    edit,
    setEdit,
    tempIngId,
    setTempIngId,
    selectedIngredient,
    setSelectedIngredient,
    handleShowSingle,
    setHandleShowSingle,
    query,
    setQuery,
    errors,
    setErrors,
    handleChange,
    handleSingleValidation,
    capitalizeFirstLetter,
  ] = useFoodbase(props);

  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [editing, setEditing] = useState(false);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (submit && handleShowSingle) {
      setSubmit(false);
      const payload = {
        user: user,
        date: date,
        food: food,
      };
      axios
        .post(`/api/ingredients/user/${props.user._id}/day/${date}`, payload)
        .then(() => {
          props.history.push("/dashboard");
        })
        .catch((err) => console.log(err));
    }

    if (submit && !handleShowSingle) {
      setSubmit(false);
      const payload = {
        user: user,
        date: date,
        food: food,
      };
      axios
        .post(`/api/ingredients/user/${props.user._id}/day/${date}`, payload)
        .then(() => {
          props.history.push("/dashboard");
        })
        .catch((err) => console.log(err));
    }
  }, [food]);

  const getIngredientsFromEdamam = () => {
    axios
      .get(
        `https://api.edamam.com/api/food-database/v2/parser?ingr=apple&app_id=a8d04f87&app_key=9bef4ef3849ca36424acf675dc4bde39`
      )
      .then((res) => {
        setIngredients(res.data.hints.map((hint) => hint.food));
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const getRecipeFromEdamam = () => {
    axios
      .get(
        "https://api.edamam.com/search?q=chicken&app_id=94c8109f&app_key=9368a28ab0cd2aa9f4ecde91644867cf"
      )
      .then((res) => {
        setRecipes(
          res.data.hits.map((hit) => {
            return { ...hit.recipe, healthLabels: hit.recipe.healthLabels[0] };
          })
        );
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    getIngredientsFromEdamam();
    getRecipeFromEdamam();
  }, []);

  const apiFormat = (apiObj) => {
    return {
      name: apiObj.text,
      servingAmount: apiObj.weight,
      imgUrl: apiObj.image,
      servingSize: "g",
    };
  };

  const handleClick = (event) => {
    event.preventDefault();
    const key = event.target.getAttribute("data-key");
    const clickedIngr = ingredients.find(
      (ingredient) => ingredient.foodId === key
    );
    setTempIngredient({
      ...tempIngredient,
      name: clickedIngr.label,
      brand: clickedIngr.brand,
      category: clickedIngr.category,
      imgUrl: clickedIngr.image,
    });
  };

  const handleClickRecipe = (event) => {
    event.preventDefault();
    const key = event.target.getAttribute("data-key");
    const clickedRecipe = recipes.find((recipe) => recipe.uri === key);
    setFood({
      ...food,
      name: clickedRecipe.label,
      portion: clickedRecipe.yield,
      category: clickedRecipe.healthLabels,
      imgUrl: clickedRecipe.image,
      ingredients: clickedRecipe.ingredients.map(apiFormat),
    });
  };

  const handleSearch = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
  };

  const handleQuery = (event) => {
    event?.preventDefault();
    axios
      .get(
        `https://api.edamam.com/api/food-database/v2/parser?ingr=${query}&app_id=a8d04f87&app_key=9bef4ef3849ca36424acf675dc4bde39`
      )
      .then((res) => {
        // don't need this
        setQuery(event.target.value);
        setIngredients(res.data.hints.map((hint) => hint.food));
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleRecipeQuery = (event) => {
    event?.preventDefault();
    axios
      .get(
        `https://api.edamam.com/search?q=${query}&app_id=94c8109f&app_key=9368a28ab0cd2aa9f4ecde91644867cf`
      )
      .then((res) => {
        setQuery(event.target.value);
        setRecipes(
          res.data.hits.map((hit) => {
            return { ...hit.recipe, healthLabels: hit.recipe.healthLabels[0] };
          })
        );
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const toggleRecipe = () => {
    setHandleShowSingle(false);
  };

  const toggleSingle = () => {
    setHandleShowSingle(true);
  };

  const handleRecipeValidation = () => {
    let formIsValid = true;

    if (!food["name"]) {
      formIsValid = false;
      errors["name"] = "Food name cannot be empty";
    }
    if (food["eatenPortion"] === "") {
      formIsValid = false;
      errors["eatenPortion"] = "Your portion cannot be empty";
    }
    setErrors(errors);
    return formIsValid;
  };

  const handleSingleSubmit = (event) => {
    event.preventDefault();
    if (handleSingleValidation()) {
      setSubmit(true);
      setFood({
        ...food,
        ingredients: [tempIngredient],
        name: capitalizeFirstLetter(tempIngredient.name),
        portion: 1,
        eatenPortion: 1,
        startTime: tempStartTime,
        imgUrl: tempIngredient.imgUrl,
      });
    } else {
      props.history.push("/add/Foods");
    }
  };

  const handleRecipeSubmit = (event) => {
    event.preventDefault();
    if (handleRecipeValidation()) {
      setSubmit(true);
      setFood({
        ...food,
        name: capitalizeFirstLetter(food.name),
        startTime: tempStartTime,
        imgUrl: food.imgUrl,
      });
    } else {
      props.history.push("/add/Foods");
    }
  };

  let dataComponent, formComponent, searchField, title;
  if (handleShowSingle) {
    dataComponent = (
      <DataList
        data={ingredients}
        img="image"
        heading="label"
        subtitle="category"
        key="foodId"
        dataKey="foodId"
        handleClick={handleClick}
      />
    );
    formComponent = (
      <IngrForm
        add={add}
        tempIngredient={tempIngredient}
        errors={errors}
        edit={edit}
        editing={editing}
        handleChange={handleChange}
        handleSubmit={handleSingleSubmit}
      />
    );
    searchField = (
      <SearchField
        handleSearch={handleSearch}
        handleQuery={handleQuery}
        query={query}
        placeholder="Ingredients in your dish..."
      />
    );
    title = <h4>Suggested Foods</h4>;
  } else {
    dataComponent = (
      <DataList
        data={recipes}
        img="image"
        heading="label"
        subtitle="healthLabels"
        key="uri"
        dataKey="uri"
        handleClick={handleClickRecipe}
      />
    );
    formComponent = (
      <RepForm
        add={add}
        food={food}
        tempIngredient={tempIngredient}
        errors={errors}
        edit={edit}
        editing={editing}
        handleChange={handleChange}
        handleSubmit={handleRecipeSubmit}
      />
    );
    searchField = (
      <SearchField
        handleSearch={handleSearch}
        handleQuery={handleRecipeQuery}
        query={query}
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
          startTime={tempStartTime}
          date={date}
          handleChange={handleChange}
        />
        <button
          className="f6 link dim br4 ph2 pv1 mb2 dib white bg-dark-blue"
          onClick={toggleSingle}
        >
          {" "}
          + Add a single food
        </button>
        <button
          className="f6 link dim br4 ph3 pv1 mb2 dib white bg-dark-blue"
          onClick={toggleRecipe}
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
