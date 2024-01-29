import React, { useState } from "react";
import eye from "../../assets/icons/eye.svg";

function PasswordField({
  value,
  handleChange,
  name,
  id,
  placeHolder,
  label,
  required,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showOutline, setShowOutline] = useState(false);
  return (
    <div
      className={`w-full border ${
        showOutline ? "border-primary-50" : "border-gray-30"
      }  h-14 relative flex rounded-lg outline-primary-50 outline-1 ${
        showOutline ? "outline" : ""
      }`}
    >
      <div className="w-full h-full">
        {value?.length > 0 && (
          <label
            htmlFor={id}
            className="text-xs text-primary-50 absolute bg-white p-px -top-2 left-3"
          >
            {label}
          </label>
        )}
        <input
          className="w-full h-full p-3 placeholder:text-gray-30 outline-none rounded-lg"
          type={`${showPassword ? "text" : "password"}`}
          id={id}
          name={name}
          placeholder={placeHolder}
          onChange={handleChange}
          value={value}
          required={required}
          onFocus={() => {
            setShowOutline(true);
          }}
          onBlur={() => {
            setShowOutline(false);
          }}
        />
      </div>
      <div
        onClick={() => {
          setShowPassword((prev) => (prev = !prev));
        }}
        className="w-12 flex justify-center items-center hover:bg-gray-10 hover:cursor-pointer"
      >
        <img src={eye} alt="" />
      </div>
    </div>
  );
}

export default PasswordField;
