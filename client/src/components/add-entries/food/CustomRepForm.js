import React, { Component } from 'react'

export default class RepForm extends Component {

  render() {
    return (
      <div>
          <h3 className="f6 db">Custom Recipe:</h3>
            <div>
                <form onSubmit={this.props.editing? this.props.handleEditing : this.props.handleSubmit}>
             
                  <div className="custom-ingredient">
                          <div>
                          <label htmlFor='name' className="f6 w3 dib" >Recipe Name: </label>
                          <input className="f6 pa1 mr3 ml1 w4 mv1"
                            type='text'
                            id='recipeName'
                            name='recipeName'
                            value={this.props.food.name} 
                            onChange={this.props.handleChange}
                          />
                        </div>
                        
                 </div>
                    <div>
                        <label htmlFor='portion' className="f6 w3 dib">Recipe Portion: </label>
                        <input className="f6 pa1 mr3 ml1 w4 mv1"
                          type='number'
                          id='portion'
                          name='portion'
                          min='0'
                          value={this.props.food.portion}
                          onChange={this.props.handleChange}
                        />
                      </div>
                      <div>
                        <label htmlFor='eatenPortion' className="f6 w3 dib">Your Portion: </label>
                        <input className="f6 pa1 mr3 ml1 w4 mv1"
                          type='text'
                          id='eatenPortion'
                          name='eatenPortion'
                          value={this.props.food.eatenPortion}
                          onChange={this.props.handleChange}
                        />
                  </div>
                
                  {/* Single Ingredients form */}
                  
                 <input className="f6 pa1 mr3 ml1 w4 mv1"
                    type='text'
                    id='name'
                    name='name'
                    placeholder="e.g. Chicken"
                    value={this.props.food.ingredients.name}
                    onChange={this.props.handleChange}
                  />
                  <input className="f6 pa1 mr3 ml1 w4 mv1"
                    type='text'
                    id='brand'
                    name='brand'
                    placeholder="e.g. Edeka"
                    value={this.props.food.brand}
                    onChange={this.props.handleChange}
                  />
                  <input className="f6 pa1 mr3 ml1 w4 mv1"
                    type='text'
                    id='category'
                    name='category'
                    placeholder="e.g. Foods"
                    value={this.props.food.category}
                    onChange={this.props.handleChange}
                  />
                  <input className="f6 pa1 mr3 ml1 w4 mv1"
                    type='number'
                    id='servingAmount'
                    name='servingAmount'
                    placeholder="e.g. 2"
                    value={this.props.food.ingredients.servingAmount}
                    onChange={this.props.handleChange}
                  />
                  <input className="f6 pa1 mr3 ml1 w4 mv1"
                    type='text'
                    id='servingSize'
                    name='servingSize'
                    placeholder="e.g. Kg"
                    value='g'
                    onChange={this.props.handleChange}
                  /> 
                
                <button type='submit' className="f6 link dim br-pill ph3 pv2 mb2 dib white bg-dark-blue">Save</button>
              </form>
              <button onClick={this.props.handleAddButton} className="f6 link dim br-pill ba ph3 pv2 mb2 dib dark-blue">Add ingredient to the recipe</button>
        </div>
</div>
    )
  }
}
