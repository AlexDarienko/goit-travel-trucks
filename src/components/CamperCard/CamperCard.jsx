import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  addFavorite,
  removeFavorite,
} from '../../redux/favorites/favoritesSlice';

import css from './CamperCard.module.css';

/* ---------- helpers ---------- */

const formatPrice = value =>
  Number(value ?? 0).toLocaleString('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

/* ---------- component ---------- */

export default function CamperCard({ camper }) {
  const dispatch = useDispatch();

  const favorites = useSelector(
    state => state.favorites.items
  );

  const {
    id,
    name,
    price,
    rating,
    location,
    description,
    gallery = [],
    transmission,
    engine,
    AC,
    kitchen,
  } = camper || {};

  const img =
    gallery?.[0]?.thumb ||
    gallery?.[0]?.original;

  /* ---------- favorite state ---------- */

  const isFavorite = favorites.some(
    item => item.id === id
  );

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(id));
    } else {
      dispatch(addFavorite(camper));
    }
  };

  /* ---------- render ---------- */

  return (
    <article className={css.card}>
      <div className={css.media}>
        <img
          src={img}
          alt={name}
          className={css.image}
          loading="lazy"
          width="290"
          height="310"
        />
      </div>

      <div className={css.body}>
        {/* Header */}
        <header className={css.header}>
          <h3 className={css.title}>{name}</h3>

          <div className={css.priceWrap}>
            <span className={css.price}>
              €{formatPrice(price)}
            </span>

            {/* Heart */}
            <button
              type="button"
              aria-label="Add to favorites"
              onClick={toggleFavorite}
              className={`${css.favBtn} ${
                isFavorite
                  ? css.favActive
                  : ''
              }`}
            />
          </div>
        </header>

        {/* Rating + location */}
        <div className={css.sub}>
          <span
            className={css.star}
            aria-hidden="true"
          >
            ★
          </span>

          <button
            type="button"
            className={css.reviewsBtn}
          >
            {Number(rating || 0).toFixed(1)}{' '}
            <u>Reviews</u>
          </button>

          <span className={css.dot} />

          <span
            className={css.loc}
            title={location}
          >
            📍 {location}
          </span>
        </div>

        {/* Description */}
        {description && (
          <p className={css.desc}>
            {description}
          </p>
        )}

        {/* Chips */}
        <ul className={css.chips} role="list">
          {transmission && (
            <li className={css.chip}>
              ⚙️ Automatic
            </li>
          )}

          {engine && (
            <li className={css.chip}>
              ⛽ Petrol
            </li>
          )}

          {kitchen && (
            <li className={css.chip}>
              🍳 Kitchen
            </li>
          )}

          {AC && (
            <li className={css.chip}>
              ❄️ AC
            </li>
          )}
        </ul>

        {/* Button */}
        <div className={css.actions}>
          <Link
            to={`/catalog/${id}`}
            target="_blank"
            rel="noreferrer"
            className={css.moreBtn}
          >
            Show more
          </Link>
        </div>
      </div>
    </article>
  );
}