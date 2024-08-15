// import React from 'react'
// import {Router,Route,Routes} from 'react-router-dom';
// import Navbar from './components/Navbar.jsx';
// import Home from './components/Home.jsx';
// import Login from './components/Login.jsx';


// const App = () => {
//   return (
//     <>
//     <Navbar/>
    
//       <Routes>
//         <Route path="/" element={<Home/>}/>
//         <Route path="/login" element={<Login/>}/>
        
//       </Routes>
    
//     </>
//   )
// }

// export default App

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import CustomerList from './components/CustomerList';
import CustomerDetail from './components/CustomerDetail';
import AddCustomer from './components/AddCustomer';
import Revenue from './components/Revenue';
import Login from './components/Login';
import AddItems from './components/AddItems';
import EditCustomer from './components/EditCustomer';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        {isAuthenticated ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/customers" element={<CustomerList />} />
            <Route path="/customers/:id" element={<CustomerDetail />} />
            <Route path="/customers/add-items/:id" element={<AddItems />} />
            <Route path="/add-customer" element={<AddCustomer />} />
            <Route path="/revenue" element={<Revenue />} />
            <Route path="/customers/edit/:id" element={<EditCustomer />} /> 
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
      </>
  );
};

export default App;