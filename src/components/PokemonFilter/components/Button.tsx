import type { ButtonProps } from "interfaces";

const Button = ({ icon, label, onClick, ref }: ButtonProps) => {

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button className="pokemon-filter__button" onClick={handleClick} ref={ref}>
      {icon && <img src={icon} alt="Sort Icon" />}
      {label && <span>{label}</span>}
    </button>
  );
};

export default Button; 