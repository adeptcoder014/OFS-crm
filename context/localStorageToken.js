import React, {
  createContext,
  useMemo,
  useContext,
  useEffect,
  useState,
} from "react";
//===============================================
export const TokenContext = createContext();

const TokenProvider = ({ children }) => {
  const [token, setToken] = useState({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("Token");
      // const value = useMemo(
      //   () => ({
      //     token,
      //   }),
      //   [token]
      // );
      // const value = token;
      setToken(token);
    }
  }, []);
  return (
    <TokenContext.Provider value={token}>{children}</TokenContext.Provider>
  );
};

export const useToken = () => {
  const context = useContext(TokenContext);
  if (!context) throw new Error("useToken must be used inside TokenProvider");
  return context;
};

export default TokenProvider;
