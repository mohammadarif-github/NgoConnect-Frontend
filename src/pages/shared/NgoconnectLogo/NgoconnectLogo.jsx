import React from 'react';
import logo from '../../../assets/logo.png'

const NgoconnectLogo = () => {
    return (
        <div className='flex items-end'>
            <img src={logo} alt=""  />
            <p className='text-3xl -ml-2 font-extrabold '>NGOCONNECT</p>
        </div>
    );
};

export default NgoconnectLogo;