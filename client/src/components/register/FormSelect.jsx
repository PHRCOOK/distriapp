import React from "react";

const FormSelect = ({
  id,
  label,
  value,
  onChange,
  options,
  required = false,
}) => {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}:
      </label>
      <select
        id={id}
        className="form-control"
        value={value}
        onChange={onChange}
        required={required}
      >
        <option value="">Selecciona un departamento</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
