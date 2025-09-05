import React, { useState } from 'react';
import css from './FilterForm.module.css';

// onSubmit очікує об’єкт: { location, type, AC, kitchen, TV, bathroom }
export default function FilterForm({ onSubmit }) {
  const [location, setLocation] = useState('');
  const [type, setType] = useState(''); // 'Van' | 'Fully Integrated' | 'Alcove'
  const [AC, setAC] = useState(false);
  const [kitchen, setKitchen] = useState(false);
  const [TV, setTV] = useState(false);
  const [bathroom, setBathroom] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ location, type, AC, kitchen, TV, bathroom });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      {/* Location */}
      <label className={css.field}>
        <span className={css.label}>Location</span>
        <input
          className={css.input}
          type="text"
          placeholder="Kyiv, Ukraine"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </label>

      {/* Vehicle type */}
      <label className={css.field}>
        <span className={css.label}>Vehicle type</span>
        <select
          className={css.select}
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">Any</option>
          <option value="Van">Van</option>
          <option value="Fully Integrated">Fully Integrated</option>
          <option value="Alcove">Alcove</option>
        </select>
      </label>

      {/* Equipment */}
      <fieldset className={css.equipment}>
        <legend className={css.legend}>Vehicle equipment</legend>
        <label className={css.check}>
          <input type="checkbox" checked={AC} onChange={() => setAC((v) => !v)} />
          <span>AC</span>
        </label>
        <label className={css.check}>
          <input
            type="checkbox"
            checked={kitchen}
            onChange={() => setKitchen((v) => !v)}
          />
          <span>Kitchen</span>
        </label>
        <label className={css.check}>
          <input type="checkbox" checked={TV} onChange={() => setTV((v) => !v)} />
          <span>TV</span>
        </label>
        <label className={css.check}>
          <input
            type="checkbox"
            checked={bathroom}
            onChange={() => setBathroom((v) => !v)}
          />
          <span>Bathroom</span>
        </label>
      </fieldset>

      <button type="submit" className={css.submit}>
        Search
      </button>
    </form>
  );
}