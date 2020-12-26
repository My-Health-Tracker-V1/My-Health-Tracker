import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Icons from '../shared/Icons'

export default class Symptoms extends Component {
  state = {
    symptoms: this.props.symptoms || []
  }

  componentDidMount (){
    this.setState({
      symptoms: this.props.symptoms
    })
  }

  render() {
    return (
      <article style={{height: 'auto'}}>
        {this.props.symptoms.map(symptom => (
          <div className="flex justify-around items-center mw6 center br3 ba b--light-blue bg-white blue mb2">
            <div className="flex justify-center items-center mv2">
              <div className='ba br-100 pa2 items-center mv2 gray'>
                <Icons icon="Symptoms3"/>
              </div>
              <div className="tl ml2 w4">
                <p className="pv0 f4 b gray mb1 mt0">Symptom:</p>
                <p className="f6 gray mv0 ">{symptom.name}</p>
                <p className=" f6 gray mv0">Intensity: {symptom.intensity}</p>
              </div>
            </div>
            <Link to={{pathname: '/add/Symptoms', state:{ symptoms: symptom, editing: true, day:this.props.day}}} className="link blue hover-silver dib mh3 tc" >
              <Icons icon="Edit"/>
            </Link>
          </div>
        ))}
      </article>
    )
  }
}
