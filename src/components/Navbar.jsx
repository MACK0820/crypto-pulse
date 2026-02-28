import { useState } from "react";
import { Link } from "react-router-dom";
import { useCrypto } from "../context/CryptoContext";
import { Settings, ChevronDown, Activity, Globe } from "lucide-react";

const Navbar = () => {
  const { currency, setCurrency } = useCrypto();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-indigo-900 text-white z-[100] border-b border-white/10 shadow-lg">

      {/* CONTAINER WRAPPER (This is what makes it fluid) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-4">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          {/* LOGO SECTION */}
          <Link to="/" className="group flex items-center gap-3 justify-center md:justify-start">
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 bg-cyan-400 rounded-full blur-md opacity-40 animate-pulse"></div>
              <div className="relative w-10 h-10 bg-gradient-to-tr from-cyan-600 to-indigo-500 rounded-full flex items-center justify-center border border-white/20">
                <Activity size={20} className="text-white" />
              </div>
            </div>

            <div className="flex flex-col items-center md:items-start leading-none">
              <h1 className="text-xl font-black tracking-tighter">
                CRYPTO<span className="text-cyan-400">-PULSE</span>
              </h1>
            </div>
          </Link>

          {/* LINKS & SETTINGS */}
          <div className="flex flex-col sm:flex-row items-center gap-6">

            <div className="flex gap-6">
              <Link
                to="/"
                className="hover:text-cyan-400 font-bold text-xs tracking-widest transition-colors uppercase"
              >
                Market
              </Link>

              <Link
                to="/analysis"
                className="hover:text-cyan-400 font-bold text-xs tracking-widest transition-colors uppercase"
              >
                Analysis
              </Link>
            </div>

            <div className="relative">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`flex items-center gap-2 p-2 px-4 rounded-md border-2 transition-all duration-300 ${
                  showSettings
                    ? "bg-indigo-800 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                    : "bg-transparent border-white/20 hover:border-cyan-500 hover:bg-white/5"
                }`}
              >
                <Settings
                  size={18}
                  className={showSettings ? "rotate-90 text-cyan-400" : ""}
                />
                <span className="text-xs font-black uppercase tracking-tight">
                  Settings
                </span>
                <ChevronDown
                  size={14}
                  className={showSettings ? "rotate-180" : ""}
                />
              </button>

              {showSettings && (
                <div className="absolute left-1/2 -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-0 mt-3 w-52 bg-slate-950 rounded-xl shadow-2xl border border-white/10 p-3 z-50">

                  {/* CURRENCY ONLY */}
                  <div className="flex items-center gap-2 mb-2">
                    <Globe size={12} className="text-cyan-400" />
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
                      Currency
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {["USD", "EUR", "PHP", "JPY"].map((curr) => (
                      <button
                        key={curr}
                        onClick={() => {
                          setCurrency(curr);
                          setShowSettings(false);
                        }}
                        className={`py-1.5 text-xs rounded transition-all ${
                          currency === curr
                            ? "bg-cyan-600 text-white font-bold"
                            : "bg-white/5 text-gray-400 hover:text-white"
                        }`}
                      >
                        {curr}
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;