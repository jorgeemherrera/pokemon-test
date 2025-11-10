import { useParams } from 'react-router-dom';
import { usePokemonById } from '@hooks/usePokemons';
import backArrowIcon from "@assets/backArrow.svg";
import { PokemonSummary } from '@components/PokemonSummary';
import type { ApiResponseDetail } from 'interfaces';
import './Detail.scss';

export const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const paddedId = `#${id?.toString().padStart(3, "0")}`;
  const { data } = usePokemonById(Number(id));



  return (
    <div className='detail'>
      <div className='detail__nav'>
        <div className='detail__nav-back'>
          <img src={backArrowIcon} alt="Back to list" />
          <h1>{data?.name}</h1>
        </div>
        <p>{paddedId}</p>
      </div>
      <div className='detail__image'>
        <img src={data?.image} alt={data?.name} />
      </div>
      <PokemonSummary summary={data as ApiResponseDetail} />
    </div>
  )
}

export default Detail; 