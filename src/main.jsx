import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.jsx'
import { CartItem } from './components/CartItem.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CartItem>
        <App />
      </CartItem>
    </BrowserRouter>
  </StrictMode>,
)
