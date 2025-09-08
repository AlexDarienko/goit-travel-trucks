# TravelTrucks — Camper Rentals (Frontend)

A React + Vite single-page app for **TravelTrucks** (camper rentals). It implements the full spec:

- Home page with CTA → **View Now**
- Catalog with **filtering (location, type, equipment)**, **favorites** (persisted), **price with comma**, **Load More**
- Camper detail page with **gallery**, **Features/Reviews tabs**, and **booking form** with validation + toast notification
- **Redux Toolkit** for global state (campers, filters, favorites)
- **React Router v6** with **Vercel rewrite** to avoid 404 on refresh / deep links
- **Axios** for API calls
- Clean, valid markup (lists are `<ul><li>`), DRY components

## Live requirements

If deploying to Vercel, the included `vercel.json` ensures all routes rewrite to `index.html` (no 404s on reload).

## Getting started

```bash
# 1) Install deps
npm install

# 2) Run dev
npm run dev

# 3) Build for production
npm run build
npm run preview
```

## Project structure

```
/src
  /pages  → Home, Catalog, CamperDetail, NotFound
  /slices → Redux slices (campers, filters, favorites)
  /ui     → Reusable components (CamperCard, Filters, BookingForm)
  App.jsx, main.jsx, index.css
vercel.json → SPA rewrite (fixes 404 on refresh)
```

## API

Using the provided backend:

- `GET https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers`
- `GET https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers/:id`

Supported query params in this app:

- `location` (exact string match)
- `form` one of `panelTruck`, `fullyIntegrated`, `alcove`
- Equipment flags: `AC`, `kitchen`, `bathroom`, `TV`, `radio`, `refrigerator`, `microwave`, `gas`, `water`
- Additionally, `transmission=automatic` when the **Automatic** chip is selected

Pagination: `page`, `limit`

> When searching with new filters, we **reset** previous results and fetch page 1.

## Accessibility & validation

- Lists use semantic `<ul><li>`
- Tabs have `role="tablist"` and `aria-selected`
- Buttons have `aria-pressed` where applicable
- Booking form validates required fields and disables past dates

## Commit convention

Use descriptive messages answering **what** was done (e.g. `feat(filters): add transmission mapping for automatic`).

## Credits

Design texts/elements matched to the provided layout. Colors/labels referenced from the mockup.
