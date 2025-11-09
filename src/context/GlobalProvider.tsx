import type { GlobalState } from 'interfaces';
import { useState, type ReactNode } from 'react';
import { GlobalContext } from './GlobalContext';


export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<GlobalState>({
    pokemons: undefined,
    sortBy: 'number',
    search: ''
  });

  const setProperty = <K extends keyof GlobalState>(
    key: K,
    value: GlobalState[K]
  ) => {
    setState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };


  return (
    <GlobalContext.Provider value={{ state, setState, setProperty }}>
      {children}
    </GlobalContext.Provider>
  );
};

