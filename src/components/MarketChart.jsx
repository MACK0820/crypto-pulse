import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useCrypto } from '../context/CryptoContext';

const MarketChart = () => {
  const { coins } = useCrypto();

  const chartData = coins.map(c => ({
    name: c.symbol.toUpperCase(),
    price: c.current_price
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="price" stroke="#00f" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MarketChart;