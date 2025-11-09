import './App.scss'
import React from 'react'
import { Home } from '@pages/home'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const queryClient = new QueryClient();

  return (
    <React.Fragment>
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    </React.Fragment>
  )
}

export default App
