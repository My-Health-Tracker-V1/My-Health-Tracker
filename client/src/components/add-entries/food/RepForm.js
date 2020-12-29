import React, { Component } from 'react';
import IngrForm from './IngrForm'

export default class RepForm extends Component {

  render() {
    let editInterface;
    if(this.props.edit === true) {
      editInterface = <IngrForm {...this.props} 
                      handleChange={this.props.handleChange} 
                      handleSubmit={this.props.handleSingleSubmit}/>    
    } else {
      editInterface = <></>
    }
    let addInterface;
    if(this.props.add === true) {
      addInterface = <IngrForm {...this.props} 
                    handleChange={this.props.handleChange} 
                    handleSubmit={this.props.handleAddSubmit}
                    handleEdit={this.props.handleEdit} />
    } else {
      addInterface = <></>
    }

    return (
      <div>
        {this.props.editing ? (<h3 className="f5 db">Edit a Recipe:</h3>) 
        : (<h3 className="f5 db">Add a Recipe:</h3>)}
        
        <form onSubmit={this.props.editing? 
                        this.props.handleEdit : this.props.handleSubmit}>
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
          <div style={{padding: "20px 0 5px 0"}}>
            { this.props.food.ingredients.map((ingr, index) => {
              return (
                <div>
                  <a onClick={this.props.handleEdit} value={index} 
                  className="f7 link dim br2 ph1 pv1 mb2 pa4 mr2 dib white bg-dark-green">{ingr.name}</a>
                  {this.props.editing && <a onClick={this.props.handleDeleteIngredient} value={index}  
                  className="f6 link dim br4 ph2 pv1 mb2 dib white bg-dark-pink"> ✖️ </a>}
                </div>)
            })}
          </div>

          {this.props.editing && <a onClick={this.props.handleAdd} 
          className="f7 link dim br4 ba ph2 pv1 mb3 dib dark-green"> ➕ Add a new ingredient</a>}
          {editInterface}
          {addInterface}
          <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
            <div>
              {this.props.editing && <a onClick={this.props.handleDeleteFood} 
              value={this.props.food._id} className="f6 link dim br-pill ba bw1 ph2 pv2 mb4 mr3 dib dark-blue">
              Delete Recipe</a>}
            </div>
            <form onSubmit={this.props.editing? 
                          this.props.handleEdit : this.props.handleSubmit}>
              <button type='submit' 
              className="f6 link dim br-pill ph4 pv2 mb2 dib white bg-dark-blue">Save all</button>
            </form>
          </div>
      </div>
    )
  }
}
