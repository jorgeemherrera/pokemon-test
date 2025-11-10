import type { LayoutSpinnerProps } from "interfaces";
import "./LayoutSpinner.scss";

export const LayoutSpinner = ({
  size = "medium",
  color = "black",
  icon,
}: LayoutSpinnerProps) => {
  return (
    <div
      className={`layout-spinner ${size} ${icon ? "with-icon" : ""}`}
      style={{ borderColor: color }}
    >
      {icon && (
        <img src={icon} alt="Pokeball spinner" className="spinner-icon" />
      )}
    </div>
  );
};

export default LayoutSpinner;
