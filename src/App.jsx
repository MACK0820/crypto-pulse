import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Analysis from './pages/Analysis';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Market</Link>
        <Link to="/analysis">Analysis</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analysis" element={<Analysis />} />
      </Routes>
    </Router>
  );
}

export default App;