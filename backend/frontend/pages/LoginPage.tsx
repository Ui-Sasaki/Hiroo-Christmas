
"use client";

import React from 'react';
import LoginForm from '../components/LoginForm';
import LoginRight from '../assets/LoginRight.png';

const LoginPage = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-white flex items-center justify-center p-10">
        <LoginForm />
      </div>

      <div className="w-1/2 relative">
        <img
          src={LoginRight.src}
          alt="Login visual"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white bg-opacity-60" />
      </div>
    </div>
  );
};

export default LoginPage;