# Wanderlust — MERN Stack

This is the MERN (MongoDB, Express, React, Node) version of the Wanderlust project.
Same features, same UI, same data — but the frontend is now a React app (Vite) and
the backend is a JSON REST API instead of EJS server-side rendering.

## Structure

```
wanderlust-mern/
├── backend/     Express + MongoDB REST API (port 8080)
│   ├── app.js               Server entry point
│   ├── cloudconfig.js       Cloudinary + Multer storage
│   ├── middlware.js         Auth / owner / validation middleware
│   ├── schema.js            Joi validation schemas (unchanged)
│   ├── controller/          listings, reviews, users controllers
│   ├── models/              Mongoose models (unchanged)
│   ├── routes/              Express routers (now under /api)
│   ├── utils/               ExpressError, wrapAsync, fetchapi (unchanged)
│   └── init/                Seed data (unchanged)
└── frontend/    React + Vite app (port 5173)
    └── src/
        ├── api/axios.js     Axios instance (baseURL /api, withCredentials)
        ├── context/         AuthContext (currUser) + FlashContext (flash messages)
        ├── components/      Navbar, Footer, Flash, FilterBar, ListingCard, MapView, ...
        ├── pages/           Listings, ShowListing, New/EditListing, Login, Signup, ...
        └── css/             style.css + ratingstar.css (unchanged)
```

## How to run (2 terminals)

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env    # then fill in your real values
npm run dev             # or: npm start
```

`.env` needs: `ATLASDB_URL`, `SECRET`, `CLOUD_NAME`, `CLOUD_API_KEY`, `CLOUD_API_SECRET`

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173 — the Vite dev server proxies all `/api` requests
to the Express backend on port 8080 (see `vite.config.js`), so the session
cookie works without CORS issues.

### Seed the database (optional)

```bash
cd backend
node init/index.js
```

(Remember to change the hardcoded owner id in `init/index.js` to a real user id.)

## What changed from the EJS version (and what didn't)

| Area | EJS version | MERN version |
|------|-------------|--------------|
| Views | EJS templates rendered by Express | React components (same HTML/Bootstrap classes) |
| Routing | Express renders pages | react-router-dom on the client, Express serves only `/api` JSON |
| Flash messages | connect-flash + session | FlashContext (React Context API) |
| currUser | res.locals.currUser | AuthContext + GET /api/me |
| Redirect after login | session.redirectUrl | react-router location state |
| Forms | HTML form POST + method-override | Axios (FormData for image uploads) |
| Auth | Passport + sessions | **Unchanged** (Passport + express-session + connect-mongo) |
| Models, Joi schemas, geocoding, Cloudinary | — | **Unchanged** |
| CSS | public/css | **Unchanged** (same files, imported by React) |

## API routes

- `GET  /api/listings?page=1` — paginated listings
- `POST /api/listings` — create (multipart, logged in)
- `GET  /api/listings/search?query=...`
- `GET  /api/listings/filters?category=...`
- `GET  /api/listings/:id` — single listing with reviews + owner
- `PUT  /api/listings/:id` — update (owner only)
- `DELETE /api/listings/:id` — delete (owner only)
- `POST /api/listings/:id/reviews` — add review (logged in)
- `DELETE /api/listings/:id/reviews/:reviewId` — delete review (author only)
- `POST /api/signup`, `POST /api/login`, `GET /api/logout`, `GET /api/me`
