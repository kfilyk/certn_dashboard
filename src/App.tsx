import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login/Login';

// Browser routing typically happens in this file.

export function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p style={{color:"#1BB793"}}>
          Beginning of the New Certn Support Tool
        </p>
        <Login />
      </header>
    </div>
  );
}
