
import { PokemonList } from "@components/PokemonList"
import "./Home.scss";
import { LayoutHeader } from "@components/LayoutHeader";

export const Home = () => {
  return (
    <div className="home">
      <LayoutHeader />
      <PokemonList />
    </div>
  );
};
export default Home;
