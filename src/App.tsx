import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Admin from './pages/Admin';
import type { JSX } from 'react';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

// Komponen pelindung rute Admin
function ProtectedRoute({ children }: { children: JSX.Element }) {
  const isAuth = localStorage.getItem('isAuth') === 'true';
  return isAuth ? children : <Navigate to="/login" />;
}

export default App;