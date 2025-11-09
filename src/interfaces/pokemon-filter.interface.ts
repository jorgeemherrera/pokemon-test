export interface PokemonFilterProps {
  typeFilter: "input" | "button" | "checkbox" | "radio";
  icon?: string;
  label?: string;
  checked?: boolean;
  onClick?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  ref?: React.RefObject<HTMLButtonElement | null>;
}

export interface ButtonProps {
  icon?: string;
  label?: string;
  checked?: boolean;
  onClick?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  ref?: React.RefObject<HTMLButtonElement | null>;
}

export interface InputProps {
  onClick?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export type PokemonSortOption = "number" | "name" | "none";
