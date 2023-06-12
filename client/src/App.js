import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import AddRecipe from './components/AddRecipe/AddRecipe';
import Detail from './components/Detail/Detail';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/recipes/:id" element={<Detail />} />
          <Route path="/recipes" element={<AddRecipe />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

