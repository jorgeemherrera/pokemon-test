import type { PokemonSummaryProps, PokemonTypeProps } from "interfaces";
import StatsBar from "./components/StatsBar";
import weightIcon from "@assets/weight.svg";
import heightIcon from "@assets/height.svg";
import MeasureItem from "./components/MeasureItem";
import { PokemonType } from "@components/PokemonType";
import "./PokemonSummary.scss";

export const PokemonSummary = ({ summary }: PokemonSummaryProps) => {
  if (!summary) return null;

  const statKeys = [
    { key: "hp", label: "HP" },
    { key: "attack", label: "ATK" },
    { key: "defense", label: "DEF" },
    { key: "specialAttack", label: "SATK" },
    { key: "specialDefense", label: "SDEF" },
    { key: "speed", label: "SPD" },
  ] as const;

  const pokemonColor = `${summary.types[0]}`

  return (
    <div className="pokemon-summary">
      <div className="pokemon-summary__types">
        {summary.types.map((type, key) => (
          <PokemonType type={type as PokemonTypeProps["type"]} key={key} />
        ))}
      </div>

      <h2 className={`pokemon-summary__title ${pokemonColor}-text`}>About</h2>
      <div className="pokemon-summary__about">
        <div className="pokemon-summary__measures">
          <MeasureItem
            value={summary?.weight}
            unit="Weight"
            icon={weightIcon}
          />
          <div className="pokemon-summary__divider" />
          <MeasureItem
            value={summary?.height}
            unit="Height"
            icon={heightIcon}
          />
          <div className="pokemon-summary__divider" />
          <MeasureItem value={summary?.abilities} unit="Moves" />
        </div>

        <p className="pokemon-summary__description body-3">{summary.description}</p>
      </div>

      <h2 className={`pokemon-summary__title ${pokemonColor}-text`}>Base Stats</h2>
      <div className="pokemon-summary__stats">
        <div className="pokemon-summary__skills">
          {statKeys.map(({ key, label }) => (
            <span className={`skill ${pokemonColor}-text subtitle-3`} key={key}>
              {label}
            </span>
          ))}
        </div>

        <div className="pokemon-summary__divider" />

        <div className="pokemon-summary__bars">
          {statKeys.map(({ key }) => (
            <div className="stats body-3" key={key}>
              {summary.stats[key].toString().padStart(3, "0")}
              <StatsBar value={summary.stats[key]} colorBar={pokemonColor} stat={key} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonSummary;
