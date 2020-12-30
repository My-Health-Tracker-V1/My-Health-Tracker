import axios from 'axios';
import React, { Component } from 'react';
import TopBar from '../../shared/TopBar';
import BottomNavbar from '../../shared/BottomNavbar';
import DateTimeInput from '../helper-components/DateTimeInput';
import SingleDb from './SingleDb';
import RecipeDb from './RecipeDb';
import SearchField from './SearchField';
import IngrForm from './IngrForm';
import RepForm from './RepForm';
import './FoodEntry.css'

export default class FoodEntry extends Component {
  state = {
    user: this.props.user,
    date: this.props.location.state?.day ||new Date().toISOString().split('T')[0],
    ingredients: [],
    recipes: [],
    tempStartTime: this.props.location.state?.element.startTime || new Date().toLocaleTimeString('en-US', { hour12: false }).substring(0,5),
    tempIngredient: {
      name: '',
      brand: '',
      category: '',
      servingAmount: '',
      servingSize: ''
    },
    food: {
      startTime: '',
      name: '',
      portion: '',
      eatenPortion: '',
      ingredients: []
    },
    selectedIngredient: false,
    handleShowSingle: true,
    ingredientCount: 0,
    query: '',
    recipeQuery: '',
    editing: false
  }

// API
  getIngredientsFromEdamam = () => {
    axios.get(`https://api.edamam.com/api/food-database/v2/parser?ingr=apple&app_id=a8d04f87&app_key=9bef4ef3849ca36424acf675dc4bde39`)
     .then(res => {
       console.log(res.data);
       this.setState({
         ingredients: res.data.hints
       })   
     })
     .catch(err => {
        console.log(err.response)
     })
  }

  getRecipeFromEdamam = () => {
    axios.get("https://api.edamam.com/search?q=chicken&app_id=94c8109f&app_key=9368a28ab0cd2aa9f4ecde91644867cf")
     .then(res => {
       console.log(res.data);
       this.setState({
         recipes: res.data.hits
       })
     })
     .catch(err => {
      console.log(err.response)
     })
  }

  componentDidMount = () => {
    this.getIngredientsFromEdamam();
    this.getRecipeFromEdamam()
  }
// Fill out the ingredient form
  handleClick = event => {
    event.preventDefault();
    const key = event.target.getAttribute('data-key')
    console.log(key);
    console.log('this.state.ingredients is:', this.state.ingredients)
    const clickedIngr = this.state.ingredients.find(ingredient => ingredient.food.foodId === key);
    const newTempIngredient = this.state.tempIngredient;
    newTempIngredient.name = clickedIngr.food.label;
    newTempIngredient.brand = clickedIngr.food.brand;
    newTempIngredient.category = clickedIngr.food.category;
    this.setState ({
      tempIngredient: newTempIngredient
    })
    console.log(this.state.tempIngredient);
  }

  apiFormat = (apiObj) => {
    return {
      name: apiObj.text,
      servingAmount: apiObj.weight,
      servingSize: 'g'
    }
  }

  handleClickRecipe = event => {
    event.preventDefault();
    const key = event.target.getAttribute('data-key')
    console.log(key);
    console.log('this.state.recipes is:', this.state.recipes)
    const clickedRecipe = this.state.recipes.find(recipe => recipe.recipe.uri === key);
    const newFood = this.state.food;
    newFood.name = clickedRecipe.recipe.label;
    newFood.portion = clickedRecipe.recipe.yield;
    newFood.category = clickedRecipe.recipe.healthLabels;
    newFood.ingredients = clickedRecipe.recipe.ingredients.map(this.apiFormat);
    this.setState ({
      food: newFood
    })
    console.log(this.state.food);
  }

  setQuery = query => {
    this.setState({
      query: query,
    })
  }
  setRecipeQuery = recipeQuery => {
    this.setState({
      recipeQuery: recipeQuery,
    })
  }

// Handle search bar
  handleSearch = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };
