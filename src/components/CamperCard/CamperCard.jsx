import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite, selectFavorites } from '../../features/favorites/favoritesSlice';
import css from './CamperCard.module.css';

export default function CamperCard({ camper }) {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const isFav = favorites.some(f => f.id === camper.id);

  const handleFavorite = () => {
    if (isFav) {
      dispatch(removeFavorite(camper.id));
    } else {
      dispatch(addFavorite(camper));
    }
  };

  const rawPrice = camper.price;
  const priceNumber = typeof rawPrice === 'number' ? rawPrice : 0;

  return (
    <div className={css.card}>
      <img src={camper.image} alt={camper.name} className={css.image} />
      <h3 className={css.title}>{camper.name}</h3>
      <p className={css.price}>${priceNumber.toFixed(2)}</p>
      <div className={css.actions}>
        <Link to={`/catalog/${camper.id}`} className={css.detailsBtn} target="_blank">
          Show more
        </Link>
        <button onClick={handleFavorite} className={isFav ? css.unfav : css.fav}>
          {isFav ? 'Remove ❤' : 'Add ❤'}
        </button>
      </div>
    </div>
  );
}