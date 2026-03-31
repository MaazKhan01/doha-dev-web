"use client";

import { createContext, useContext, useState } from "react";

const LoadingContext = createContext(undefined);

export function LoadingProvider({ children }) {
  const [load, setLoad] = useState(false);

  return (
    <LoadingContext.Provider value={{ load, setLoad }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoader() {
  const context = useContext(LoadingContext);

  if (context === "undefined") {
    throw new Error("Loading must be used within a Loading Provider");
  }

  return context;
}