// Handle query
  handleQuery = (event) => {
    event?.preventDefault();
    console.log(this.state.query)
    axios.get(`https://api.edamam.com/api/food-database/v2/parser?ingr=${this.state.query}&app_id=a8d04f87&app_key=9bef4ef3849ca36424acf675dc4bde39`)
    .then(res => {
      console.log(res.data);
      this.setState({
        query: event.target.value,
        ingredients: res.data.hints
      })   
    })
    .catch(err => {
      console.log(err.response)
    })
  }
  handleRecipeQuery = (event) => {
    event?.preventDefault();
    console.log(this.state.recipeQuery)
    axios.get(`https://api.edamam.com/search?q=${this.state.recipeQuery}&app_id=94c8109f&app_key=9368a28ab0cd2aa9f4ecde91644867cf`)
    .then(res => {
      console.log(res.data);
      this.setState({
        recipeQuery: event.target.value,
        recipes: res.data.hits
      })   
    })
    .catch(err => {
      console.log(err.response)
    })
  }
// Toggle Recipe
  toggleRecipe = () => {
    this.setState({
      handleShowSingle: false,
      ingredientCount: 0
    })
  }
  toggleSingle = () => {
    this.setState({
      handleShowSingle: true,
      ingredientCount: 0
    })
  }

// Form on Change
  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    if(name==='date') {
      this.setState({
        date: value
      })} else if(name==='startTime') {
      this.setState({
        tempStartTime: value
      })
    } else if(name==='recipeName') {
      const newFood = this.state.food;
      newFood.name = value;
      this.setState({
        food: newFood
      })
      console.log(this.state.food);
    } else if(name==='eatenPortion') {
      const newFood = this.state.food;
      newFood.eatenPortion = value;
      this.setState({
        food: newFood
      })
    } else if(name==='portion') {
      const newFood = this.state.food;
      newFood.portion = value;
      this.setState({
        food: newFood
      })
    } else {
      const newIngredient = this.state.tempIngredient;
      newIngredient[name] = value;
      this.setState({
        tempIngredient: newIngredient
      });
    };
  }

// Submit Single form
  handleSingleSubmit = event => {
    event.preventDefault();
    const newFood = this.state.food;
    newFood.portion = 1;
    newFood.eatenPortion = 1;
    newFood.ingredients = [this.state.tempIngredient];
    newFood.name = newFood.ingredients[0].name;
    newFood.startTime = this.state.tempStartTime;
    this.setState({
      food: newFood
    })
    const payload = {
      user: this.state.user,
      date: this.state.date,
      food: this.state.food
    };
    console.log(payload);
    axios.post(`/api/ingredients/user/${this.props.user._id}/day/${this.state.date}`, payload)
      .then(() => {
        this.setState({
          date: '',
          food: {
            startTime: '',
            name: '',
            portion: 0,
            eatenPortion: 0,
            ingredients: [{
              name: '',
              brand: '',
              category: '',
              servingAmount: 0,
              servingSize: '',
            }]},
          tempIngredient: {
            name: '',
            brand: '',
            category: '',
            servingAmount: 0,
            servingSize: '',
          },
          tempStartTime: '',
          ingredientCount: ++this.state.ingredientCount
        })
        this.props.history.push("/dashboard")
        // update the parent components state (in Projects) by calling getData()
        // this.props.getData();
      })
      .catch(err => console.log(err))
  }
// Temp save button
  handleAddButton = () => {
    const addedIngredients = this.state.food.ingredients;
    addedIngredients.push({
      name: this.state.tempIngredient.name,
      brand: this.state.tempIngredient.brand,
      category: this.state.tempIngredient.category,
      servingAmount: this.state.tempIngredient.servingAmount,
      servingSize: this.state.tempIngredient.servingSize,
    })
    this.setState({
      ingredientCount: ++this.state.ingredientCount,
      tempIngredient: {
        name: '',
        brand: '',
        category: '',
        servingAmount: 0,
        servingSize: '',
      }
    })
    console.log(this.state.food);
  }
