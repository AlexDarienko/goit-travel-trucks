import React from 'react';
import { Link } from 'react-router-dom';
import css from './CamperCard.module.css';

const formatPrice = (value) =>
  Number(value ?? 0).toLocaleString('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export default function CamperCard({ camper }) {
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

  const img = gallery?.[0]?.thumb || gallery?.[0]?.original;

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
        {/* Заголовок + ціна + heart */}
        <header className={css.header}>
          <h3 className={css.title}>{name}</h3>
          <div className={css.priceWrap}>
            <span className={css.price}>€{formatPrice(price)}</span>
            <button
              type="button"
              aria-label="Add to favorites"
              className={css.favBtn}
              data-heart
            />
          </div>
        </header>

        {/* рейтинг + локація */}
        <div className={css.sub}>
          <span className={css.star} aria-hidden="true">★</span>
          <button type="button" className={css.reviewsBtn}>
            {Number(rating || 0).toFixed(1)} <u>Reviews</u>
          </button>
          <span className={css.dot} />
          <span className={css.loc} title={location}>📍 {location}</span>
        </div>

        {/* опис */}
        {description && <p className={css.desc}>{description}</p>}

        {/* бейджі-чіпси */}
        <ul className={css.chips} role="list">
          {transmission && (
            <li className={css.chip}><span className={css.i}>⚙️</span> Automatic</li>
          )}
          {engine && (
            <li className={css.chip}><span className={css.i}>⛽</span> Petrol</li>
          )}
          {kitchen && (
            <li className={css.chip}><span className={css.i}>🍳</span> Kitchen</li>
          )}
          {AC && (
            <li className={css.chip}><span className={css.i}>❄️</span> AC</li>
          )}
        </ul>

        {/* кнопка */}
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