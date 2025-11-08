import searchIcon from "@assets/search.svg";
import closeIcon from "@assets/close.svg";

const Input = () => {
  return (
    <div className="pokemon-filter__input">
      <img src={searchIcon} alt="Search Icon" />
      <input type="text" placeholder="Search Pokémon..." />
      <img src={closeIcon} alt="Close Icon" className="clear" />
    </div>
  );
};

export default Input; 