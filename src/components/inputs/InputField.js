import React from "react";

function InputField({
  value,
  handleChange,
  name,
  type,
  id,
  placeHolder,
  label,
  icon,
  required,
}) {
  return (
    <div className="w-full h-14 relative flex">
      <div className="w-full h-full">
        {value.length > 0 && (
          <label
            htmlFor={id}
            className="text-xs text-active absolute bg-white p-px -top-2 left-3"
          >
            {label}
          </label>
        )}
        <input
          className="w-full border border-gray-30 h-full p-3 outline-active outline-1 rounded-lg placeholder:text-gray-30"
          type={type}
          id={id}
          name={name}
          placeholder={placeHolder}
          onChange={handleChange}
          value={value}
          required={required}
        />
      </div>
      {icon && <div className="w-1/5"></div>}
    </div>
  );
}

export default InputField;
