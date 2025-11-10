import { useNavigate, useParams } from "react-router-dom";
import { usePokemonById } from "@hooks/usePokemons";
import backArrowIcon from "@assets/backArrow.svg";
import prevArrowIcon from "@assets/prevArrow.svg";
import nextArrowIcon from "@assets/nextArrow.svg";
import { PokemonSummary } from "@components/PokemonSummary";
import type { ApiResponseDetail } from "interfaces";
import "./Detail.scss";
import { capitalizeText } from "@utils/utils";

export const Detail = () => {
  const { id: paramId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const currentId = Number(paramId);
  const { data } = usePokemonById(currentId);

  const maxPokemons = 1025;
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
        <img src={data?.image} alt={data?.name} />
        {currentId > 1 && (
          <button className="detail__image--arrow left" onClick={prevPokemon}>
            <img src={prevArrowIcon} alt="Previous" />
          </button>
        )}
        {currentId < maxPokemons && (
          <button className="detail__image--arrow right" onClick={nextPokemon}>
            <img src={nextArrowIcon} alt="Next" />
          </button>
        )}
      </div>
      <PokemonSummary summary={data as ApiResponseDetail} />
    </div>
  );
};

export default Detail;
