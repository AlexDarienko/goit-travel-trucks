import React from 'react';
import { Link } from 'react-router-dom';
import css from './HomePage.module.css';

export default function HomePage() {
  return (
    <section className={css.home}>
      <div className={css.overlay}>
        <h1>Campers of your dreams</h1>
        <p>You can find everything you want in our catalog</p>
        <Link to="/catalog" className={css.cta}>
          View Now
        </Link>
      </div>
    </section>
  );
}