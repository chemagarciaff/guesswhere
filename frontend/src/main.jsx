import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './output.css'
import App from './App.jsx'
import { MapaProvider } from './contextos/MapaContext.jsx'
import { MusicProvider } from './contextos/MusicaContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MapaProvider>
      <MusicProvider>
        <App />
      </MusicProvider>
    </MapaProvider>
  </StrictMode>,
)
