import { useState, useRef, useEffect } from "react";
import { useFetchCrypto } from "../hooks/useFetchCrypto";
import { useCrypto } from "../context/CryptoContext";
import MarketChart from "../components/MarketChart";

const Home = () => {
  const searchRef = useRef(null);
  const [search, setSearch] = useState("");
  const { coins, currency, setCurrency } = useCrypto();
  const { loading, error } = useFetchCrypto();

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-slate-950 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white mb-2 md:mb-0">Crypto Market Dashboard</h1>
        <div className="flex gap-3 items-center">
          <label className="text-white font-medium">Currency:</label>
          <select
            className="p-2 rounded-lg"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
      </div>

      {/* Search */}
      <input
        ref={searchRef}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search coins..."
        className="p-2 rounded-lg w-full mb-4 text-black"
      />

      {/* Loading/Error */}
      {loading && <p className="text-white">Scanning Blockchain...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Chart */}
      <MarketChart />

      {/* Coin Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {filteredCoins.map((coin) => (
          <div
            key={coin.id}
            className="p-4 rounded-xl bg-gray-800 flex justify-between items-center hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-3">
              <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
              <div>
                <span className="text-white font-semibold">{coin.name}</span>
                <p className="text-gray-400 text-sm">{coin.symbol.toUpperCase()}</p>
              </div>
            </div>
            <div className="text-right">
              <p
                className={
                  coin.price_change_percentage_24h >= 0
                    ? "text-green-400 font-bold"
                    : "text-red-500 font-bold"
                }
              >
                ${coin.current_price.toLocaleString()}
              </p>
              <p
                className={
                  coin.price_change_percentage_24h >= 0
                    ? "text-green-400 text-sm"
                    : "text-red-500 text-sm"
                }
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;