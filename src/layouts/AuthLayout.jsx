import React from 'react';
import { Outlet } from 'react-router-dom';
import sideImage from '../assets/tree plantation related/NGOconnect_volunteers_park_planting_HighQuality.png';
import NgoconnectLogo from '../pages/shared/NgoconnectLogo/NgoconnectLogo';

const AuthLayout = () => {
    return (
        <div className="flex min-h-screen bg-white">
            {/* Left Side - Image & Brand Section */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-green-900">
                <img
                    src={sideImage}
                    alt="Volunteers Planting Trees"
                    className="absolute inset-0 w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 p-16 text-white z-10">
                    <h1 className="text-5xl font-bold mb-6 leading-tight">Empower Change,<br/>Connect Hearts.</h1>
                    <p className="text-xl text-gray-200 max-w-lg mb-8">
                        Join NGO Connect today and be part of a global movement making a real difference in people's lives.
                    </p>
                    <div className="flex gap-4 items-center">
                        <div className="flex -space-x-4">
                           {/* Decorative circles */}
                           <div className="w-10 h-10 rounded-full border-2 border-white bg-yellow-400"></div>
                           <div className="w-10 h-10 rounded-full border-2 border-white bg-blue-400"></div>
                           <div className="w-10 h-10 rounded-full border-2 border-white bg-red-400"></div>
                        </div>
                        <p className="text-sm font-medium">Trusted by 10k+ volunteers</p>
                    </div>
                </div>
            </div>

            {/* Right Side - Form Section */}
            <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-12 lg:px-24 py-12 relative bg-white">
                 <div className="w-full max-w-md">
                    <div className="mb-10 flex justify-center lg:justify-start">
                         <NgoconnectLogo />
                    </div>
                    
                    <Outlet />
                 </div>
            </div>
        </div>
    );
};

export default AuthLayout;