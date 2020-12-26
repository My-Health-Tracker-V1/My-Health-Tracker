import axios from 'axios'
import React, { Component } from 'react'

export default class IngreList extends Component {

  state = {
    user: this.props.user,
    allDays: []
  }

  getAllDays = () => {
    console.log("prop", this.props);
    axios.get(`/api/days/user/${this.props.user._id}`)
    .then(response => {
      console.log("hier kommt die antowork")
      console.log(response.data)
      this.setState({
        allDays: response.data
      })
    })
  }

  componentDidMount = () => {
    this.getAllDays();
  }

  handleDelete = event => {
    const date = event.target.name;
    const foodId = event.target.value;
    axios.put(`/api/ingredients/user/${this.props.user._id}/day/${date}/${foodId}/delete`)
    .then(this.getAllDays())

  }
  render() {
    
    const filteredDays = this.state.allDays.filter(mydays => 
      mydays.owner._id === this.state.user._id
    )
    console.log(filteredDays);
    return (
      <div className="pa3 pa5-ns">
      <h1>You foods comsumptions during the last days </h1>
      <ul className="list pl0 measure center">
      {
        filteredDays.map(day => {
          return (
            <li key={day.foods._id} key-data={day.foods._id} class="lh-copy pv3 ba bl-0 bt-0 br-0 b--dotted b--black-30">
            {day.date}
            <ul>
              {day.foods.map(food => {
                return (
                  <li>{food.name} 
                  <button>Edit</button>
                  <button name={day.date} value={food._id} onClick={this.handleDelete}>Delete</button>
                  </li>
                )
              })}
            </ul>
            </li>
          )
        })
      }
      </ul>
     </div>
    )
  }
}

