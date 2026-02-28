import { useCrypto } from "../context/CryptoContext";

const Analysis = () => {
  const { coins } = useCrypto();

  const topGainers = [...coins]
    .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
    .slice(0, 5);

  const topLosers = [...coins]
    .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
    .slice(0, 5);

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6 max-w-7xl mx-auto text-white">

      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8">Market Analysis</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-gray-800 p-4 rounded-xl">
          <h2 className="text-green-400 font-semibold mb-4">
            Top Gainers
          </h2>

          {topGainers.map((coin) => (
            <div key={coin.id} className="flex justify-between py-2 border-b border-gray-700">
              <span>{coin.name}</span>
              <span className="text-green-400">
                +{coin.price_change_percentage_24h?.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>

        <div className="bg-gray-800 p-4 rounded-xl">
          <h2 className="text-red-400 font-semibold mb-4">
            Top Losers
          </h2>

          {topLosers.map((coin) => (
            <div key={coin.id} className="flex justify-between py-2 border-b border-gray-700">
              <span>{coin.name}</span>
              <span className="text-red-400">
                {coin.price_change_percentage_24h?.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analysis;