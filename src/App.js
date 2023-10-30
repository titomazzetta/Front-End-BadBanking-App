import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/navbar';
import Home from './components/home';
import CreateAccount from './components/createaccount';
import Login from './components/login';
import Deposit from './components/deposit';
import Withdraw from './components/withdraw';

import AllData from './components/alldata';


// Importing the UserProvider from context.js
import { UserProvider } from './components/context';

function App() {
  return (
    <Router>
      {/* Wrapping everything within UserProvider */}
      <UserProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createaccount" element={<CreateAccount />} />
          <Route path="/login" element={<Login />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/withdraw" element={<Withdraw />} />
     
          <Route path="/alldata" element={<AllData />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
