export interface PokemonSummaryProps {
  summary: {
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
  };
}

export interface StatsBarProps {
  value: number;
}

export interface MeasuresProps {
  weight: string;
  height: string;
  moves: string[];
}
