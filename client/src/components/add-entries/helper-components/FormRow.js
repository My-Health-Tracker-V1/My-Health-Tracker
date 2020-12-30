import React from 'react'

export default function FormRow(props) {
  return (
    <div>
      <label htmlFor={props.name}  className="f6 w3 dib" >{props.title}</label>
      <input className="f6 pa1 mr3 ml1 w4 mv1"
        type={props.type}
        id={props.id}
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        onChange={props.handleChange}
      />
    </div>
  )
}
