import React, { Component } from 'react'
import { FormRow }from '../helper-components/Rows'

export default class IngrForm extends Component {

  render() {
    
    return (
      <div>
          <h3 className="f6 db">Custom single ingredient</h3>
            <div>
                <form>
                  <div className="custom-ingredient">
                    <FormRow value={this.props.tempIngredient.name} title="Name: "
                             type="text" id="name" placeholder="e.g. Apple" name="name" 
                             handleChange={this.props.handleChange}/>
                    <FormRow value={this.props.tempIngredient.brand} title="Brand: "
                             type="text" id="category" placeholder="e.g. Edeka" name="brand"
                             handleChange={this.props.handleChange}/>
                    <FormRow value={this.props.tempIngredient.category} title="Category: "
                             type="text" id="category" placeholder="e.g. Foods" name="category"
                             handleChange={this.props.handleChange}/>
                    <FormRow value={this.props.tempIngredient.servingAmount} title="QT: "
                             type="number" id="servingAmount" placeholder="e.g. 3" name="servingAmount"
                             min="0"
                             handleChange={this.props.handleChange}/>
                    <FormRow value={this.props.tempIngredient.servingSize} title="Unit: "
                             type='text' id='servingSize' placeholder="e.g. piece" name='servingSize' 
                             handleChange={this.props.handleChange}/>
                  </div>
                  </form>
                  {
                    this.props.editing && this.props.add ? 
                     ( <button onClick={this.props.addNewIngrSave}
                        className="f7 link dim br4 ba ph2 pv1 mb4 dib dark-green mr2"> ✔️ Save Ingredient
                        </button>)
                      : this.props.editing && this.props.edit ?
                      (<button onClick={this.props.editIngrSave}
                        className="f7 link dim br4 ba ph2 pv1 mb4 dib dark-green mr2"> ✔️ Save Ingredient
                     </button>)
                     : (
                      <form onSubmit={this.props.handleSubmit}>
                        <button type='submit' 
                        className="f6 link dim br-pill ph3 pv2 mb2 dib white bg-dark-blue ma3"> Save Ingredient
                        </button>
                     </form>
                     )   
                  }
        </div>
      </div>
    )
  }
}
