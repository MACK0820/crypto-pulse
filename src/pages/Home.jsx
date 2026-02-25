import { useState, useRef, useEffect } from 'react';
import { useCrypto } from '../context/CryptoContext';
import { useFetchCrypto } from '../hooks/useFetchCrypto';

const Home = () => {
  const { coins } = useCrypto();
  const { loading, error } = useFetchCrypto();

  const [search, setSearch] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const filtered = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Scanning Blockchain...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <input
        ref={inputRef}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
      />

      {filtered.map(coin => (
        <div key={coin.id}>
          {coin.name} - 
          <span className={
            coin.price_change_percentage_24h > 0
              ? "text-green-500"
              : "text-red-500"
          }>
            {coin.current_price}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Home;