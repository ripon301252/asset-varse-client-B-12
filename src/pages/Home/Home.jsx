import React from 'react';
import Hero from '../../components/Hero';
import FeaturesSection from '../FeaturesSection';
import HowItWorks from '../HowItWorks';
import Testimonials from '../Testimonials';
import CTASection from '../CTASection';

const Home = () => {
    return (
        <div>
            <Hero />
            <FeaturesSection />
            <HowItWorks />
            <Testimonials />
            <CTASection />
        </div>
    );
};

export default Home;