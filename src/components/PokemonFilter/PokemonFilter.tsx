import type { PokemonFilterProps } from "interfaces";
import Input from "./components/Input";
import Button from "./components/Button";
import Checkbox from "./components/Checkbox";
import Radio from "./components/Radio";
import "./PokemonFilter.scss";

export const PokemonFilter = ({
  typeFilter,
  icon,
  label,
  checked,
  placeholder,
  onClick,
  onChange,
  ref,
}: PokemonFilterProps) => {
  return (
    <div className="pokemon-filter">
      {typeFilter === "input" && (
        <Input onChange={onChange} onClick={onClick} placeholder={placeholder} icon={icon} />
      )}
      {typeFilter === "input-password" && (
        <Input onChange={onChange} onClick={onClick} placeholder={placeholder} icon={icon} type="password" />
      )}
      {typeFilter === "button" && (
        <Button icon={icon} onClick={onClick} ref={ref} />
      )}
      {typeFilter === "checkbox" && <Checkbox />}
      {typeFilter === "radio" && (
        <Radio label={label} onClick={onClick} onChange={onChange} checked={checked} />
      )}
    </div>
  );
};
