import type { PokemonSummaryProps } from "interfaces";
import StatsBar from "./components/StatsBar";
import "./PokemonSummary.scss";
import Measures from "./components/Measure";

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

  return (
    <div className="pokemon-summary">

      <h2 className="pokemon-summary__title">About</h2>
      <div className="pokemon-summary__about">
        <div className="pokemon-summary__about">
          <div className="pokemon-summary__measures">
            <Measures weight={summary?.weight} height={summary?.height} moves={summary.abilities} />
          </div>
        </div>
      </div>


      <h2 className="pokemon-summary__title">Base Stats</h2>
      <div className="pokemon-summary__stats">
        <div className="pokemon-summary__skills">
          {statKeys.map(({ key, label }) => (
            <span className="skill" key={key}>
              {label}
            </span>
          ))}
        </div>

        <div className="pokemon-summary__divider" />

        <div className="pokemon-summary__bars">
          {statKeys.map(({ key }) => (
            <div className="stats" key={key}>
              {summary.stats[key].toString().padStart(3, "0")}
              <StatsBar value={summary.stats[key]} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonSummary;
