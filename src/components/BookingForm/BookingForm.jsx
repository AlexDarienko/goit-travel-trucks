import React, { useState } from 'react';
import toast from 'react-hot-toast';
import css from './BookingForm.module.css';

export default function BookingForm({ camperId }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!name || !email || !date) {
      toast.error('Please fill all fields');
      return;
    }
    toast.success('Camper booked successfully!');
    setName('');
    setEmail('');
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <h3>Book this Camper</h3>
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={e => setName(e.target.value)}
        className={css.input}
      />
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className={css.input}
      />
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        className={css.input}
      />
      <button type="submit" className={css.button}>
        Book Now
      </button>
    </form>
  );
}