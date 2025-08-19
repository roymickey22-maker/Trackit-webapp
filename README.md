
# TrackIt – Full Stack (Node.js backend + React frontend)

This package contains your original **backend** (unpacked from the zip) and a new **React** frontend (Vite).

## Structure
```
TrackIt/
├── backend/    # your uploaded backend (unmodified)
└── frontend/   # generated React app (Vite)
```

## Quick Start

### 1) Backend
```bash
cd backend
npm install
npm run dev
# Backend expected on port 3000
```

If your backend uses a different command or port, update it accordingly.

### 2) Frontend
```bash
cd frontend
npm install
npm run dev
```

The frontend reads the API base URL from `.env`:
```
VITE_API_BASE=http://localhost:3000
```
Change it if your backend runs elsewhere.

## Auto-detected Endpoints
The generator scanned your backend for Express routes. It created simple pages that call these endpoints (GET) and display JSON:

- No endpoints detected automatically. Add your pages in `src/` and call your APIs via `api.js`.

## Notes
- Token support: if `localStorage.token` is set, it will be sent as `Authorization: Bearer <token>`.
- Add forms or CRUD UIs by editing/adding components in `src/`.
