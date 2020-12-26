import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Icons from '../shared/Icons'

export default class Excercise extends Component {
  state = {
    exercises: this.props.exercises || []
  }

  componentDidMount (){
    this.setState({
      exercises: this.props.exercises
    })
  }


  render() {
    // console.log(this.props)
    return (
      <article className="m0" style={{height: 'auto'}}>
        {this.props.exercises.map(exercise => (
          <div key={exercise._id} className="flex justify-around items-center mw6 center br3 ba b--light-blue bg-white blue mb2">
            <div className="flex justify-around items-center mv2">
              <div className='ba br-100 pa3 items-center mv2 gray'>
                <Icons icon="Exercise3"/>
              </div>
              <div className="tl ml2 w4">
                <p className="pv0 f4 b gray mb1 mt0">Exercise</p> 
                <p className="f6 gray mv0 i">{exercise.name}</p>
                <p className=" f6 gray mv0">Intensity: {exercise.intensityLevel}</p>
              </div>
            </div>
                <Link to={{pathname: '/add/Exercise', state:{ exercises: exercise, editing: true, day:this.props.day}}} className="link blue hover-silver dib mh3 tc" >
                  <Icons icon="Edit"/>
                </Link>
          </div>
        ))}
      </article>
    )
  }
}
