import { PokemonCard } from "@components/PokemonCard";
import { useGlobalState } from "@hooks/useGlobalState";
import "./PokemonList.scss";

export const PokemonList = () => {
  const { state } = useGlobalState();
  const { pokemons } = state!;

  return (
    <div className="pokemon-list">
      {pokemons?.results.map((pokemon) => (
        <PokemonCard key={pokemon.id} {...pokemon} />
      ))}
    </div>
  );
};

export default PokemonList;
