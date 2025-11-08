import type { ButtonProps } from "interfaces";

const Button = ({ icon }: ButtonProps) => {
  return (
    <button className="pokemon-filter__button">
      {icon && <img src={icon} alt="Sort Icon" />}
    </button>
  );
};

export default Button; 