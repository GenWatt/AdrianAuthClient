import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './sass/index.scss'
import {
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
} from 'react-query'
import { ToastProvider } from './context/ToastContext.tsx'

const queryOptions: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnReconnect: false,
      retry: 1,
      staleTime: 40 * 1000,
      retryOnMount: false,
    },
  },
}

const queryClient = new QueryClient(queryOptions)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <App />
      </ToastProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
