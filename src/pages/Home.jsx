import { useState, useRef, useEffect } from "react";
import { useFetchCrypto } from "../hooks/useFetchCrypto";
import { useCrypto } from "../context/CryptoContext";
import MarketChart from "../components/MarketChart";

const Home = () => {
  const searchRef = useRef(null);
  const [search, setSearch] = useState("");
  const { coins, currency } = useCrypto();
  const { loading, error } = useFetchCrypto();

  // Focus on search input when page loads
  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  // Filter coins based on search
  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  // Helper to format price with currency symbol
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 2,
    }).format(price);
  };

  return (
    <div className="p-6 bg-slate-950 min-h-screen">

      {/* ================= HEADER ================= */}
      <h1 className="text-3xl font-bold text-white mb-6">
        Crypto Market Dashboard
      </h1>

      {/* ================= SEARCH BAR ================= */}
      <div className="mb-4">
        <input
          ref={searchRef}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search assets..."
          className="
            bg-gray-800 text-white placeholder-gray-400 
            w-32 focus:w-64 transition-all duration-300 ease-in-out 
            px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500
          "
        />
      </div>

      {/* ================= LOADING / ERROR ================= */}
      {loading && <p className="text-white mb-4">Scanning Blockchain...</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* ================= MARKET CHART ================= */}
      <MarketChart />

      {/* ================= COIN CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {filteredCoins.map((coin) => (
          <div
            key={coin.id}
            className="p-4 rounded-xl bg-gray-800 flex justify-between items-center hover:shadow-lg transition-shadow"
          >
            {/* Coin Logo + Name */}
            <div className="flex items-center gap-3">
              <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
              <div>
                <span className="text-white font-semibold">{coin.name}</span>
                <p className="text-gray-400 text-sm">{coin.symbol.toUpperCase()}</p>
              </div>
            </div>

            {/* Price + 24h Change */}
            <div className="text-right">
              <p
                className={
                  coin.price_change_percentage_24h >= 0
                    ? "text-green-400 font-bold"
                    : "text-red-500 font-bold"
                }
              >
                {formatPrice(coin.current_price)}
              </p>
              <p
                className={
                  coin.price_change_percentage_24h >= 0
                    ? "text-green-400 text-sm"
                    : "text-red-500 text-sm"
                }
              >
                {coin.price_change_percentage_24h?.toFixed(2)}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;