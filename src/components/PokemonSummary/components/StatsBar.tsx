import type { StatsBarProps } from "interfaces";

const StatsBar = ({ value }: StatsBarProps) => {
  return (
    <div className="pokemon-summary__stats--bar">
      <div
        className="bar-value"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};

export default StatsBar;