import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FilterForm from '../../components/FilterForm/FilterForm';
import CamperCard from '../../components/CamperCard/CamperCard';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';

import {
  fetchCampers,
} from '../../redux/campers/campersSlice';

import styles from './CatalogPage.module.css';

const CatalogPage = () => {
  const dispatch = useDispatch();

  const {
    items,
    page,
    isLoading,
    hasMore,
  } = useSelector(state => state.campers);

  const filters = useSelector(state => state.filters);

  useEffect(() => {
    dispatch(fetchCampers({ page: 1, filters }));
  }, [dispatch]);

  return (
  <div className={styles.wrapper}>
    {/* Left: Filters */}
    <FilterForm />

    {/* Right: Cards */}
    <div>
      <ul className={styles.list}>
        {items.map(camper => (
          <li key={camper.id}>
            <CamperCard camper={camper} />
          </li>
        ))}
      </ul>

      {isLoading && <p>Loading...</p>}

      {hasMore && !isLoading && (
        <LoadMoreBtn
          onClick={() =>
            dispatch(fetchCampers({ page, filters }))
          }
        />
      )}
    </div>
  </div>
);
};

export default CatalogPage;