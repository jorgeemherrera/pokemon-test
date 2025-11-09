import { useState } from "react";
import searchIcon from "@assets/search.svg";
import closeIcon from "@assets/close.svg";
import type { InputProps } from "interfaces";

const Input = ({ onChange, onClick }: InputProps) => {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange?.(e);
  };

  const handleClear = () => {
    setValue("");
    onClick?.();
  };

  return (
    <div className="pokemon-filter__input">
      <img src={searchIcon} alt="Search Icon" />

      <input
        type="text"
        placeholder="Search Pokémon..."
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
