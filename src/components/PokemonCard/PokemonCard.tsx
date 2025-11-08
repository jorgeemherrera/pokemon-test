import type { PokemonCardProps } from "interfaces";
import "./PokemonCard.scss";

export const PokemonCard = ({ id, image, name }: PokemonCardProps) => {
  const paddedId = `#${id.toString().padStart(3, "0")}`;

  return (
    <article className="pokemon-card">
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
