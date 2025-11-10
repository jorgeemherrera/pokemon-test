import { capitalizeText } from "@utils/utils";
import type { MeasuresProps } from "interfaces";

const MeasureItem = ({ value, unit, icon }: MeasuresProps) => {
  return (
    <div className="pokemon-summary__about--measures">
      <div className="measure measure--value">
        <div className="measure__icon">
          {icon && <img src={icon} alt={`${unit} icon`} />}
          <div className="measure__value body-3">
            {Array.isArray(value)
              ? value.map((v, i) => <div key={i}>{capitalizeText(v)}</div>)
              : value}
          </div>
        </div>
        <div className="measure__label caption">{unit}</div>
      </div>
    </div>
  );
};

export default MeasureItem;
