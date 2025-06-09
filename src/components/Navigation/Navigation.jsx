import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';

export default function Navigation() {
  return (
    <nav className={css.nav}>
      
      <ul className={css.list}>
        <li>
          <div className={css.logoContainer}>
            <img 
              src="/logo.png" 
              alt="TravelTrucks" 
              className={css.logo}
            />
            </div>
        </li>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? css.active : css.link)}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/catalog"
            className={({ isActive }) => (isActive ? css.active : css.link)}
          >
            Catalog
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}