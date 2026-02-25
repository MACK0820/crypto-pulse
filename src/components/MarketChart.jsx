import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useCrypto } from "../context/CryptoContext";

const MarketChart = () => {
  const { coins, currency } = useCrypto();

  if (!coins || coins.length === 0) return null;

  const chartData = coins.map((coin) => ({
    name: coin.symbol.toUpperCase(),
    price: coin.current_price,
  }));

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 2,
    }).format(price);
  };

  return (
    <div className="h-96 w-full p-4 bg-gray-800 rounded-xl mt-6">
      <h2 className="text-white mb-4 text-xl font-semibold">
        Crypto Assets ({currency})
      </h2>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={chartData} margin={{ top: 20, right: 40, left: 20, bottom: 20 }}>
          <XAxis
            dataKey="name"
            stroke="#94a3b8"
            interval={0}
            tick={{ fontSize: 14, fill: "#f1f5f9" }}
          />
          <YAxis
            stroke="#94a3b8"
            tickFormatter={formatPrice}
            tick={{ fontSize: 12, fill: "#f1f5f9" }}
            width={80}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#1e293b", border: "none", color: "#fff" }}
            formatter={(value) => formatPrice(value)}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#22d3ee"
            strokeWidth={3}
            dot={{ r: 5, stroke: "#0ea5e9", strokeWidth: 2, fill: "#22d3ee" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MarketChart;