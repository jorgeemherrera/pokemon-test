import type { PokemonTypeProps } from "interfaces";
import "./PokemonType.scss";

export const PokemonType = ({ type }: PokemonTypeProps) => {
  const capitalizeType = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className={`pokemon-type ${type} subtitle-3`}>
      {capitalizeType(type)}
    </div>
  );
};
