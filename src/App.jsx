import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { CryptoProvider } from "./context/CryptoContext";
import Home from "./pages/Home";

function App() {
  return (
    <CryptoProvider>
      <Router>
        <nav className="p-5 bg-indigo-900 text-white flex justify-between shadow-lg sticky top-0 z-50">
          <h1 className="text-xl font-bold tracking-widest">CRYPTO-PULSE</h1>
          <div className="flex gap-6">
            <Link to="/" className="hover:text-cyan-400 font-medium">Market</Link>
            <Link to="/analysis" className="hover:text-cyan-400 font-medium">Analysis</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/analysis"
            element={<div className="p-6 text-white text-xl">Analysis Page Coming Soon</div>}
          />
        </Routes>
      </Router>
    </CryptoProvider>
  );
}

export default App;