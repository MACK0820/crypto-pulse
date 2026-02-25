import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-slate-900 text-white shadow-md z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-xl font-bold">
          CryptoRadar
        </Link>

        <div className="space-x-6">
          <NavLink to="/" className="hover:text-green-400">
            Home
          </NavLink>
          <NavLink to="/analysis" className="hover:text-green-400">
            Analysis
          </NavLink>
          <NavLink to="/settings" className="hover:text-green-400">
            Settings
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;