import type { PokemonCardProps } from "interfaces";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import imageSkeleton from "@assets/skeleton.svg";
import "./PokemonCard.scss";
import { capitalizeText } from "@utils/utils";

export const PokemonCard = ({ id, image, name }: PokemonCardProps) => {
  const navigate = useNavigate();
  const paddedId = `#${id.toString().padStart(3, "0")}`;
  const [imgSrc, setImgSrc] = useState(image || imageSkeleton);

  const handleClick = () => {
    navigate(`/pokemon/${id}`);
  }

  const handleImageError = () => {
    setImgSrc(imageSkeleton);
  };

  return (
    <article className="pokemon-card" onClick={handleClick}>
      <header className="pokemon-card__header">
        <span className="pokemon-card__id">{paddedId}</span>
      </header>
      <div className="pokemon-card__image">
        <img src={imgSrc} alt={name} onError={handleImageError} />
      </div>
      <div className="pokemon-card__name">
        <p>{capitalizeText(name)}</p>
      </div>
    </article>
  );
};

export default PokemonCard; 