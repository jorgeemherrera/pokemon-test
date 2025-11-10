import type { MeasuresProps } from "interfaces";
import weightIcon from "@assets/weight.svg";
import heightIcon from "@assets/height.svg";

const Measures = ({ weight, height, moves }: MeasuresProps) => {
  return (
    <div className="pokemon-summary__about--measures">
      <div className="measure measure--weight">
        <div className="measure__icon">
          <img src={weightIcon} alt="Weight icon" />
          <div className="measure__value">{weight}</div>
        </div>
        <div className="measure__label">Weight</div>
      </div>

      <div className="measure measure--height">
        <div className="measure__icon">
          <img src={heightIcon} alt="Height icon" />
          <div className="measure__value">{height}</div>
        </div>
        <div className="measure__label">Height</div>
      </div>

      <div className="measure measure--moves">
        <div className="measure__value">
          {moves?.join(", ") || "—"}
        </div>
        <div className="measure__label">Moves</div>
      </div>
    </div>
  );
};

export default Measures;
