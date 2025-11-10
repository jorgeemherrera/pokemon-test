import { useState } from "react";
import closeIcon from "@assets/close.svg";
import type { InputProps } from "interfaces";

const Input = ({ onChange, onClick, placeholder, icon, type }: InputProps) => {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange?.(e);
  };

  const handleClear = () => {
    setValue("");
    onClick?.();
    onChange?.({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="pokemon-filter__input">
      {icon && <img src={icon} alt="Search Icon" />}

      <input
        type={type ? type : "text"}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />

      {value && (
        <img
          src={closeIcon}
          alt="Close Icon"
          className="clear"
          onClick={handleClear}
        />
      )}
    </div>
  );
};

export default Input;
