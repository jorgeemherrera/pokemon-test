import { PokemonType } from '@components/PokemonType';
import './Home.scss';
import { PokemonCard } from '@components/PokemonCard';

export const Home = () => {
  return (
    <div className='home'>
      <PokemonType type="bug" />
      <PokemonCard id={1} image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png" name="Bulbasaur" />
    </div>
  )
}
export default Home; 