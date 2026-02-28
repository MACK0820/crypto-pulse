import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CryptoProvider } from "./context/CryptoContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Analysis from "./pages/Analysis";
import { useEffect, useState } from "react";

function App() {
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAppLoading(false);
    }, 1800); // simulate initial loading
    return () => clearTimeout(timer);
  }, []);

  if (appLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-950 overflow-hidden">
        <div className="relative flex flex-col items-center">
          <div className="absolute w-40 h-40 border-2 border-cyan-500 rounded-full animate-ping opacity-20"></div>
          <div className="absolute w-56 h-56 border border-indigo-500 rounded-full animate-pulse opacity-10"></div>
          <div className="relative w-24 h-24 bg-gradient-to-tr from-cyan-500 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl">
            <span className="text-white text-3xl font-black tracking-widest">CP</span>
          </div>
          <p className="mt-6 text-cyan-400 font-bold tracking-widest animate-pulse">
            Initializing Market Engine...
          </p>
          <p className="text-gray-500 text-sm mt-2">Connecting to blockchain nodes</p>
        </div>
      </div>
    );
  }

  return (
    <CryptoProvider>
      <Router>
        <Navbar />
        <div className="pt-32 md:pt-24 transition-all duration-300">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analysis" element={<Analysis />} />
          </Routes>
        </div>
      </Router>
    </CryptoProvider>
  );
}

export default App;