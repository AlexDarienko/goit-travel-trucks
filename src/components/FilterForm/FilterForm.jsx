import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFilters, resetCampers, fetchCampers } from '../../features/campers/campersSlice';
import css from './FilterForm.module.css';

export default function FilterForm() {
  const dispatch = useDispatch();
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [ac, setAc] = useState(false);
  const [kitchen, setKitchen] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    const filters = {
      location,
      type,
      options: { ac, kitchen },
      page: 1,
    };
    dispatch(resetCampers());
    dispatch(setFilters(filters));
    dispatch(fetchCampers(filters));
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={e => setLocation(e.target.value)}
        className={css.input}
      />
      <input
        type="text"
        placeholder="Type (e.g. VAN)"
        value={type}
        onChange={e => setType(e.target.value)}
        className={css.input}
      />
      <label className={css.checkbox}>
        <input
          type="checkbox"
          checked={ac}
          onChange={() => setAc(prev => !prev)}
        />
        AC
      </label>
      <label className={css.checkbox}>
        <input
          type="checkbox"
          checked={kitchen}
          onChange={() => setKitchen(prev => !prev)}
        />
        Kitchen
      </label>
      <button type="submit" className={css.button}>
        Filter
      </button>
    </form>
  );
}