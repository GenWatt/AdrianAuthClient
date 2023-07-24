import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './sass/index.scss'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ToastProvider } from './context/ToastContext.tsx'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <App />
      </ToastProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
