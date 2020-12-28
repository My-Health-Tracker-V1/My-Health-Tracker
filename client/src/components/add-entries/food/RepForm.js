import React, { Component } from 'react'

export default class RepForm extends Component {

  render() {
    return (
      <div>
        <h3 className="f5 db">Add a Recipe:</h3>
        <form onSubmit={this.props.editing? 
                        this.props.handleEditing : this.props.handleSubmit}>
            <div>
              <label htmlFor='name' className="f6 w3 dib" >Recipe Name: </label>
              <input className="f6 pa1 mr3 ml1 w6 mv1"
                type='text'
                id='recipeName'
                name='recipeName'
                value={this.props.food.name} 
                onChange={this.props.handleChange}
              />
            </div>
            <div>
              <label htmlFor='portion' className="f6 w3 dib">Yield: </label>
              <input className="f6 pa1 mr3 ml1 w6 mv1"
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
              <input className="f6 pa1 mr3 ml1 w6 mv1"
                type='number'
                id='eatenPortion'
                name='eatenPortion'
                min='0'
                value={this.props.food.eatenPortion}
                onChange={this.props.handleChange}
              />
            </div>
          </form>
          {/* <button onClick={this.props.handleAddButton} className="f6 link dim br-pill ba ph3 pv2 mb2 dib dark-blue">Add ingredient to the recipe</button> */}
          <div style={{padding: "20px 0"}}>
            { this.props.food.ingredients.map(ingr => {
              return (
                  <a className="f7 link dim br2 ph1 pv1 mb2 pa4 mr2 dib white bg-dark-green">{ingr.name}</a>)
            })}
          </div>
          <form onSubmit={this.props.editing? 
                        this.props.handleEditing : this.props.handleSubmit}>
            <button type='submit' 
            className="f6 link dim br-pill ph3 pv2 mb2 dib white bg-dark-blue">Save all</button>
          </form>
      </div>
    )
  }
}
