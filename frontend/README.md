# TrackIt Frontend

React frontend for the TrackIt lost and found application.

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment file and configure
cp .env.example .env
# Edit VITE_API_BASE if backend is on non-default port

# Start development server
npm run dev
```

## Features

- **Modern React Stack**: Vite, React Router, Tailwind CSS
- **Real-time Updates**: Socket.io integration for live notifications
- **3D Hero Component**: Spline integration with lazy loading
- **State Management**: Zustand for global state
- **Form Handling**: React Hook Form with Yup validation
- **Responsive Design**: Mobile-first approach with Tailwind
- **Animations**: Framer Motion for smooth transitions

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Route components
├── services/      # API and external service integrations
├── hooks/         # Custom React hooks
├── store/         # Zustand store
└── utils/         # Helper functions
```

## Environment Variables

- `VITE_API_BASE`: Backend API base URL (default: http://localhost:3000)

## Notes

- The Spline scene URL in `SplineHero.jsx` needs to be replaced with your actual 3D scene
- Backend endpoints are centralized in `services/routeMap.js` for easy configuration
- Socket.io connects automatically and listens for real-time item updates