import type { PokemonSummaryProps, PokemonTypeProps } from "interfaces";
import { PokemonType } from "@components/PokemonType";
import Stats from "./components/Stats";
import About from "./components/About";
import "./PokemonSummary.scss";

export const PokemonSummary = ({ summary }: PokemonSummaryProps) => {
  const pokemonColor = summary ? `${summary?.types[0]}` : 'normal';

  return (
    <div className="pokemon-summary">
      <div className="pokemon-summary__types">
        {summary?.types && summary.types.length > 0 ? (
          summary?.types.map((type, key) => (
            <PokemonType type={type as PokemonTypeProps["type"]} key={key} />
          ))
        ) : (
          <>
            <PokemonType type="type" />
            <PokemonType type="type" />
          </>
        )}
      </div>

      <h2 className={`pokemon-summary__title ${pokemonColor}-text`}>About</h2>
      <About
        weight={summary?.weight}
        height={summary?.height}
        description={summary?.description}
        abilities={summary?.abilities}
      />

      <h2 className={`pokemon-summary__title ${pokemonColor}-text`}>
        Base Stats
      </h2>

      <Stats stats={summary?.stats} pokemonColor={pokemonColor} />
    </div>
  );
};

export default PokemonSummary;
