export interface Pokemon {
  id: number;
  name: string;
  image: string;
}

export interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

export interface ApiResponseDetail {
  id: number;
  name: string;
  image: string;
  types: string[];
  weight: string;
  height: string;
  abilities: string[];
  description: string;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
}

export interface UseFetchOptions {
  params?: Record<string, string | number>;
  url: string;
}
