"use client";

import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext(undefined);

export function LanguageProvider({ children }) {
  const [lng, setLng] = useState("en");

  useEffect(() => {
    if (window.location.pathname.includes("/en")) {
      setLng("en");
    } else {
      setLng("ar");
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ lng, setLng }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (context === "undefined") {
    throw new Error("Language must be used within a Language Provider");
  }

  return context;
}
