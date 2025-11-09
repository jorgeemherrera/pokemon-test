import { GlobalContext } from "@context/GlobalContext";
import { useContext } from "react";

export const useGlobalState = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal must be used within GlobalProvider");
  }
  return context;
};