// Submit Recipe form
  handleRecipeSubmit = event => {
    event.preventDefault();
    const newFood = this.state.food;
    newFood.startTime = this.state.tempStartTime;
    this.setState({
      food: newFood
    })
    const payload = {
      user: this.state.user,
      date: this.state.date,
      food: this.state.food
    };
    console.log(payload);
    axios.post(`/api/ingredients/user/${this.props.user._id}/day/${this.state.date}`, payload)
      .then(() => {
        // set the form to it's initial state (empty input fields)
        this.setState({
          date: '',
          food: {
            startTime: '',
            name: '',
            portion: 0,
            eatenPortion: 0,
            ingredients: []},
          tempIngredient: {
            name: '',
            brand: '',
            category: '',
            servingAmount: 0,
            servingSize: '',
          },
          tempStartTime: '',
          ingredientCount: 0
        })
        this.props.history.push("/dashboard")
        // update the parent components state (in Projects) by calling getData()
        // this.props.getData();
      })
      .catch(err => console.log(err))
  }

// Delete
  handleDelete = event => {
    event?.preventDefault();
    // const date = event.target.name;
    // const foodId = event.target.value;
    axios.put(`/api/ingredients/user/${this.state.user._id}/day/${this.state.date}/${this.state.id}/delete`)
    .then(res => {
      console.log(res);
      this.props.history.push("/dashboard")
    })
    .catch(err=>console.log(err))
  }
// Edit
  handleEditing = event => {
    event?.preventDefault();
    console.log('this is props', this.props);
    const newFood = this.state.food;
    newFood.startTime = this.state.tempStartTime;
    this.setState({
      food: newFood
    })
    const payload = {
      user: this.state.user,
      date: this.state.date,
      food: this.state.food
    };
    axios.put(`/api/ingredients/user/${this.state.user._id}/day/${this.state.date}/${this.state.id}/edit`, 
    payload)
    .then(res => {
      console.log('hallo');
      this.props.history.push("/dashboard")
    })
    .catch(err=>console.log(err))
  }
  
  render() {
    let dataComponent;
    let formComponent;
    if (this.state.handleShowSingle) {     
      dataComponent = <SingleDb {...this.state} handleClick={this.handleClick} 
                        setQuery={this.setQuery} 
                        handleSearch={this.handleSearch}
                        handleQuery={this.handleQuery}/>;
      formComponent = <IngrForm {...this.state} handleChange={this.handleChange} 
                        handleSubmit={this.handleSingleSubmit} 
                        handleDelete={this.handleDelete} 
                        handleEditing={this.handleEditing}/>;
    } else {      
      dataComponent = <RecipeDb {...this.state} handleClickRecipe={this.handleClickRecipe} 
                        setRecipeQuery={this.setRecipeQuery} 
                        handleSearch={this.handleSearch}
                        handleRecipeQuery={this.handleRecipeQuery}/>; 
      formComponent = <RepForm {...this.state} handleChange={this.handleChange} 
                        handleSubmit={this.handleRecipeSubmit} 
                        handleDelete={this.handleDelete} 
                        handleEditing={this.handleEditing}/>
    } 

    return (
      <div>
        <TopBar title="Foods" icon="Foods" /> 
        <div className="pt4 pb5">
          <DateTimeInput startTime={this.state.tempStartTime} 
                          date={this.state.date}
                          handleChange={this.handleChange} 
                          handleSubmit={this.handleRecipeSubmit}/>
        
          <button className="f6 link dim br4 ph2 pv1 mb2 dib white bg-dark-blue"
          onClick={this.toggleSingle} > + Add a single food </button>
          <button className="f6 link dim br4 ph3 pv1 mb2 dib white bg-dark-blue" 
          onClick={this.toggleRecipe}> + Add a recipe </button>

          <div className="food-container">
            {this.state.handleShowSingle ? (<h4>Suggested Foods</h4>) 
            : <h4>Suggested Recipes</h4>}
            <SearchField {...this.state} handleSearch={this.handleSearch} 
            handleQuery={this.handleQuery}
            handleRecipeQuery={this.handleRecipeQuery}
            />
            <div>{dataComponent}</div>
            <div>{formComponent}</div>
          </div>
        </div>
        <BottomNavbar {...this.state} />
      </div>
    )
  }
}
