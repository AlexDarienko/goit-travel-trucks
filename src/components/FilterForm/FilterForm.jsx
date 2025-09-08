import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCampers } from '../../features/campers/campersSlice';
import css from './FilterForm.module.css';

export default function FilterForm() {
  const dispatch = useDispatch();

  const [location, setLocation] = useState('Kyiv, Ukraine');
  const [equipment, setEquipment] = useState({
    AC: true, automatic: false, kitchen: false, TV: false, bathroom: false,
  });
  const [vehicleType, setVehicleType] = useState(''); // 'van' | 'fully' | 'alcove' | ''

  const toggleEq = key => setEquipment(prev => ({ ...prev, [key]: !prev[key] }));
  const chooseType = type => setVehicleType(prev => (prev === type ? '' : type));

  const onSearch = e => {
    e.preventDefault();
    // ВАЖЛИВО: просто тягнемо сторінку 1. У твоєму slice це означає «перезаписати список»
    dispatch(
      fetchCampers({
        page: 1,
        location,
        type: vehicleType,
        options: {
          ac: equipment.AC,
          automatic: equipment.automatic,
          kitchen: equipment.kitchen,
          tv: equipment.TV,
          bathroom: equipment.bathroom,
        },
      })
    );
  };

  return (
    <form className={css.form} onSubmit={onSearch}>
      <label className={css.label}>
        <span className={css.labelTitle}>Location</span>
        <div className={css.inputWrap}>
          <span className={css.inputIcon} aria-hidden="true">📍</span>
          <input
            className={css.input}
            type="text"
            value={location}
            onChange={e => setLocation(e.target.value)}
            placeholder="City, Country"
          />
        </div>
      </label>

      <div className={css.block}>
        <p className={css.blockTitle}>Filters</p>
        <p className={css.groupTitle}>Vehicle equipment</p>
        <div className={css.chips}>
          <button type="button" className={`${css.chip} ${equipment.AC ? css.chipActive : ''}`} onClick={() => toggleEq('AC')}><span className={css.ic}>❄️</span> AC</button>
          <button type="button" className={`${css.chip} ${equipment.automatic ? css.chipActive : ''}`} onClick={() => toggleEq('automatic')}><span className={css.ic}>⚙️</span> Automatic</button>
          <button type="button" className={`${css.chip} ${equipment.kitchen ? css.chipActive : ''}`} onClick={() => toggleEq('kitchen')}><span className={css.ic}>🍳</span> Kitchen</button>
          <button type="button" className={`${css.chip} ${equipment.TV ? css.chipActive : ''}`} onClick={() => toggleEq('TV')}><span className={css.ic}>📺</span> TV</button>
          <button type="button" className={`${css.chip} ${equipment.bathroom ? css.chipActive : ''}`} onClick={() => toggleEq('bathroom')}><span className={css.ic}>🚿</span> Bathroom</button>
        </div>

        <p className={css.groupTitle}>Vehicle type</p>
        <div className={css.chips}>
          <button type="button" className={`${css.chip} ${vehicleType === 'van' ? css.chipActive : ''}`} onClick={() => chooseType('van')}><span className={css.ic}>🚐</span> Van</button>
          <button type="button" className={`${css.chip} ${vehicleType === 'fully' ? css.chipActive : ''}`} onClick={() => chooseType('fully')}><span className={css.ic}>🏕️</span> Fully Integrated</button>
          <button type="button" className={`${css.chip} ${vehicleType === 'alcove' ? css.chipActive : ''}`} onClick={() => chooseType('alcove')}><span className={css.ic}>🛏️</span> Alcove</button>
        </div>
      </div>

      <button type="submit" className={css.submit}>Search</button>
    </form>
  );
}