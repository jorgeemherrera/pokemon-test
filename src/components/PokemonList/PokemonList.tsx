import { PokemonCard } from "@components/PokemonCard";
import { useGlobalState } from "@hooks/useGlobalState";
import { LayoutSpinner } from "@components/LayoutSpinner";
import iconPokeball from "@assets/pokeball-spinner.svg";
import "./PokemonList.scss";

export const PokemonList = ({ loading }: { loading: boolean }) => {
  const { state } = useGlobalState();
  const { pokemons } = state!;

  return (
    <div className="pokemon-list-container">
      <div className="pokemon-list">
        {pokemons?.results.map((pokemon) => (
          <PokemonCard key={pokemon.id} {...pokemon} />
        ))}

        {loading && (
          <div className="spinner-overlay">
            <LayoutSpinner size="medium" color="red" icon={iconPokeball} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonList;
