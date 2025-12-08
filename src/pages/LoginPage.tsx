import React from 'react';
import LoginForm from '../components/LoginForm';
import LoginRight from '../assets/LoginRight.png'; // Make sure this image is in src/assets

const LoginPage = () => {
     return (
          <div className="flex h-screen">
               {/* Left: Login form */}
               <div className="w-1/2 bg-white flex items-center justify-center p-10">
                    <LoginForm />
               </div>

               {/* Right: Image with white blur overlay */}
               <div className="w-1/2 relative">
                    <img
                         src={LoginRight}
                         alt="Login visual"
                         className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-white bg-opacity-60" />
               </div>
          </div>
     );
};

export default LoginPage;
