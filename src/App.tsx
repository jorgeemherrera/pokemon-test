import './App.scss'
import React from 'react'
import { Home } from '@pages/home'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Detail } from '@pages/detail';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  const queryClient = new QueryClient();

  return (
    <React.Fragment>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokemon/:id" element={<Detail />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </React.Fragment>
  )
}

export default App
