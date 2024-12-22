import React from "react";

const FormInput = ({
  id,
  label,
  value,
  onChange,
  type = "text",
  required = false,
}) => {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}:
      </label>
      <input
        type={type}
        id={id}
        className="form-control"
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default FormInput;
