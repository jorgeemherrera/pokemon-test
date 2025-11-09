import { useState, useEffect, useRef } from "react";
import { PokemonList } from "@components/PokemonList";
import { LayoutHeader } from "@components/LayoutHeader";
import { usePokemons } from "@hooks/usePokemons";
import { useGlobalState } from "@hooks/useGlobalState";
import { useInfiniteScroll } from "@hooks/useInfiniteScroll";
import type { Pokemon } from "interfaces";
import "./Home.scss";

export const Home = () => {
  const { state, setProperty } = useGlobalState();
  const limit = 9;
  const sort = state?.sortBy;
  const [offset, setOffset] = useState(0);
  const allPokemonsRef = useRef<Pokemon[]>([]);

  const { data, isLoading, isFetching } = usePokemons({
    limit,
    offset,
    sort,
  });

  useInfiniteScroll({
    isLoading: isLoading || isFetching,
    hasMore: !!data?.next,
    onLoadMore: () => setOffset((prev) => prev + limit),
  });

  useEffect(() => {
    setOffset(0);
    allPokemonsRef.current = [];
    setProperty("pokemons", undefined);
  }, [sort]);

  useEffect(() => {
    if (data?.results) {
      if (offset === 0) {
        allPokemonsRef.current = data.results;
      } else {
        allPokemonsRef.current = [...allPokemonsRef.current, ...data.results];
      }

      setProperty("pokemons", {
        ...data,
        results: allPokemonsRef.current,
      });
    }
  }, [data, offset]);

  return (
    <div className="home">
      <LayoutHeader />
      <PokemonList />
    </div>
  );
};

export default Home;
