import type { PokemonFilterProps } from "interfaces";
import Input from "./components/Input";
import Button from "./components/Button";
import Checkbox from "./components/Checkbox";
import Radio from "./components/Radio";
import "./PokemonFilter.scss";

export const PokemonFilter = ({ typeFilter, icon }: PokemonFilterProps) => {
  //TODO: send the children a handler to execute fetch.
  return (
    <div className="pokemon-filter">
      {typeFilter === "input" && <Input />}
      {typeFilter === "button" && <Button icon={icon} />}
      {typeFilter === "checkbox" && <Checkbox />}
      {typeFilter === "radio" && <Radio />}
    </div>
  );
};
