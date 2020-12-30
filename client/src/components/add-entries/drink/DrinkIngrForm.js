import React, { Component } from 'react'
import { FormRow, SelectRow } from '../helper-components/Rows'

export default class DrinkIngrForm extends Component {
  render() {
    const options = ["Alcoholic", "Non-Alcoholic", "Ordinary drink", "Cocktail"]
    return (
      <div>
          <h3 className="f6 db">Add a drink</h3>
            <div>
            <form onSubmit={this.props.editing? 
                      this.props.handleEdit : this.props.handleSubmit}>
                  <div className="custom-ingredient">
                    <FormRow value={this.props.name} title="Name: "
                             type="text" id="name" placeholder="Water" name="name" 
                             handleChange={this.props.handleChange}/>
                    <SelectRow options={options} title="Category: "
                             id="category" name="category"
                             handleChange={this.props.handleChange}/>
                    
                    <FormRow value={this.props.servingAmount} title="QT: "
                             type="number" id="servingAmount" placeholder="300" name="servingAmount"
                             min="0"
                             handleChange={this.props.handleChange}/>
                    <FormRow value={this.props.servingSize} title="Unit: "
                             type='text' id='servingSize' placeholder="ml" name='servingSize' 
                             handleChange={this.props.handleChange}/>
                  </div>
                  <button type='submit' 
                  className="f6 link dim br-pill ph3 pv2 mb2 dib white bg-dark-blue ma3"> Save Drinks
                  </button>
                  </form>
            </div>
      </div>
    )
  }
}
