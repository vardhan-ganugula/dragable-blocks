import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {NodesProvider} from './contexts/useNodes.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NodesProvider>
      <App />
    </NodesProvider>
  </StrictMode>,
)
