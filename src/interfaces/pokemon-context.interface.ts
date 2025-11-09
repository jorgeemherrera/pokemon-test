import type { PokemonSortOption } from "./pokemon-filter.interface";
import type { ApiResponse } from "./use-pokemon.interface";

export interface GlobalState {
  pokemons?: ApiResponse;
  sortBy?: PokemonSortOption;
  search?: string;
}

export interface GlobalContextType {
  state?: GlobalState;
  setState?: React.Dispatch<React.SetStateAction<GlobalState>>;
  setProperty: <K extends keyof GlobalState>(
    key: K,
    value: GlobalState[K]
  ) => void;
}
