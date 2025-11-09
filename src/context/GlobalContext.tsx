import type { GlobalContextType } from "interfaces";
import { createContext } from "react";

export const GlobalContext = createContext<GlobalContextType | undefined>(undefined);