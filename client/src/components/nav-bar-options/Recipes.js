import React, { Component } from 'react';
import BottomNavbar from '../shared/BottomNavbar';
import TopBar from '../shared/TopBar';
import { FormRow, SelectRow } from '../add-entries/helper-components/Rows'
import IngrForm from '../add-entries/food/IngrForm';

export default class Recipes extends Component {

  state = {
    user: this.props.user,
    tempIngredient: {
      name: '',
      brand: '',
      category: '',
      servingAmount: '',
      servingSize: ''
    },
    recipes: {
      recipeName: '',
      servings: '',
      ingredients: []
    },
  }
  
  render() {
    return (
      <div>
        <TopBar title="Your Recipes" icon="recipes"/>
        <div className="pt2 pb5">
          <h3>Write your first recipe</h3>
          <FormRow value={this.state.recipes.recipeName} title="Recipe Name"
                   type="text" id="recipeName" name="recipeName"
                   handleChange={this.handleChange}
                   />
          <FormRow value={this.state.recipes.servings} title="Servings"
                   type="number" id="servings" name="servings"
                   handleChange={this.handleChange}
                   />
          <h3>Add a Ingredient</h3>

          { this.state.recipes.ingredients.map((ingr, index) => {
            return (
              <div>
                <a data-key={index} 
                className="f7 link dim br2 ph1 pv1 mb2 pa4 mr2 dib white bg-dark-green">{ingr.name}</a>
                {<a data-key={index}  
                className="f6 link dim br4 ph2 pv1 mb2 dib white bg-dark-pink"> ✖️ </a>}
              </div>)
          })}
          <FormRow value={this.state.tempIngredient.name} title="Name: "
                    type="text" id="name" placeholder="Chicken breast  " name="name" 
                    handleChange={this.handleChange}
                    />
          <FormRow value={this.state.tempIngredient.servingAmount} title="QT: "
                    type="number" id="servingAmount" placeholder="500" name="servingAmount"
                    min="0"
                    handleChange={this.handleChange}
                    />
          <FormRow value={this.state.tempIngredient.servingSize} title="Unit: "
                    type='text' id='servingSize' placeholder="g" name='servingSize' 
                    handleChange={this.handleChange}
                    />
          
          
        </div>
        <BottomNavbar />
      </div>
    )
  }
}
