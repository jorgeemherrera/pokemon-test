export interface PokemonListProps {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    id: number;
    name: string;
    image: string;
  }>;
}
