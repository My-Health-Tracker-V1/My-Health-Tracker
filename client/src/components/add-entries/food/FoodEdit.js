import axios from 'axios';
import React, { Component } from 'react';
import TopBar from '../../shared/TopBar';
import BottomNavbar from '../../shared/BottomNavbar';
import IngrForm from './IngrForm';
import DateTimeInput from '../helper-components/DateTimeInput'
import RepForm from './RepForm';
import FoodBase from './FoodBase';

export default class FoodEdit extends FoodBase {
  constructor(props) {
    super(props);
    this.state.food = props.location.state.element;
    this.state.editing = true;
  }

  editIngrSave = event => {
    event.preventDefault();
    const newFood = this.state.food;
    newFood.ingredients[this.state.tempIngIdx] = this.state.tempIngredient;
    this.setState({
      food: newFood,
      edit: false,
      tempIngId: '',
      tempIngredient: {
        name: '',
        brand: '',
        category: '',
        servingAmount: 0,
        servingSize: '',
      }
    })
  }

  addNewIngrSave = event => {
    event.preventDefault();
    const newFood = this.state.food;
    newFood.ingredients.push(this.state.tempIngredient);
    this.setState({
      food: newFood,
      add: false
    })
  }

  saveIngr2Rep = () => {
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

  editRecipeSubmit = event => {
      event.preventDefault();
      const payload = {
        user: this.state.user,
        date: this.state.date,
        food: this.state.food
      };
      console.log(payload);
      axios.put(`/api/ingredients/user/${this.props.user._id}/day/${this.state.date}/${this.state.food._id}/edit`, payload)
        .then(() => {
          this.props.history.push("/dashboard")
        })
        .catch(err => console.log(err))
    }

// delete
  handleDeleteIngredient = event => {
      event?.preventDefault();
      const ingIdx = event.target.getAttribute('data-key');
      const newFood = this.state.food;
      newFood.ingredients.splice(ingIdx, 1);
      this.setState({
        food: newFood
      });
  }
  handleDeleteFood = event => {
    event?.preventDefault();
    const foodId = event.target.getAttribute('data-key');
    axios.put(`/api/ingredients/user/${this.state.user._id}/day/${this.state.date}/${foodId}/delete`)
    .then(res => {
      console.log(res);
      this.props.history.push("/dashboard")
    })
    .catch(err=>console.log(err))
  }

  toggleAddIngr = event => {
    event?.preventDefault();
    const tempIng = {
      name: "",
      brand: "",
      category: "",
      servingAmount: "",
      servingSize: ""
    };
    this.setState({
      add: true,
      tempIngredient: tempIng
    });
  }
  toggleEditIngr = event => {
    event?.preventDefault();
    const ingIdx = event.target.getAttribute('data-key');
    console.log(ingIdx);
    const tempIng = Object.assign( {}, this.state.food.ingredients[ingIdx]);
    this.setState({
      edit: true,
      tempIngredient: tempIng,
      tempIngIdx: ingIdx
    })
  }
  
  render() {
    
    return (
      <div>
      <TopBar icon="Foods" title="Your Foods"/>
      <div className="pb5">
        <DateTimeInput startTime={this.state.tempStartTime} date={this.state.date}
                        handleChange={this.handleChange} />
        <div className="mw6 center" >
          <RepForm {...this.state} handleChange={this.handleChange} 
                          saveIngr2Rep={this.saveIngr2Rep}
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
    )
  }
}

