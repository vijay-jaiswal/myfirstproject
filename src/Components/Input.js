import React from "react";

export default function Input(props) {
  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      name={props.name}
      onChange={props.onChange}
      className="form-control input-lg"
      required={true}
      value={props.value}
      contentEditable
    />
  );
}
