import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddCar from './components/AddCar';
import CarDetail from './components/CarDetail';
import FileList from './components/FileList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={
          <>
            <Navbar />
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/add-car" element={<AddCar />} />
              <Route path="/car/:id" element={<CarDetail />} />
              <Route path="/files" element={<FileList />} />
            </Routes>
          </>
        } />
      </Routes>
    </Router>
  );
};

export default App;