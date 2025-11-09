import type { ButtonProps } from "interfaces";

const Button = ({ icon, onClick, ref }: ButtonProps) => {

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button className="pokemon-filter__button" onClick={handleClick} ref={ref}>
      {icon && <img src={icon} alt="Sort Icon" />}
    </button>
  );
};

export default Button; 