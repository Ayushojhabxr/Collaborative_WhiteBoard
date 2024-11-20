import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Whiteboard from './components/Whiteboard';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/whiteboard" element={<Whiteboard />} />
      </Routes>
    </BrowserRouter>
  );
}
