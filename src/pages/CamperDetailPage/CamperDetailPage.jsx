import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCamperById } from '../../slices/campersSlice';
import toast from 'react-hot-toast';

// формат €8000,00
const Price = ({ value }) => (
  <span className="price">
    €{Number(value || 0).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
  </span>
);

// невеличкий бейдж
const Chip = ({ children }) => <span className="badge">{children}</span>;

export default function CamperDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { current: camper, loading, error } = useSelector((s) => s.campers);
  const [tab, setTab] = useState('features');

  useEffect(() => {
    dispatch(fetchCamperById(id));
  }, [id, dispatch]);

  const equipmentList = useMemo(() => {
    if (!camper) return [];
    const keys = [
      'transmission', // покажемо як текст
      'engine',       // покажемо як текст
      'AC',
      'bathroom',
      'kitchen',
      'TV',
      'radio',
      'refrigerator',
      'microwave',
      'gas',
      'water',
    ];
    const chips = [];
    keys.forEach((k) => {
      if (k === 'transmission' && camper.transmission) chips.push(`Automatic`);
      else if (k === 'engine' && camper.engine) chips.push(camper.engine);
      else if (typeof camper[k] === 'boolean' && camper[k]) chips.push(k);
    });
    return chips;
  }, [camper]);

  const detailsRows = useMemo(() => {
    if (!camper) return [];
    const map = [
      ['Form', camper.form],
      ['Length', camper.length],
      ['Width', camper.width],
      ['Height', camper.height],
      ['Tank', camper.tank],
      ['Consumption', camper.consumption],
    ];
    return map.filter(([, v]) => v);
  }, [camper]);

  const onSubmitBooking = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = (form.get('name') || '').trim();
    const email = (form.get('email') || '').trim();
    const date = (form.get('date') || '').trim();
    if (!name || !email || !date) return toast.error('Please fill all required fields');
    toast.success('Booking successful!');
    e.currentTarget.reset();
  };

  if (loading) return <div className="container">Loading…</div>;
  if (error) return <div className="container">Error: {error}</div>;
  if (!camper) return null;

  const reviewsCount = camper.reviews?.length || 0;
  const rating = Math.round(camper.rating || 0);

  return (
    <div className="container">
      {/* header */}
      <h1 style={{ marginBottom: 6 }}>{camper.name}</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#6C717B', marginBottom: 12 }}>
        <span className="stars" aria-label={`Rating ${rating} of 5`}>
          {'★'.repeat(rating)}
          {'☆'.repeat(5 - rating)}
        </span>
        <a href="#reviews" style={{ textDecoration: 'underline' }}>
          {camper.rating?.toFixed?.(1) || rating}.0 ({reviewsCount} Reviews)
        </a>
        <span>📍 {camper.location}</span>
      </div>
      <div style={{ marginBottom: 8 }}>
        <Price value={camper.price} />
      </div>

      {/* gallery */}
      <div className="gallery" style={{ marginTop: 12, marginBottom: 12 }}>
        {(camper.gallery || []).slice(0, 4).map((g, i) => (
          <img
            key={i}
            src={g?.original || g?.thumb || camper.image}
            alt={`Photo ${i + 1}`}
            style={{ borderRadius: 16 }}
          />
        ))}
      </div>

      {/* description */}
      {camper.description && (
        <p style={{ color: '#6C717B', lineHeight: 1.6, marginBottom: 16 }}>{camper.description}</p>
      )}

      {/* tabs */}
      <div className="tabs" role="tablist" aria-label="Camper tabs" style={{ borderBottom: '1px solid #E5E7EB' }}>
        <button
          className={`tab ${tab === 'features' ? 'active' : ''}`}
          onClick={() => setTab('features')}
          role="tab"
          aria-selected={tab === 'features'}
        >
          Features
        </button>
        <button
          className={`tab ${tab === 'reviews' ? 'active' : ''}`}
          onClick={() => setTab('reviews')}
          role="tab"
          aria-selected={tab === 'reviews'}
        >
          Reviews
        </button>
      </div>

      {/* two-column layout */}
      <div className="detail-layout" style={{ marginTop: 24 }}>
        {/* left */}
        <div>
          {tab === 'features' ? (
            <section className="card" aria-label="Features">
              {/* chips */}
              {equipmentList.length > 0 && (
                <div className="chips" style={{ marginBottom: 16 }}>
                  {equipmentList.map((c) => (
                    <Chip key={c}>{c}</Chip>
                  ))}
                </div>
              )}

              {/* details table */}
              <h3 style={{ marginTop: 4, marginBottom: 12 }}>Vehicle details</h3>
              <div className="tt-details-table">
                {detailsRows.map(([label, value]) => (
                  <div className="tt-row" key={label}>
                    <span className="tt-cell tt-muted">{label}</span>
                    <span className="tt-cell">{value}</span>
                  </div>
                ))}
              </div>
            </section>
          ) : (
            <section className="card" id="reviews" aria-label="Reviews">
              {reviewsCount > 0 ? (
                (camper.reviews || []).map((r, i) => (
                  <article key={i} className="card" style={{ boxShadow: 'none', border: '1px solid #eee' }}>
                    <strong>{r.reviewer_name}</strong>{' '}
                    <span className="stars" aria-label={`${r.reviewer_rating} of 5`}>
                      {'★'.repeat(r.reviewer_rating)}
                      {'☆'.repeat(5 - r.reviewer_rating)}
                    </span>
                    <p style={{ color: '#6C717B' }}>{r.comment}</p>
                  </article>
                ))
              ) : (
                <p>No reviews yet.</p>
              )}
            </section>
          )}
        </div>

        {/* right — booking form */}
        <aside>
          <div className="card">
            <h3>Book your campervan now</h3>
            <p style={{ color: '#6C717B', marginTop: 4 }}>Stay connected! We are always ready to help you.</p>

            <form onSubmit={onSubmitBooking} aria-label="Booking form" style={{ marginTop: 12 }}>
              <label htmlFor="bf-name">Name*</label>
              <input id="bf-name" name="name" className="input" placeholder="John Doe" />

              <label htmlFor="bf-email" style={{ marginTop: 10 }}>
                Email*
              </label>
              <input id="bf-email" name="email" type="email" className="input" placeholder="john@example.com" />

              <label htmlFor="bf-date" style={{ marginTop: 10 }}>
                Booking date*
              </label>
              <input
                id="bf-date"
                name="date"
                type="date"
                className="input"
                min={new Date().toISOString().split('T')[0]}
              />

              <label htmlFor="bf-comment" style={{ marginTop: 10 }}>
                Comment
              </label>
              <textarea id="bf-comment" name="comment" className="input" rows="4" placeholder="Any special requests?" />

              <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end' }}>
                <button className="btn" type="submit" style={{ minWidth: 120 }}>
                  Send
                </button>
              </div>
            </form>
          </div>
        </aside>
      </div>
    </div>
  );
}