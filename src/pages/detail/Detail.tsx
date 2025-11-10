import { useNavigate, useParams } from "react-router-dom";
import { usePokemonById } from "@hooks/usePokemons";
import backArrowIcon from "@assets/backArrow.svg";
import prevArrowIcon from "@assets/prevArrow.svg";
import nextArrowIcon from "@assets/nextArrow.svg";
import skeletonImage from "@assets/skeleton.svg";
import iconPokeball from "@assets/pokeball-spinner.svg";
import { PokemonSummary } from "@components/PokemonSummary";
import type { ApiResponseDetail } from "interfaces";
import { capitalizeText } from "@utils/utils";
import { LayoutSpinner } from "@components/LayoutSpinner";
import "./Detail.scss";

export const Detail = () => {
  const { id: paramId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const currentId = Number(paramId);
  const { data, isLoading } = usePokemonById(currentId);

  const pokemonColor = `${data?.types[0]}`;
  const paddedId = `#${currentId.toString().padStart(3, "0")}`;

  const prevPokemon = () => {
    if (currentId > 1) navigate(`/pokemon/${currentId - 1}`);
  };

  const nextPokemon = () => {
    navigate(`/pokemon/${currentId + 1}`);
  };

  const backPage = () => {
    navigate("/");
  };

  return (
    <div className={`detail ${pokemonColor}`}>
      <div className="detail__nav">
        <div className="detail__nav-back">
          <div className="name">
            <img
              src={backArrowIcon}
              alt="Back to list"
              onClick={backPage}
              height="25"
              width="25"
            />
            <h1 className="headline">{capitalizeText(data?.name)}</h1>
          </div>
          <p className="id subtitle-2">{paddedId}</p>
        </div>
      </div>
      <div className="detail__image">
        <img
          src={data?.image || skeletonImage}
          alt={data?.name}
          key={data?.image || skeletonImage}
        />
        {currentId > 1 && (
          <button className="detail__image--arrow left" onClick={prevPokemon}>
            <img src={prevArrowIcon} alt="Previous" />
          </button>
        )}
        <button className="detail__image--arrow right" onClick={nextPokemon}>
          <img src={nextArrowIcon} alt="Next" />
        </button>
      </div>
      <PokemonSummary summary={data as ApiResponseDetail} />

      {isLoading && (
        <div className="spinner-overlay">
          <LayoutSpinner size="medium" color="red" icon={iconPokeball} />
        </div>
      )}
    </div>
  );
};

export default Detail;
