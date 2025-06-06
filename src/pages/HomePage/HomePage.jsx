import React from 'react';
import { Link } from 'react-router-dom';
import css from './HomePage.module.css';

export default function HomePage() {
  return (
    <section className={css.home}>
      <h1>Welcome to TravelTrucks</h1>
      <p>Rent your perfect camper and hit the road!</p>
      <Link to="/catalog" className={css.ctaBtn}>
        View Now
      </Link>
    </section>
  );
}