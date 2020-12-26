import React, { Component } from 'react'

export default class Calendar extends Component {

  state = {
    day: new Date ().toISOString().split('T')[0]
  }
  handleChange = (event) => {

    console.log(event.target.value)
    this.props.setDate(event.target.value)
    this.setState({
      day: event.target.value
    })
    
  }

  // handleLeftClick = (event) => {
  // console.log(this.state.day)
  // let d = this.state.day
  // console.log(d)
  // d.setDate(d.getDate() - 1 )
  // this.setState({
  //   day: d
  // })
  // }
  // handleRightClick = (event) => {
  //   console.log(this.state.day)
  //   let d = this.state.day
  //   console.log(d)
  //   d.setDate(d.getDate() + 1 )
  //   console.log(d.getDate())
  //   this.setState({
  //     day: d
  //   })
  //   }

  render() {
    return (
      <div className="mb5">
        <nav className="fixed top-0 w-100 pa3 pa4-ns tc flex justify-center items-center bg-blue shadow-1">
          <a className="link dim gray f5 f5-ns dib mh2 white b" onClick={this.handleLeftClick}> {"<"} </a>
          <form className="link tc dim gray f6 f5-ns dib mh2">
            <input className="tr dark-gray" type="date" name="date" id="date" value={this.state.day} placeholder={this.state.day} onChange={this.handleChange}/>
          </form>
          <a className="link tc dim gray f5 f5-ns dib mh2 white b" onClick={this.handleRightClick}> {">"} </a>
        </nav>
      </div>
    )
  }
}
