import React from 'react';
import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <section className={css.notFound}>
      <h2>404 – Page Not Found</h2>
      <Link to="/">Go to Home</Link>
    </section>
  );
}