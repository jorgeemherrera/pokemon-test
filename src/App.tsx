import "./App.scss";
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home } from "@pages/home";
import { Detail } from "@pages/detail";
import { Login } from "@pages/login";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function App() {
  const queryClient = new QueryClient();
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!sessionStorage.getItem("session_id")
  );

  return (
    <React.Fragment>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/pokemon/:id"
              element={
                isLoggedIn ? <Detail /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/login"
              element={
                !isLoggedIn ? (
                  <Login onLogin={() => setIsLoggedIn(true)} />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </React.Fragment>
  );
}

export default App;
