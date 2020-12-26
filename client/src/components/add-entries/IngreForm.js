import React, { Component } from 'react'

export default class IngreForm extends Component {
  render() {
    return (
      <div>
         <input
            type='text'
            id='name'
            name='name'
            placeholder="Chicken"
            value={this.props.name}
            onChange={this.props.handleChange}
          />
          <input
            type='text'
            id='brand'
            name='brand'
            placeholder="Edeka"
            value={this.props.brand}
            onChange={this.props.handleChange}
          />
          <input
            type='text'
            id='category'
            name='category'
            placeholder="Foods"
            value={this.props.category}
            onChange={this.props.handleChange}
          />
          <input
            type='number'
            id='servingAmount'
            name='servingAmount'
            placeholder="500"
            value={this.props.servingAmount}
            onChange={this.props.handleChange}
          />
          <input
            type='text'
            id='servingSize'
            name='servingSize'
            placeholder="g"
            value={this.props.servingSize}
            onChange={this.props.handleChange}
          /> 
      </div>
    )
  }
}
