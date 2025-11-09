import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import { GlobalProvider } from '@context/GlobalProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <GlobalProvider>
    <App />
  </GlobalProvider>
)
