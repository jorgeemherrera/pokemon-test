import type { PokemonCardProps } from "interfaces";
import { useNavigate } from "react-router-dom";
import "./PokemonCard.scss";

export const PokemonCard = ({ id, image, name }: PokemonCardProps) => {
  const navigate = useNavigate();
  const paddedId = `#${id.toString().padStart(3, "0")}`;

  const handleClick = () => {
    navigate(`/pokemon/${id}`);
  }

  return (
    <article className="pokemon-card" onClick={handleClick}>
      <header className="pokemon-card__header">
        <span className="pokemon-card__id">{paddedId}</span>
      </header>
      <div className="pokemon-card__image">
        <img src={image} alt={name} />
      </div>
      <div className="pokemon-card__name">
        <p>{name}</p>
      </div>
    </article>
  );
};

export default PokemonCard;
