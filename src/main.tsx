import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './App.tsx';
import Sales from './pages/sales/Sales';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/sales" element={<Sales />} />
        <Route path="/manage" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
