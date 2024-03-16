import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { SignInPage, SignOnPage } from './pages/';

function App() {
  return (
    <Routes>
      <Route path="login" element={<SignInPage />} />
      <Route path="register" element={<SignOnPage />} />
    </Routes>
  );
}

export default App;
