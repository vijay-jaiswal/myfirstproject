import React from "react";

export default function Input(props) {
  return (
    <div>
      <input
        type={props.type}
        placeholder={props.placeholder}
        name={props.name}
        onChange={props.onChange}
        //   value={props.value}
        className="form-control input-lg"
        required
        defaultValue={props.defaultValue}
        contentEditable
      />
    </div>
  );
}
