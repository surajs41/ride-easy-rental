
import React from 'react';
import Hero from '@/components/Hero';
import FeaturedBikes from '@/components/FeaturedBikes';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedBikes />
      <HowItWorks />
      <Testimonials />
    </div>
  );
};

export default Home;
