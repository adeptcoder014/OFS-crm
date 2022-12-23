import React, { createContext, useMemo, useContext } from "react";
export const SidebarOpenContext = createContext();

const SidebarOpenProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const value = useMemo(
    () => ({
      sidebarOpen,
      setSidebarOpen,
    }),
    [sidebarOpen, setSidebarOpen]
  );

  return (
    <SidebarOpenContext.Provider value={value}>
      {children}
    </SidebarOpenContext.Provider>
  );
};

export const useSidebarOpen = () => {
  const context = useContext(SidebarOpenContext);
  if (!context)
    throw new Error("useSidebarOpen must be used inside SidebarOpenProvider");
  return context;
};

export default SidebarOpenProvider;
