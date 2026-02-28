import { createContext, useState, useContext } from "react";

const CryptoContext = createContext();

export const CryptoProvider = ({ children }) => {
  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useState("USD");
  const [chartType, setChartType] = useState("line"); // 1. Define the state

  return (
    // 2. IMPORTANT: Include chartType and setChartType in this object
    <CryptoContext.Provider value={{ coins, setCoins, currency, setCurrency, chartType, setChartType }}>
      {children}
    </CryptoContext.Provider>
  );
};

export const useCrypto = () => useContext(CryptoContext);
