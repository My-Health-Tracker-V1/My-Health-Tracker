import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Icons from '../shared/Icons'

export default class Energy extends Component {
  render() {
    // console.log(this.props)
    return (
        <article className="" style={{height: 'auto'}}>
            <div className="flex justify-around items-center mw6 center br3 ba b--light-blue bg-white blue mb2">
              <div className="flex justify-center items-center mv2">
                <div className='ba br-100 pa2 items-center mv2 gray'>
                  <Icons icon="Energy3"/>
                </div>
                <div className="tl ml2 w4">
                  <p className="pv0 f4 b gray mb1 mt0">Energy:</p>
                  <p className="f6 gray mv0 ">Energy level: {this.props.energy}</p>
                </div>
              </div>
              <Link to={{pathname: '/add/Energy', props:this.props}} className="link blue hover-silver dib mh3 tc" >
                <Icons icon="Edit"/>
              </Link>
            </div>
          </article>    
    )
  }
}
