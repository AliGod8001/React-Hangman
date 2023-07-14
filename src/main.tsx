import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import ThemeContextProvider from './store/theme-context.tsx'

import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeContextProvider>,
)
