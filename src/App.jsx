import React from 'react';
import { BrowserRouter, Routes, Route,Router, Navigate } from 'react-router-dom';
import SignUp from './SignUp';
import Login from './Login';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './componants/ProtectedRoute';
import Dashboard from './componants/Dashboard';



function App() {
  return (
    <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    </AuthProvider>
  );
}

export default App;