import { useRef, useEffect } from "react";
import { useFetchCrypto } from "../hooks/useFetchCrypto";
import { useCrypto } from "../context/CryptoContext";
import MarketChart from "../components/MarketChart";
import useLocalStorage from "../hooks/useLocalStorage";

const Home = () => {
  const searchRef = useRef(null);
  const { coins, currency } = useCrypto();
  const { loading, error } = useFetchCrypto();
  const [searchQuery, setSearchQuery] = useLocalStorage("searchQuery", "");

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 2,
    }).format(price);
  };

  return (
    <div className="px-3 sm:px-6 lg:px-10 py-6 bg-slate-950 min-h-screen w-full max-w-7xl mx-auto">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6">
        Crypto Market Dashboard
      </h1>

      <div className="mb-4">
        <input
          ref={searchRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search assets..."
          className="
            bg-gray-800 text-white placeholder-gray-400
            w-full sm:w-64
            px-3 py-2 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-cyan-500
            transition-all duration-300
          "
        />
      </div>

      {loading && <p className="text-white mb-4">Scanning Blockchain...</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <MarketChart coins={filteredCoins} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
        {filteredCoins.map((coin) => (
          <div
            key={coin.id}
            className="p-3 sm:p-4 rounded-xl bg-gray-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 hover:shadow-2xl border border-transparent hover:border-cyan-900 transition-all min-w-0"
          >
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={coin.image}
                alt={coin.name}
                className="w-8 h-8 rounded-full"
              />
              <div className="min-w-0">
                <span className="text-white font-semibold truncate block">
                  {coin.name}
                </span>
                <p className="text-gray-400 text-sm">{coin.symbol.toUpperCase()}</p>
              </div>
            </div>

            <div className="text-right min-w-[80px]">
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