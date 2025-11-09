export interface PokemonFilterProps {
  typeFilter: "input" | "button" | "checkbox" | "radio";
  icon?: string;
  label?: string;
  onClick?: () => void;
  ref?: React.RefObject<HTMLButtonElement | null>;
}

export interface ButtonProps {
  icon?: string;
  label?: string;
  onClick?: () => void;
  ref?: React.RefObject<HTMLButtonElement | null>;
}

export type PokemonFilterOption = "number" | "name";
