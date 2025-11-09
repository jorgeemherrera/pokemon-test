import type { ButtonProps } from "interfaces";

const Radio = ({ label, onClick }: ButtonProps) => {

  const handleChange = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <label className="pokemon-filter__radio">
      <input type="radio" onChange={handleChange} name="radio-button" />
      <span className="radiomark"></span>
      {label}
    </label>
  );
};

export default Radio;