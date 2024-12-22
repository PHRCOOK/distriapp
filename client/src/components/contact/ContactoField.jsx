import React from "react";

const ContactoField = ({
  label,
  id,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  rows,
}) => (
  <div className="mb-3">
    <label htmlFor={id} className="form-label">
      {label}
    </label>
    {type === "textarea" ? (
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="form-control"
        placeholder={placeholder}
        rows={rows}
        required={required}
      />
    ) : (
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="form-control"
        placeholder={placeholder}
        required={required}
      />
    )}
  </div>
);

export default ContactoField;
