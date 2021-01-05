import React from "react";

function FormRow(props) {
  return (
    <div>
      <label htmlFor={props.name} className="f6 w3 dib">
        {props.title}
      </label>
      <input
        className="f6 pa1 mr3 ml1 w4 mv1"
        type={props.type}
        id={props.id}
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        onChange={props.handleChange}
      />
    </div>
  );
}

function SelectRow(props) {
  return (
    <div>
      <label htmlFor={props.id} className="f6 w3 dib">
        {" "}
        {props.title}{" "}
      </label>
      <select
        className="f6 pa1 mr3 ml1 w4 mv1"
        value={props.value}
        id={props.id}
        name={props.name}
        onChange={props.handleSelectCategory}
      >
        {props.options.map((option) => {
          return <option value={option}> {option} </option>;
        })}
      </select>
    </div>
  );
}

export { FormRow, SelectRow };
