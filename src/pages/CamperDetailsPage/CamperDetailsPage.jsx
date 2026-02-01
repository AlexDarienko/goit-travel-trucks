import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  fetchCamperById,
  resetCamper,
} from '../../redux/camperDetails/camperDetailsSlice';

import styles from './CamperDetailsPage.module.css';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CamperDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [tab, setTab] = useState('features');

  const {
    data,
    isLoading,
    error,
  } = useSelector(state => state.camperDetails);

  useEffect(() => {
    dispatch(fetchCamperById(id));

    return () => {
      dispatch(resetCamper());
    };
  }, [dispatch, id]);

  const handleSubmit = e => {
    e.preventDefault();

    toast.success('Booking successful!');
    e.target.reset();
  };

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error: {error}</p>;

  if (!data) return null;

  const images = data.gallery?.map(
    img => img.original || img
  );

  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1>{data.name}</h1>

          <div className={styles.rating}>
            ⭐ {data.rating} ({data.reviews?.length}{' '}
            Reviews)
          </div>

          <p className={styles.location}>
            📍 {data.location}
          </p>
        </div>

        <p className={styles.price}>
          €{data.price.toFixed(2)}
        </p>
      </div>

      {/* Gallery */}
      <div className={styles.gallery}>
        {images?.map((src, i) => (
          <img key={i} src={src} alt="" />
        ))}
      </div>

      {/* Description */}
      <p className={styles.description}>
        {data.description}
      </p>

      {/* Tabs */}
      <div className={styles.tabs}>
        <button
          className={
            tab === 'features'
              ? styles.activeTab
              : ''
          }
          onClick={() => setTab('features')}
        >
          Features
        </button>

        <button
          className={
            tab === 'reviews'
              ? styles.activeTab
              : ''
          }
          onClick={() => setTab('reviews')}
        >
          Reviews
        </button>
      </div>

      <div className={styles.content}>
        {/* Left */}
        <div>
          {tab === 'features' && (
            <>
              {/* Features */}
              <div className={styles.features}>
                {data.transmission && (
                  <span>
                    🚗 {data.transmission}
                  </span>
                )}
                {data.AC && <span>❄️ AC</span>}
                {data.kitchen && (
                  <span>🍳 Kitchen</span>
                )}
                {data.TV && <span>📺 TV</span>}
                {data.radio && (
                  <span>📻 Radio</span>
                )}
              </div>

              {/* Details */}
              <div className={styles.details}>
                <h3>Vehicle details</h3>

                <ul>
                  <li>
                    Form: {data.form}
                  </li>
                  <li>
                    Length: {data.length}
                  </li>
                  <li>
                    Width: {data.width}
                  </li>
                  <li>
                    Height: {data.height}
                  </li>
                  <li>
                    Tank: {data.tank}
                  </li>
                  <li>
                    Consumption:{' '}
                    {data.consumption}
                  </li>
                </ul>
              </div>
            </>
          )}

          {tab === 'reviews' && (
  <div className={styles.reviews}>
              {data.reviews?.map((r, i) => {

      return (
      <div
        key={i}
        className={styles.reviewCard}
      >
        {/* Avatar */}
        <div className={styles.avatar}>
          {r.reviewer_name[0]}
        </div>

        {/* Content */}
        <div className={styles.reviewContent}>
          <h4>{r.reviewer_name}</h4>

          <div className={styles.stars}>
            {Array.from({ length: 5 }).map(
              (_, idx) => (
                <span
                  key={idx}
                  className={
                    idx < Number(r.reviewer_rating || r.rating || 0)
                      ? styles.starActive
                      : styles.star
                  }
                >
                  ★
                </span>
              )
            )}
          </div>

          <p>{r.comment}</p>
        </div>
      </div>
    );
  })}
  </div>
)}
        </div>

        {/* Right */}
        <form
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <h3>Book your campervan now</h3>

          <input
            required
            placeholder="Name*"
          />

          <input
            type="email"
            required
            placeholder="Email*"
          />

          <input type="date" required />

          <textarea placeholder="Comment" />

          <button type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default CamperDetailsPage;