'use client';

import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "../frontend/App";

export default function HomePage() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}