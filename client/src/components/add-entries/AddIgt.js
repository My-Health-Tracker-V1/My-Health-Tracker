import React, { Component } from 'react'

export default class AddIgt extends Component {

  render() {
    
    return (
      <div>
          <h3 className="f6 db">Custom Ingredient:</h3>
            <div>
                <form onSubmit={this.props.handleSubmit}>
             
                  <div className="custom-ingredient">
                          <div>
                          <label htmlFor='name'  className="f6 w3 dib" >Name: </label>
                          <input className="f6 pa1 mr3 ml1 w4 mv1"
                            type='text'
                            id='name'
                            placeholder="e.g. Apple"
                            name='name' value={this.props.tempIngredient.name}
                            onChange={this.props.handleChange}
                          />
                        </div>
                        <div style={{"display": "flex", "flexDirection": "row", "justifyContent": "center", "alignItems": "center"}}>
                          <label htmlFor='brand' className="f6 w3 dib">Brand: </label>
                          <input className="f6 pa1 mr3 ml1 w4 mv1"
                            type='text'
                            id='brand'
                            name='brand'
                            placeholder="e.g. Edeka"
                            value={this.props.tempIngredient.brand}
                            onChange={this.props.handleChange}
                          />
                        </div>
                        <div style={{"display": "flex", "flexDirection": "row", "justifyContent": "center", "alignItems": "center"}}>
                        <label htmlFor='category' className="f6 w3 dib">Category: </label>
                          <input className="f6 pa1 mr3 ml1 w4 mv1"
                            type='text'
                            id='category'
                            name='category'
                            placeholder="e.g. Foods"
                            value={this.props.tempIngredient.category}
                            onChange={this.props.handleChange}
                          /> 
                          </div>
                 </div>

                    <div >
                        <label htmlFor='servingAmount' className="f6 w3 dib">Amount: </label>
                        <input className="f6 pa1 mr3 ml1 w4 mv1"
                          type='number'
                          id='servingAmount'
                          name='servingAmount'
                          placeholder="e.g. 3"
                          min='0'
                          value={this.props.tempIngredient.servingAmount}
                          onChange={this.props.handleChange}
                        />
                        </div>
                        <div>
                        <label htmlFor='servingSize'  className="f6 w3 dib">Size: </label>
                        <input className="f6 pa1 mr3 ml1 w4 mv1"
                          type='text'
                          id='servingSize'
                          name='servingSize'
                          placeholder="e.g. piece"
                          value={this.props.tempIngredient.servingSize}
                          onChange={this.props.handleChange}
                        />
                  </div>
                
                  <button type='submit' class="f6 link dim br-pill ph3 pv2 mb2 dib white bg-dark-blue ma2">Save</button>
              </form>

              

        </div>
</div>
    )
  }
}
