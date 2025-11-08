import { PokemonCard } from "@components/PokemonCard";
import type { PokemonListProps } from "interfaces";
import "./PokemonList.scss";

export const PokemonList = ({
  count,
  next,
  previous,
  results,
}: PokemonListProps) => {
  return (
    <div className="pokemon-list">
      {results.map((pokemon) => (
        <PokemonCard key={pokemon.id} {...pokemon} />
      ))}
    </div>
  );
};

export default PokemonList;
