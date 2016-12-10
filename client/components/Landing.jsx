import React from 'react';
import Header from './Header';
import CategoryList from './CategoryList';

const Landing = () => (
  <div className="container">
    <img src="/images/newsletters-banner.png" alt="NewsletterList Banner" className="hero-banner" />
    <Header />
    <CategoryList />
  </div>
);

export default Landing;