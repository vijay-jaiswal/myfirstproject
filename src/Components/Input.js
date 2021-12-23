import React from "react";

export default function Input(props) {
  return (
    <div>
      <input
        type={props.type}
        placeholder={props.placeholder}
        name={props.name}
        onChange={props.onChange}
        className="form-control input-lg"
        required
        value={props.value}
        contentEditable
      />
    </div>
  );
}
