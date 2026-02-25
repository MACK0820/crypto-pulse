import { useState, useRef, useEffect } from 'react';
import { useFetchCrypto } from '../hooks/useFetchCrypto';
import { useCrypto } from '../context/CryptoContext';
import MarketChart from '../components/MarketChart';

const Home = () => {
  const { loading, error } = useFetchCrypto();
  const { coins } = useCrypto();
  const [search, setSearch] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="p-10 text-cyan-400 font-bold text-center">Scanning Blockchain...</div>;
  if (error) return <div className="p-10 text-red-500 text-center">Error: {error}</div>;

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search for a coin..."
        className="w-full p-4 rounded bg-gray-800 border-2 border-gray-700 mb-6 outline-none focus:border-cyan-400 transition-all"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <MarketChart />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filteredCoins.map(coin => (
          <div key={coin.id} className="p-5 bg-gray-800 rounded-xl border-l-8 border-cyan-500 shadow-xl hover:scale-105 transition-transform">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">{coin.name}</h3>
              <span className="text-gray-400 uppercase text-sm">{coin.symbol}</span>
            </div>
            <p className={`text-2xl mt-2 font-mono ${coin.price_change_percentage_24h > 0 ? "text-green-400" : "text-red-400"}`}>
              ${coin.current_price.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;