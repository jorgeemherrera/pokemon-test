import { PokemonType } from '@components/PokemonType';
import './Home.scss';

export const Home = () => {
  return (
    <div className='home'>
      <PokemonType type="bug" />
    </div>
  )
}
export default Home; 