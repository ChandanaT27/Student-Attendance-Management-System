import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import FacultyDashboard from './components/FacultyDashboard';
import StudentDashboard from './components/StudentDashboard';

function App() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/admin" 
            element={user?.role === 'ADMIN' ? <AdminDashboard /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/faculty" 
            element={user?.role === 'FACULTY' ? <FacultyDashboard /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/student" 
            element={user?.role === 'STUDENT' ? <StudentDashboard /> : <Navigate to="/login" />} 
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
