import type { StatsBarProps } from "interfaces";

const MAX_STATS: Record<string, number> = {
  hp: 255,
  attack: 181,
  defense: 230,
  specialAttack: 180,
  specialDefense: 230,
  speed: 200,
};

const StatsBar = ({ value, colorBar, stat }: StatsBarProps) => {
  const maxValue = MAX_STATS[stat] || 100;
  const relativeWidth = (value / maxValue) * 100;

  return (
    <div className={`pokemon-summary__stats--bar ${colorBar}-light`}>
      <div
        className={`bar-value ${colorBar}`}
        style={{ width: `${relativeWidth}%` }}
      ></div>
    </div>
  );
};

export default StatsBar;