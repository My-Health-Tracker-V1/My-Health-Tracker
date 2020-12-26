import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Icons from '../shared/Icons'

export default class Foods extends Component {
  state = {
    foods: this.props.foods || []
  }

  componentDidMount (){
    this.setState({
      foods: this.props.foods
    })
  }

  render() {
    // console.log(this.props.foods)
    return (
      
      <article style={{height: 'auto'}}>
        {this.props.foods.map(food => (
          <div className="flex justify-around items-center mw6 center br3 ba b--light-blue bg-white blue mb2">
            <div className="flex justify-center items-center mv2">  
              <div className='ba br-100 pa3 items-center mv2 gray'>
                <Icons icon="Foods3"/>
              </div>
              <div className="tl ml2 w4">
                <p className="pv0 f4 b gray mb1 mt0">Food:</p>
                <p className="f6 gray mv0 ">{food.ingredients.map(ingredient => (<p key={ingredient}>{ingredient.name}</p>))}</p>
              </div>
            </div>
                <Link to={{pathname: '/edit/Foods', state:{food: food, editing: true, day:this.props.day}}} className="link blue hover-silver dib mh3 tc" >
                  <Icons icon="Edit"/>
                </Link>
          </div>
        ))}
      </article>
    )
  }
}
