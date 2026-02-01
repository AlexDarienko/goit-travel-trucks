import { useDispatch, useSelector } from 'react-redux';

import {
  setLocation,
  setForm,
  toggleFeature,
} from '../../redux/filters/filtersSlice';

import {
  fetchCampers,
  resetCampers,
} from '../../redux/campers/campersSlice';

import styles from './FilterForm.module.css';

import {
  FaWind,
  FaTv,
  FaShower,
} from 'react-icons/fa';

import { GiGasStove } from 'react-icons/gi';

const FilterForm = () => {
  const dispatch = useDispatch();

  const filters = useSelector(state => state.filters);

  const handleSearch = e => {
    e.preventDefault();

    dispatch(resetCampers());
    dispatch(fetchCampers({ page: 1, filters }));
  };

  return (
    <form className={styles.form} onSubmit={handleSearch}>
      {/* Location */}
      <div className={styles.locationBlock}>
        <label className={styles.label}>Location</label>

        <input
          type="text"
          className={styles.locationInput}
          placeholder="Kyiv, Ukraine"
          value={filters.location}
          onChange={e =>
            dispatch(setLocation(e.target.value))
          }
        />
      </div>

      {/* Filters */}
      <p className={styles.filtersTitle}>Filters</p>

      {/* Equipment */}
      <div className={styles.block}>
        <h3 className={styles.blockTitle}>
          Vehicle equipment
        </h3>

        <div className={styles.grid}>
          {/* AC */}
          <button
            type="button"
            className={`${styles.card} ${
              filters.features.AC
                ? styles.active
                : ''
            }`}
            onClick={() =>
              dispatch(toggleFeature('AC'))
            }
          >
            <FaWind size={24} />
            <span>AC</span>
          </button>

          {/* Kitchen */}
          <button
            type="button"
            className={`${styles.card} ${
              filters.features.kitchen
                ? styles.active
                : ''
            }`}
            onClick={() =>
              dispatch(toggleFeature('kitchen'))
            }
          >
            <GiGasStove size={24} />
            <span>Kitchen</span>
          </button>

          {/* TV */}
          <button
            type="button"
            className={`${styles.card} ${
              filters.features.TV
                ? styles.active
                : ''
            }`}
            onClick={() =>
              dispatch(toggleFeature('TV'))
            }
          >
            <FaTv size={24} />
            <span>TV</span>
          </button>

          {/* Bathroom */}
          <button
            type="button"
            className={`${styles.card} ${
              filters.features.bathroom
                ? styles.active
                : ''
            }`}
            onClick={() =>
              dispatch(toggleFeature('bathroom'))
            }
          >
            <FaShower size={24} />
            <span>Bathroom</span>
          </button>
        </div>
      </div>

      {/* Vehicle type */}
      <div className={styles.block}>
        <h3 className={styles.blockTitle}>
          Vehicle type
        </h3>

        <div className={styles.grid}>
          {/* Van */}
          <button
            type="button"
            className={`${styles.card} ${
              filters.form === 'panelTruck'
                ? styles.active
                : ''
            }`}
            onClick={() =>
              dispatch(setForm('panelTruck'))
            }
          >
            <span>Van</span>
          </button>

          {/* Fully */}
          <button
            type="button"
            className={`${styles.card} ${
              filters.form === 'fullyIntegrated'
                ? styles.active
                : ''
            }`}
            onClick={() =>
              dispatch(setForm(
                'fullyIntegrated'
              ))
            }
          >
            <span>Fully Integrated</span>
          </button>

          {/* Alcove */}
          <button
            type="button"
            className={`${styles.card} ${
              filters.form === 'alcove'
                ? styles.active
                : ''
            }`}
            onClick={() =>
              dispatch(setForm('alcove'))
            }
          >
            <span>Alcove</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <button
        type="submit"
        className={styles.searchBtn}
      >
        Search
      </button>
    </form>
  );
};

export default FilterForm;