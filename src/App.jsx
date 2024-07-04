import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Heatmap from './Heatmap';
import Navbar from './Navbar';
import HomePage from './HomePage';
import HeatmapOG from "./HeatmapOG"
import Coronal from "./CoronalHeatmap"
import About from "./About"
import Venn from "./Venn"

function App() {
  return (
    <Router>
      <div>
        <Navbar/>
        {/* Define your routes */}
        <Routes>
          <Route path="/coronal" element={<Coronal />} />
          <Route path="/heatmap" element={<Heatmap />} />
          <Route path="/fullheatmap" element={<HeatmapOG />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/Venn" element={<Venn />} />
          <Route path="/references" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;