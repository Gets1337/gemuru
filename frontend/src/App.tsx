import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { SignInPage, SignOnPage, HomePage, NotFoundPage } from './pages/';

function App() {
  return (
    <Routes>
      <Route path="login" element={<SignInPage />} />
      <Route path="register" element={<SignOnPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
