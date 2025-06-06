import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCamperById,
  selectCurrentCamper,
  selectLoading,
  selectError,
} from '../../features/campers/campersSlice';
import BookingForm from '../../components/BookingForm/BookingForm';
import css from './CamperDetailPage.module.css';

export default function CamperDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const camper = useSelector(selectCurrentCamper);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchCamperById(id));
  }, [dispatch, id]);

  if (loading) return <p>Loading camper details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!camper) return null;

  return (
    <section className={css.details}>
      <Link to="/catalog" className={css.backBtn}>
        ← Back to Catalog
      </Link>
      <div className={css.top}>
        <img src={camper.image} alt={camper.name} className={css.image} />
        <div className={css.info}>
          <h2>{camper.name}</h2>
          <p className={css.price}>${camper.price.toFixed(2)}</p>
          <p><b>Transmission:</b> {camper.transmission || 'N/A'}</p>
          <p><b>Engine:</b> {camper.engine || 'N/A'}</p>
          <p><b>AC:</b> {camper.AC ? 'Yes' : 'No'}</p>
          <p><b>Kitchen:</b> {camper.kitchen ? 'Yes' : 'No'}</p>
          <p><b>Bathroom:</b> {camper.bathroom ? 'Yes' : 'No'}</p>
        </div>
      </div>
      <div className={css.gallery}>
        {camper.photos?.map((url, idx) => (
          <img key={idx} src={url} alt={`Photo ${idx + 1}`} className={css.photo} />
        ))}
      </div>
      <BookingForm camperId={id} />
    </section>
  );
}