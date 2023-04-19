import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Footer from './components/Footer';
import Header from './components/Header';
import Login from './pages/Login';
import Users from './pages/Admin/Users';
import AdminDashboard from './pages/Admin/AdminDashboard';
import HomeComp from './pages/HomeComp';
import Register from './components/Register';
import ListBlog from './pages/Blog/List';
import Test from './pages/Test';
import AddBlog from './pages/Admin/AddBlog';
import ListVideo from './pages/Video/List';
import About from './pages/About/About';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/homecomp" element={<HomeComp />} />
          {/* user */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/blog" element={<ListBlog />} />
          <Route path="/video" element={<ListVideo />} />
          <Route path="/team" element={<About />} />
          <Route path="/test" element={<Test />} />
          {/* admin */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/addblog" element={<AddBlog />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
