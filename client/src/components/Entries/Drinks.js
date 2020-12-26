import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Icons from '../shared/Icons'

export default class Drinks extends Component {
  render() {
    return (
      <article style={{height: 'auto'}}>
        {this.props.drinks.map(drink => (
          <div className="flex justify-around items-center mw6 center br3 ba b--light-blue bg-white blue mb2">
            <div className="flex justify-center items-center mv2">
                <div className='ba br-100 pa3 items-center mv2 gray'>
                  <Icons icon="Drinks3"/>
                </div>
                <div className="tl ml2 w4">
                  <p className="pv0 f4 b gray mb1 mt0">Drink:</p>
                  <p className="f6 gray mv0">{drink.name}</p>
                </div>
            </div>
              
            <Link to={{pathname: '/add/Drinks', state:{ drinks: drink, editing: true, day:this.props.day}}} className="link blue hover-silver dib mh3 tc" >
              <Icons icon="Edit"/>
            </Link>
              
          </div>
        ))}
      </article>
    )
  }
}
