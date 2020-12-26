import React, { Component } from 'react'

export default class AddIngDrink extends Component {

  render() {
    return (
      <div>
          <h3 className="f6 db">Custom Ingredient:</h3>
            <div>
                <form onSubmit={this.props.editing? this.props.handleEditing : this.props.handleSubmit}>
                
                  <div className="custom-ingredient">
                          <div>
                          <label htmlFor='name'  className="f6 mt3" >Name: </label>
                          <input
                            type='text'
                            id='name'
                            name='name' value={this.props.name}
                            onChange={this.props.handleChange}
                          />
                        </div>
                        <div style={{"display": "flex", "flexDirection": "row", "justifyContent": "center", "alignItems": "center"}}>
                          <label htmlFor='brand' className="f6 mt3">Brand: </label>
                          <input 
                            type='text'
                            id='brand'
                            name='brand'
                            value={this.props.brand}
                            onChange={this.props.handleChange}
                          />
                        </div>
                        <div style={{"display": "flex", "flexDirection": "row", "justifyContent": "center", "alignItems": "center"}}>
                        <label htmlFor='category' className="db fw4 lh-copy f6">Category: </label>
                          <input 
                            type='text'
                            id='category'
                            name='category'
                            value={this.props.category}
                            onChange={this.props.handleChange}
                          /> 
                          </div>
                 </div>

                    <div style={{"display": "flex", "flexDirection": "row", "justifyContent": "center", "alignItems": "center"}}>
                        <label htmlFor='servingAmount' className="f6 mt3">Amount: </label>
                        <input 
                          type='number'
                          id='servingAmount'
                          name='servingAmount'
                          min='0'
                          value={this.props.servingAmount}
                          onChange={this.props.handleChange}
                        />
                        <label htmlFor='servingSize' className="db fw4 lh-copy f6">Size: </label>
                        <input 
                          type='text'
                          id='servingSize'
                          name='servingSize'
                          value={this.props.servingSize}
                          onChange={this.props.handleChange}
                        />
                  </div>
                
                <button type='submit' className="f6 link dim br-pill ba ph3 pv2 mb2 dib dark-blue">Save</button>
              </form>
              <button onClick={this.props.handleDelete} className="f6 w4 dim ph3 pv2 mt3 dib white bg-dark-red br-pill b--dark-red">Delete</button>
        </div>
</div>
    )
  }
}
