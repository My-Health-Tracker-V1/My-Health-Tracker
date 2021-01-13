import React, { Component, useState, useEffect } from "react";

const useFoodbase = (props) => {
  const [user, setUser] = useState(props.user);
  const [date, setDate] = useState(
    props.location.state?.day || new Date().toISOString().split("T")[0]
  );
  const [tempStartTime, setTempStartTime] = useState(
    props.location.state?.element.startTime ||
      new Date().toLocaleTimeString("en-US", { hour12: false }).substring(0, 5)
  );
  const [tempIngredient, setTempIngredient] = useState({
    name: "",
    brand: "",
    category: "",
    imgUrl: "",
    servingAmount: "",
    servingSize: "",
  });
  const [food, setFood] = useState({
    startTime: "",
    name: "",
    portion: "",
    eatenPortion: "",
    imgUrl: "",
    ingredients: [],
  });
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  const [tempIngId, setTempIngId] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useState(false);
  const [handleShowSingle, setHandleShowSingle] = useState(true);
  const [query, setQuery] = useState("");
  const [errors, setErrors] = useState({});

  const capitalizeFirstLetter = (string) => {
    const splitStr = string.toLowerCase().split(" ");
    for (let i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "date") {
      setDate(value);
    } else if (name === "startTime") {
      setTempStartTime(value);
    } else if (name === "recipeName") {
      setFood((food) => ({ ...food, name: value }));
    } else if (name === "eatenPortion") {
      setFood((food) => ({ ...food, eatenPortion: value }));
    } else if (name === "portion") {
      setFood((food) => ({ ...food, portion: value }));
    } else {
      setTempIngredient((tempIngredient) => ({
        ...tempIngredient,
        [name]: value,
      }));
    }
  };

  const handleSingleValidation = () => {
    let errors = {};
    let formIsValid = true;

    if (!tempIngredient["name"]) {
      formIsValid = false;
      errors["name"] = "Food name cannot be empty";
    }
    if (!tempIngredient["servingAmount"]) {
      formIsValid = false;
      errors["servingAmount"] = "Serving amount cannot be empty";
    }
    setErrors({ errors: errors });
    return formIsValid;
  };

  return [
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
  ];
};

class FoodBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      date: props.location.state?.day || new Date().toISOString().split("T")[0],
      tempStartTime:
        props.location.state?.element.startTime ||
        new Date()
          .toLocaleTimeString("en-US", { hour12: false })
          .substring(0, 5),
      tempIngredient: {
        name: "",
        brand: "",
        category: "",
        servingAmount: "",
        servingSize: "",
      },
      food: {},
      add: false,
      edit: false,
      tempIngId: "",
      selectedIngredient: false,
      handleShowSingle: true,
      query: "",
      errors: {},
    };
  }

  capitalizeFirstLetter = (string) => {
    const splitStr = string.toLowerCase().split(" ");
    for (let i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
  };

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "date") {
      this.setState({
        date: value,
      });
    } else if (name === "startTime") {
      this.setState({
        tempStartTime: value,
      });
    } else if (name === "recipeName") {
      const newFood = this.state.food;
      newFood.name = value;
      this.setState({
        food: newFood,
      });
    } else if (name === "eatenPortion") {
      const newFood = this.state.food;
      newFood.eatenPortion = value;
      this.setState({
        food: newFood,
      });
    } else if (name === "portion") {
      const newFood = this.state.food;
      newFood.portion = value;
      this.setState({
        food: newFood,
      });
    } else {
      const newIngredient = this.state.tempIngredient;
      newIngredient[name] = value;
      this.setState({
        tempIngredient: newIngredient,
      });
    }
  };

  handleSingleValidation = () => {
    let tempIngredient = this.state.tempIngredient;
    let errors = {};
    let formIsValid = true;

    if (!tempIngredient["name"]) {
      formIsValid = false;
      errors["name"] = "Food name cannot be empty";
    }
    if (!tempIngredient["servingAmount"]) {
      formIsValid = false;
      errors["servingAmount"] = "Serving amount cannot be empty";
    }
    this.setState({ errors: errors });
    return formIsValid;
  };
}

export { useFoodbase, FoodBase };
