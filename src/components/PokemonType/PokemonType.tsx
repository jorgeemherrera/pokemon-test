import type { PokemonTypeProps } from "interfaces";
import { capitalizeText } from "@utils/utils";
import "./PokemonType.scss";

export const PokemonType = ({ type }: PokemonTypeProps) => {

  return (
    <div className={`pokemon-type ${type} subtitle-3`}>
      {capitalizeText(type)}
    </div>
  );
};
