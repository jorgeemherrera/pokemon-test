import { useState, useRef, useEffect } from "react";
import pokeballIcon from "@assets/pokeball.svg";
import iconSortNumber from "@assets/sortNumber.svg";
import iconSortName from "@assets/sortName.svg";
import iconSort from "@assets/sort.svg";
import iconSearch from "@assets/search.svg";
import { PokemonFilter } from "@components/PokemonFilter";
import { usePokemonBySearch } from "@hooks/usePokemons";
import { useGlobalState } from "@hooks/useGlobalState";
import type { PokemonSortOption } from "interfaces";
import { LayoutSpinner } from "@components/LayoutSpinner";
import "./LayoutHeader.scss";

export const LayoutHeader = () => {
  const { setProperty } = useGlobalState();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<PokemonSortOption>("number");

  const { data, isLoading } = usePokemonBySearch(search, sort);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleSort = (event: React.ChangeEvent<HTMLInputElement>) => {
    const sort = event.target.value.toLowerCase() as PokemonSortOption;
    setSort(sort);
    setProperty("sortBy", sort);
    setIsDropdownOpen(false);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value.trim();

    if (input.startsWith("#")) {
      const numeric = input.replace("#", "").replace(/^0+/, "");
      setSearch(numeric || "0");
    } else {
      setSearch(input);
    }
  };

  const handleCleanSearch = () => {
    setSearch("");
  };

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

  useEffect(() => {
    setProperty("pokemons", data);
  }, [data]);

  useEffect(() => {
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
        <PokemonFilter
          typeFilter="input"
          placeholder="Search"
          icon={iconSearch}
          onChange={handleSearch}
          onClick={handleCleanSearch}
        />

        <div className="layout-header__sort-wrapper">
          <PokemonFilter
            typeFilter="button"
            icon={
              !sort ? iconSort : sort === "name" ? iconSortName : iconSortNumber
            }
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
              <PokemonFilter
                typeFilter="radio"
                label="Number"
                onChange={handleSort}
                checked={sort === "number"}
              />
              <PokemonFilter
                typeFilter="radio"
                label="Name"
                onChange={handleSort}
                checked={sort === "name"}
              />
            </div>
          </div>
        </div>
      </div>
      {isLoading && (
        <div className="spinner-overlay">
          <LayoutSpinner size="medium" color="red" icon="" />
        </div>
      )}
    </header>
  );
};

export default LayoutHeader;
