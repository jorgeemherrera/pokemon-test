import type { ButtonProps } from "interfaces";

const Radio = ({ label, checked, onChange }: ButtonProps) => {

  return (
    <label className="pokemon-filter__radio">
      <input type="radio" onChange={onChange} name="radio-button" value={label} checked={checked} />
      <span className="radiomark"></span>
      {label}
    </label>
  );
};

export default Radio;