import axios from 'axios';
import React, { Component } from 'react';
import TopBar from '../shared/TopBar';
import BottomNavbar from '../shared/BottomNavbar';
import Icons from '../shared/Icons';
import DateTimeInput from './DateTimeInput';
import Buttons from './Buttons';
import AddIngredient from './AddIngredient'
import '../add-entries/FoodEntry.css'

export default class FoodEntry extends Component {
  state = {
    // this is the loggedin user from App.js
    user: this.props.user,
    date: this.props.location.state?.day ||new Date().toISOString().split('T')[0],
    ingredients: [],
    tempStartTime: "",
    tempIngredient: {
      name: "",
      brand: "",
      category: "",
      servingAmount: "",
      servingSize: ""
    },
    food: {
      startTime: '',
      name: '',
      portion: '',
      eatenPortion: '',
      ingredients: [
      ]
    },
    selectedIngredient: false,
    handleShowSingle: true,
    ingredientCount: 0,
    query: ''

  }

  // Function for fill out the ingredient form
  handleClick = event => {
    const key = event.target.getAttribute('data-key')
    console.log(key);
    console.log('this.state.ingredients is:', this.state.ingredients)
    const clickedIngredient = this.state.ingredients.filter(ingredient => {
      return ingredient._id === key;
    });
    const newTempIngredient = this.state.tempIngredient;
    newTempIngredient.name = clickedIngredient[0].name;
    newTempIngredient.brand = clickedIngredient[0].brand;
    newTempIngredient.category = clickedIngredient[0].category;
    this.setState ({
      tempIngredient: newTempIngredient
    })
    console.log(this.state.tempIngredient);
  }

// Functions for toggle Recipe
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

  // Functions for submit form
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

// Function for get an array of object and then send it back to server

// Function to get the user day history
    getAllDaysFromUser = () => {
      axios.get(`/api/days/user/${this.state.user._id}`)
      .then(response => {
          console.log(response.data)
          this.setState({
            days: response.data
          })
      })
    }

// delete
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
    // let inputComponent;
    // if (this.state.handleShowSingle) {     
    //   inputComponent = <AddIgt {...this.state} handleChange={this.handleChange} handleSubmit={this.handleSingleSubmit} handleDelete={this.handleDelete} handleEditing={this.handleEditing}/>;    
    //   } 
    // else {      
    //   inputComponent = <AddRep {...this.state} handleChange={this.handleChange} handleSubmit={this.handleRecipeSubmit} handleAddButton={this.handleAddButton} handleDelete={this.handleDelete} handleEditing={this.handleEditing}/>;  
    //   } 
    //   console.log(this.props.location.state)
    return (
      <div>
        <TopBar title="Foods" icon="Foods" /> 

        <Buttons />
        <DateTimeInput {...this.state} handleChange={this.handleChange} handleSubmit={this.handleRecipeSubmit}/>
        
        <div className="food-container">
          <div className="row-container">
            <Icons icon="FoodsDetails" />
            <form>
              <input className="f6 pa1 mr3 ml1 w10 mv1"
                type='text'
                id='recipe-input'
                name='recipeName' 
                placeholder="Add a meal name, eg. Pizza"
                onChange={this.props.handleChange}
              />
            </form>
          </div>

         <a className="f6 grow no-underline br-pill ba bw1 ph3 pv1 mb2 dib dark-blue" 
         href="/add/Ingredient"> Add ingredients</a>
        </div>
        <BottomNavbar {...this.state} />
      </div>
    )
  }
}
