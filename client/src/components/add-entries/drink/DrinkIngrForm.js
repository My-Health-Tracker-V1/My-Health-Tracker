import React, { Component } from 'react'
import FormRow from '../helper-components/FormRow'

export default class DrinkIngrForm extends Component {
  render() {
    return (
      <div>
          <h3 className="f6 db">Add a drink</h3>
            <div>
            <form onSubmit={this.props.editing? 
                      this.props.handleEdit : this.props.handleSubmit}>
                  <div className="custom-ingredient">
                    <FormRow value={this.props.name} title="Name: "
                             type="text" id="name" placeholder="e.g. Apple Juice" name="name" 
                             handleChange={this.props.handleChange}/>
                    <FormRow value={this.props.brand} title="Brand: "
                             type="text" id="category" placeholder="e.g. Edeka" name="brand"
                             handleChange={this.props.handleChange}/>
                    <FormRow value={this.props.category} title="Category: "
                             type="text" id="category" placeholder="e.g. Drinks" name="category"
                             handleChange={this.props.handleChange}/>
                    <FormRow value={this.props.servingAmount} title="QT: "
                             type="number" id="servingAmount" placeholder="e.g. 3" name="servingAmount"
                             min="0"
                             handleChange={this.props.handleChange}/>
                    <FormRow value={this.props.servingSize} title="Unit: "
                             type='text' id='servingSize' placeholder="e.g. ml" name='servingSize' 
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
