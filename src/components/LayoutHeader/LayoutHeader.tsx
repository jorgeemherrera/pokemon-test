import { useState, useRef, useEffect } from "react";
import pokeballIcon from "@assets/pokeball.svg";
import iconSortNumber from "@assets/sortNumber.svg";
import { PokemonFilter } from "@components/PokemonFilter";
import type { PokemonFilterOption } from "interfaces";
import "./LayoutHeader.scss";

export const LayoutHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortBy, setSortBy] = useState<PokemonFilterOption>("number");

  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleSort = (value: PokemonFilterOption) => {
    setSortBy(value);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="layout-header">
      <div className="layout-header__logo">
        <img
          src={pokeballIcon}
          alt="Pokémon"
          className="layout-header__logo-image"
        />
        <h1>Pokédex</h1>
      </div>

      <div className="layout-header__filters">
        <PokemonFilter typeFilter="input" />

        <div className="layout-header__sort-wrapper">
          <PokemonFilter
            typeFilter="button"
            icon={iconSortNumber}
            onClick={toggleDropdown}
            ref={buttonRef}
          />

          <div
            className={`layout-header__dropdown ${isDropdownOpen ? "open" : ""
              }`}
            ref={dropdownRef}
          >
            <div className="layout-header__dropdown-header">Sort by:</div>

            <div className="layout-header__dropdown-options">
              <PokemonFilter typeFilter="radio" label="Number" />
              <PokemonFilter typeFilter="radio" label="Name" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LayoutHeader;
