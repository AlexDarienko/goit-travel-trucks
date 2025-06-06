import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCampers,
  selectCampers,
  selectLoading,
  selectError,
  selectHasMore,
} from '../../features/campers/campersSlice';
import CamperCard from '../../components/CamperCard/CamperCard';
import FilterForm from '../../components/FilterForm/FilterForm';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';
import css from './CatalogPage.module.css';

export default function CatalogPage() {
  const dispatch = useDispatch();
  const campers = useSelector(selectCampers);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const hasMore = useSelector(selectHasMore);

  useEffect(() => {
    dispatch(fetchCampers({ location: '', type: '', options: { ac: false, kitchen: false }, page: 1 }));
  }, [dispatch]);

  const loadMore = () => {
    dispatch(fetchCampers({ page: Math.floor(campers.length / 6) + 1 }));
  };

  return (
    <section className={css.catalog}>
      <h2>Catalog</h2>
      <FilterForm />
      {error && <p className={css.error}>Error: {error}</p>}
      <div className={css.grid}>
        {campers.map(camper => (
          <CamperCard key={camper.id} camper={camper} />
        ))}
      </div>
      {loading && <p>Loading...</p>}
      {!loading && campers.length > 0 && hasMore && (
        <LoadMoreBtn onClick={loadMore} />
      )}
    </section>
  );
}