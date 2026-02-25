import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { CryptoProvider } from './context/CryptoContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CryptoProvider>
      <App />
    </CryptoProvider>
  </React.StrictMode>
)