import { Link } from "react-router-dom";
import { useCrypto } from "../context/CryptoContext";

const Navbar = () => {
  const { currency, setCurrency } = useCrypto();

  return (
    <nav className="p-5 flex justify-between items-center shadow-lg bg-indigo-900 text-white sticky top-0 z-50">
      <h1 className="text-xl font-bold tracking-widest">CRYPTO-PULSE</h1>
      <div className="flex gap-6 items-center">
        <Link to="/" className="hover:text-cyan-400 font-medium">Market</Link>
        <Link to="/analysis" className="hover:text-cyan-400 font-medium">Analysis</Link>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="bg-white text-black rounded px-2 py-1"
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
      </div>
    </nav>
  );
};

export default Navbar;