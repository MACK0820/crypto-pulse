const CoinCard = ({ coin }) => {
  const priceChange = coin.price_change_percentage_24h;

  return (
    <div className="bg-slate-800 p-4 rounded-xl shadow-md">
      <h2 className="text-lg font-bold">{coin.name}</h2>
      <p>${coin.current_price}</p>

      <p
        className={
          priceChange > 0
            ? "text-green-400 font-semibold"
            : "text-red-400 font-semibold"
        }
      >
        {priceChange.toFixed(2)}%
      </p>
    </div>
  );
};

export default CoinCard;