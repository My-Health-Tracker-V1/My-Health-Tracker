import React from 'react'

export default function SelectRow(props) {
  console.log(props.options)
  return (
    <div>
      <label htmlFor={props.id} className="f6 w3 dib" > {props.title} </label>
      <select className="f6 pa1 mr3 ml1 w4 mv1" 
      id={props.id} name={props.name} onChange={props.handleChange}>
      {props.options.map(option => {
        return (<option value={option}> {option} </option>)
      })}
      </select>
    </div>
  )
}
