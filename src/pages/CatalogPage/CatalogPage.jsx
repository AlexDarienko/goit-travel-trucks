// src/pages/CatalogPage/CatalogPage.jsx
import React, { useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCampers,
  resetList,
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

  // зберігаємо останні фільтри, щоб load more діставав ті ж критерії
  const lastFilters = useRef({});

  useEffect(() => {
    dispatch(resetList());
    lastFilters.current = {};
    dispatch(fetchCampers({ page: 1, limit: 6, reset: true, filters: {} }));
  }, [dispatch]);

  const handleFilterSubmit = useCallback(
    (filters) => {
      lastFilters.current = filters;
      dispatch(resetList());
      dispatch(fetchCampers({ page: 1, limit: 6, reset: true, filters }));
    },
    [dispatch]
  );

  const loadMore = () => {
    const nextPage = Math.floor(campers.length / 6) + 1;
    dispatch(
      fetchCampers({
        page: nextPage,
        limit: 6,
        reset: false,
        filters: lastFilters.current,
      })
    );
  };

  return (
    <section className={css.catalog}>
      <h2 className={css.title}>Catalog</h2>

      <FilterForm onSubmit={handleFilterSubmit} />

      {error && <p className={css.error}>Error: {error}</p>}

      {!loading && !error && campers.length === 0 && (
        <p className={css.empty}>Nothing found. Try to change filters.</p>
      )}

      <div className={css.grid}>
        {campers.map((camper) => (
          <CamperCard key={camper.id} camper={camper} />
        ))}
      </div>

      {loading && <p className={css.loading}>Loading…</p>}

      {!loading && campers.length > 0 && hasMore && (
        <LoadMoreBtn onClick={loadMore} />
      )}
    </section>
  );
}