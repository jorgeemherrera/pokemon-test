import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import type { ApiResponse } from "interfaces";

const BASE_URL = 'http://localhost:3000/api';

const fetchPokemons = async ({
  limit = 9,
  offset = 0,
  sort = "number",
}: {
  limit?: number;
  offset?: number;
  sort?: string;
}) => {
  const res = await fetch(
    `${BASE_URL}/pokemons?limit=${limit}&offset=${offset}&sort=${sort}`
  );
  if (!res.ok) throw new Error("Error loading data");
  return res.json() as Promise<ApiResponse>;
};

export const usePokemons = ({
  limit = 9,
  offset = 0,
  sort = "number"
}: { limit?: number; offset?: number, sort?: string } = {}) => {
  return useQuery({
    queryKey: ["pokemons", { limit, offset, sort }],
    queryFn: () => fetchPokemons({ limit, offset, sort }),
    staleTime: 1000 * 60 * 5,
  });
};

const fetchPokemonById = async (id: number) => {
  const res = await fetch(`${BASE_URL}/pokemons/${id}`);
  if (!res.ok) throw new Error("Error loading data");
  return res.json() as Promise<any>;
};

export const usePokemonById = (id: number) => {
  return useQuery({
    queryKey: ["pokemon", id],
    queryFn: () => fetchPokemonById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

const fetchPokemonBySearch = async (search: string) => {
  const res = await fetch(
    `${BASE_URL}/pokemons/search/${search}`
  );
  if (!res.ok) throw new Error("Error searching data");
  return res.json() as Promise<ApiResponse>;
};

export const usePokemonBySearch = (search: string, sort?: string) => {
  const debouncedSearch = useDebounce(search, 300);
  console.log(sort)
  return useQuery({
    queryKey: ["pokemonSearch", debouncedSearch, sort],
    queryFn: async () => {
      if (!debouncedSearch.trim()) {
        return fetchPokemons({ limit: 9, offset: 0, sort });
      }
      return fetchPokemonBySearch(debouncedSearch);
    },
    staleTime: 1000 * 60 * 5,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
