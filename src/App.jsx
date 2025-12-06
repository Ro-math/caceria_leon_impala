import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import AppRoutes from './routes';
import './App.css'; // Keep if needed, but we rely on global.css

function App() {
  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
