import React, { createContext, useMemo, useContext } from "react";
export const DarkModeContext = createContext();

const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = React.useState(false);

  const value = useMemo(
    () => ({
      darkMode,
      setDarkMode,
    }),
    [darkMode,setDarkMode]
  );

  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context)
    throw new Error(
      "useDarkMode must be used inside DarkModeProvider"
    );
  return context;
};

export default DarkModeProvider;
