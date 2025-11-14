import React from 'react';
import Banner from '../Banner/Banner'
import Services from '../Services/Services';
import ClientSlider from '../ClientSlider/ClientSlider';
import HowWeWork from '../HowWeWork/HowWeWork';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Services></Services>
            <ClientSlider></ClientSlider>
            <HowWeWork></HowWeWork>
             
        </div>
    );
};

export default Home;