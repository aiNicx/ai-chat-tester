import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Imposta la preferenza tema scuro se necessario
const setThemePreference = () => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.setAttribute('data-bs-theme', 'dark');
  } else {
    document.body.setAttribute('data-bs-theme', 'light');
  }
};

// Applica il tema iniziale
setThemePreference();

// Ascolta i cambiamenti del tema del sistema
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setThemePreference);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
