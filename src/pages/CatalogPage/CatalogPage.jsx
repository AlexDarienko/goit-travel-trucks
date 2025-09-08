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
  const campers = useSelector(selectCampers) || [];
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const hasMore = useSelector(selectHasMore);

  useEffect(() => {
    // перший запит — без фільтрів, 1 сторінка
    dispatch(fetchCampers({ page: 1 }));
  }, [dispatch]);

  const loadMore = () => {
    const next = Math.floor(campers.length / 12) + 1;
    dispatch(fetchCampers({ page: next }));
  };

  return (
    <section className={css.page}>
      <div className={css.container}>
        {/* Ліва колонка — фільтри */}
        <aside className={css.sidebar}>
          <FilterForm />
        </aside>

        {/* Права колонка — список карток */}
        <main className={css.content}>
          {error && <p className={css.error}>Error: {error}</p>}

          <ul className={css.list} role="list">
            {campers.map(camper => (
              <li key={camper.id} className={css.item}>
                <CamperCard camper={camper} />
              </li>
            ))}
          </ul>

          {loading && <p className={css.loading}>Loading…</p>}

          {!loading && campers.length > 0 && hasMore && (
            <div className={css.loadMoreWrap}>
              <LoadMoreBtn onClick={loadMore} />
            </div>
          )}

          {!loading && campers.length === 0 && (
            <p className={css.empty}>Nothing found. Try to change filters.</p>
          )}
        </main>
      </div>
    </section>
  );
}