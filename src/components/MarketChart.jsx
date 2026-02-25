import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useCrypto } from "../context/CryptoContext";

const MarketChart = () => {
  const { coins } = useCrypto();

  if (!coins || coins.length === 0) return null;

  const chartData = coins.map((coin) => ({
    name: coin.symbol.toUpperCase(),
    price: coin.current_price,
    change: coin.price_change_percentage_24h,
  }));

  return (
    <div className="h-96 w-full p-4 bg-gray-800 rounded-xl mt-6">
      <h2 className="text-white mb-4 text-xl font-semibold">Top 10 Cryptos (USD)</h2>
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <XAxis dataKey="name" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{ backgroundColor: "#1e293b", border: "none", color: "#fff" }}
            formatter={(value) => `$${value.toLocaleString()}`}
          />
          <Line type="monotone" dataKey="price" stroke="#22d3ee" strokeWidth={3} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MarketChart;