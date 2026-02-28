import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useCrypto } from "../context/CryptoContext";

const MarketChart = ({ coins }) => {
  const { currency, chartType, setChartType } = useCrypto();

  if (!coins || coins.length === 0) {
    return (
      <div className="w-full p-4 bg-gray-800 rounded-xl mt-6 min-h-[350px] flex items-center justify-center text-gray-400">
        Loading Chart Data...
      </div>
    );
  }

  const chartData = coins.map((coin) => ({
    name: coin.symbol.toUpperCase(),
    price: coin.current_price,
  }));

  return (
    <div className="w-full p-4 bg-gray-800 rounded-xl mt-6 min-h-[350px] sm:min-h-[400px]">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
        <h2 className="text-white text-xl font-semibold uppercase tracking-widest text-center sm:text-left">
          Market Analysis ({currency})
        </h2>

        <div className="flex gap-2">
          {["line", "bar"].map((type) => (
            <button
              key={type}
              onClick={() => setChartType(type)}
              className={`px-3 py-1 text-xs rounded uppercase transition ${
                chartType === type
                  ? "bg-cyan-600 text-white font-bold"
                  : "bg-white/5 text-gray-400 hover:text-white"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full h-[240px] sm:h-[300px] md:h-[350px] lg:h-[400px] transition-all duration-300">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "bar" ? (
            <BarChart data={chartData}>
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "none" }} />
              <Bar dataKey="price" fill="#22d3ee" radius={[4, 4, 0, 0]} />
            </BarChart>
          ) : (
            <LineChart data={chartData}>
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "none" }} />
              <Line type="monotone" dataKey="price" stroke="#22d3ee" strokeWidth={3} />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MarketChart;