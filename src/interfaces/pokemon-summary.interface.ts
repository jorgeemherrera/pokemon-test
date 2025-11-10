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
  colorBar: string;
  stat: string;
}

export interface MeasuresProps {
  value: string | string[];
  unit: string;
  icon?: string;
}
