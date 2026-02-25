import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CryptoProvider } from "./context/CryptoContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Analysis from "./pages/Analysis";

function App() {
  return (
    <CryptoProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analysis" element={<Analysis />} />
        </Routes>
      </Router>
    </CryptoProvider>
  );
}

export default App;