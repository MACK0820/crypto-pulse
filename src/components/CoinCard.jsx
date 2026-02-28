const CoinCard = ({ coin, currency }) => {
  const priceChange = coin.price_change_percentage_24h;

  // Format price as currency
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 2,
  }).format(coin.current_price);

  return (
    <div className="p-4 rounded-xl shadow-md hover:scale-105 transition-transform bg-gray-800 text-white flex items-center gap-4">
      {/* Coin Logo */}
      <img src={coin.image} alt={coin.name} className="w-10 h-10 rounded-full" />
      
      {/* Coin Info */}
      <div className="flex-1">
        <h3 className="text-lg font-bold">{coin.name} ({coin.symbol.toUpperCase()})</h3>
        <p className={priceChange >= 0 ? 'text-green-400' : 'text-red-500'}>
          24h: {priceChange?.toFixed(2)}%
        </p>
      </div>

      {/* Price */}
      <div className="text-right font-bold">
        {formattedPrice}
      </div>
    </div>
  );
};

export default CoinCard;