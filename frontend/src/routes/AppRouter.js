import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from '../components/Login';
import HelloWorld from '../components/HelloWorld';

const ProtectedRoute = ({ element, isAuthenticated }) => {
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

function AppRouter() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/hello"
          element={<ProtectedRoute element={<HelloWorld />} isAuthenticated={isAuthenticated} />}
        />
        <Route path="/" element={<Navigate to={isAuthenticated ? '/hello' : '/login'} replace />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
