import type { StatsProps } from "interfaces";
import StatsBar from "./StatsBar";

const Stats = ({ stats, pokemonColor }: StatsProps) => {
  const statKeys = [
    { key: "hp", label: "HP" },
    { key: "attack", label: "ATK" },
    { key: "defense", label: "DEF" },
    { key: "specialAttack", label: "SATK" },
    { key: "specialDefense", label: "SDEF" },
    { key: "speed", label: "SPD" },
  ] as const;

  return (
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
        {stats
          ? statKeys.map(({ key }) => (
            <div className="stats body-3" key={key}>
              <span className="stat-value">
                {stats[key].toString().padStart(3, "0")}
              </span>
              <StatsBar value={stats[key]} colorBar={pokemonColor} stat={key} />
            </div>
          ))
          : statKeys.map(({ key }) => (
            <div className="stats body-3" key={key}>
              999
              <StatsBar value={99} colorBar="normal" stat={key} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Stats;
