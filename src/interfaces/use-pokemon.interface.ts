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

export interface UseFetchOptions {
  params?: Record<string, string | number>;
  url: string;
}
