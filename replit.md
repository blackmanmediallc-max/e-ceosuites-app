# e-CEO Suites App

## Overview

e-CEO Suites is a business services management application for a coworking/executive suites company. It allows customers to book office spaces (private offices, meeting rooms, virtual offices), receive mail notifications with uploaded images, and manage reservations. The app uses a client-server architecture with a React frontend and an Express.js backend.

The project is currently in an early/incomplete state — many files are stubs or partially implemented, and there are duplicate configuration files in a `replit-setup/` directory that appear to be reference copies of the intended structure.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Directory Structure

- **Root level**: Express backend server (`replit-server.js`), root `package.json` with concurrently to run both frontend and backend
- **`frontend/`**: React app (Create React App) — the main client-side code
- **`models/`**: Mongoose data models (Booking, Service)
- **`routes/`**: Express route handlers (bookings, services)
- **`replit-setup/`**: Duplicate/reference copies of project files — these should be reconciled with the root-level files or removed

### Backend (Express.js)

- **Framework**: Express.js running on port 5000 (configurable via `PORT` env var)
- **Current state**: The root `replit-server.js` is a stub — it only defines a PORT constant and doesn't actually start a server. The more complete version is in `replit-setup/replit-server.js` which includes routes for mail notifications, file uploads, and bookings
- **Key middleware**: CORS enabled, JSON body parsing, Multer for file uploads (mail images stored in `./uploads/` directory)
- **Data storage**: The models use Mongoose (MongoDB ODM), but the server file in `replit-setup/` uses in-memory arrays. This is a conflict that needs resolution. The project currently has **no database connection setup** — Mongoose models exist but are never connected to a MongoDB instance
- **API Routes**:
  - `GET /` — Health check
  - `POST /mail` — Upload mail notification with image (multipart form)
  - `GET /mail/:customerId` — Get mail notifications for a customer
  - `GET /bookings` — List all bookings
  - `POST /bookings` — Create a booking
  - `GET /services` — List available services
  - `POST /services` — Create a service

### Frontend (React)

- **Framework**: React 18 with Create React App
- **HTTP client**: Axios for API calls to the backend
- **Current state**: Very incomplete. `frontend/src/App.js` only has a backend URL constant. The more complete version is in `replit-setup/frontend/src/App.js` which has state management for mail notifications, bookings, and file uploads
- **Key features planned**: Mail notification viewer, mail upload form (with image), room booking form, booking list display
- **Note**: The `frontend/` directory has a misnamed `package (1).json` that should be renamed to `package.json`

### Data Models (Mongoose/MongoDB)

- **Service**: name, description, price, type (private_office/meeting_room/virtual_office/other), availability
- **Booking**: references a Service, includes customerName, customerEmail, date, durationHours, status (pending/confirmed/cancelled), createdAt

### Key Issues to Address

1. The root `replit-server.js` is essentially empty — needs the full Express server implementation
2. No MongoDB/database connection is configured anywhere — either add MongoDB connection or switch to a different storage solution (Postgres with Drizzle, SQLite, or in-memory)
3. `frontend/package (1).json` needs to be renamed to `frontend/package.json`
4. The `replit-setup/` directory contains more complete versions of files and should be reconciled with root-level files
5. Frontend `App.js` is a stub and needs the full UI implementation

## External Dependencies

### Backend Dependencies
- **express** (^4.18.2): Web server framework
- **cors** (^2.8.5): Cross-origin resource sharing middleware
- **multer** (^1.4.5): Multipart form handling for file uploads
- **concurrently** (^7.6.0): Run frontend and backend simultaneously
- **mongoose**: Referenced in models but NOT listed in package.json — needs to be added or replaced with alternative ORM

### Frontend Dependencies
- **react** (^18.2.0) / **react-dom** (^18.2.0): UI framework
- **react-scripts** (5.0.1): Create React App tooling
- **axios** (^1.4.0): HTTP client for API calls

### Database
- Models are written for **MongoDB** via Mongoose, but no database connection exists. If setting up storage, consider using PostgreSQL with Drizzle ORM as an alternative, or connect to MongoDB if preferred.

### File Storage
- Mail notification images are stored locally in an `./uploads/` directory using Multer disk storage