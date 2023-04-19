import React from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      <div>
      {children}  
      </div>
    </React.Fragment>
  );
};

export default Layout;
