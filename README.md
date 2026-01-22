# React + Django Full Stack Application

## Project Structure

```
Project Folder/
├── backend/          # Django backend
│   ├── myproject/    # Django project settings
│   ├── api/          # Django REST API app
│   ├── manage.py
│   └── venv/         # Python virtual environment
└── frontend/         # React frontend
    ├── src/
    │   ├── components/    # React components
    │   ├── redux/         # Redux store, actions, reducers
    │   ├── routes/        # React Router configuration
    │   ├── App.js
    │   └── index.js
    └── package.json
```

## Features Implemented

✅ **Django Backend**
- Django REST Framework with JWT authentication
- Simple JWT (djangorestframework-simplejwt)
- CORS support (django-cors-headers)
- Protected `/api/hello/` endpoint returning "Hello World"
- Public `/api/health/` endpoint
- JWT token endpoints at `/api/token/` and `/api/token/refresh/`

✅ **React Frontend**
- Redux state management for auth and data
- Redux Thunk middleware
- Protected routes using ProtectedRoute component
- React Bootstrap UI components
- Spinner/Loader for loading states
- Login page with form validation
- Hello World page with protected endpoint call
- JWT token handling in localStorage

## Setup Instructions

### Backend Setup

1. **Activate Virtual Environment**
   ```powershell
   cd backend
   .\venv\Scripts\Activate.ps1
   ```

2. **Install Dependencies**
   ```bash
   pip install django djangorestframework djangorestframework-simplejwt django-cors-headers
   ```

3. **Run Migrations**
   ```bash
   python manage.py migrate
   ```

4. **Create Superuser** (Already created: admin/admin123)
   ```bash
   python manage.py createsuperuser
   ```

5. **Start Development Server**
   ```bash
   python manage.py runserver
   ```
   Server runs on: `http://localhost:8000`

### Frontend Setup

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Start React Development Server**
   ```bash
   npm start
   ```
   Server runs on: `http://localhost:3000`

## Testing with Postman

### 1. Get Access Token

**Endpoint:** `POST http://localhost:8000/api/token/`

**Request Body (JSON):**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**
```json
{
  "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Save the `access` token for the next requests.**

### 2. Test Health Check (No Authentication Required)

**Endpoint:** `GET http://localhost:8000/api/health/`

**Response:**
```json
{
  "status": "API is running"
}
```

### 3. Test Protected Hello World Endpoint

**Endpoint:** `GET http://localhost:8000/api/hello/`

**Headers:**
```
Authorization: Bearer <YOUR_ACCESS_TOKEN>
```

**Response:**
```json
{
  "message": "Hello World"
}
```

### 4. Refresh Access Token

**Endpoint:** `POST http://localhost:8000/api/token/refresh/`

**Request Body (JSON):**
```json
{
  "refresh": "<YOUR_REFRESH_TOKEN>"
}
```

**Response:**
```json
{
  "access": "NEW_ACCESS_TOKEN_HERE"
}
```

## Application Flow

1. **User visits React app** → Redirects to `/login` if not authenticated
2. **User logs in** → Credentials sent to Django `/api/token/` endpoint
3. **Django returns JWT tokens** → Stored in localStorage
4. **User redirected to `/hello`** → Protected route verified
5. **Component fetches `/api/hello/`** → Bearer token sent in Authorization header
6. **Backend validates JWT** → Returns "Hello World" message
7. **Spinner shows during loading** → Message displays when loaded
8. **User can logout** → Tokens cleared, redirected to login

## API Endpoints

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/token/` | POST | No | Get access & refresh tokens |
| `/api/token/refresh/` | POST | No | Refresh access token |
| `/api/health/` | GET | No | Health check endpoint |
| `/api/hello/` | GET | Yes | Protected Hello World endpoint |
| `/admin/` | GET | Yes | Django admin panel |

## Credentials

- **Username:** admin
- **Password:** admin123

## Running the Application

### Terminal 1 - Start Django Backend
```powershell
cd backend
.\venv\Scripts\Activate.ps1
python manage.py runserver
```

### Terminal 2 - Start React Frontend
```powershell
cd frontend
npm start
```

### Terminal 3 - Use Postman (Optional)
Test API endpoints using Postman with the instructions above.

## Architecture

**Frontend (React)**
- Redux Store with auth and data slices
- Protected Route component
- Login component with form
- Hello World component with spinner
- Axios interceptors for API calls

**Backend (Django)**
- Django REST Framework views
- JWT authentication
- CORS enabled for localhost:3000
- SQLite database

## Technologies Used

**Frontend:**
- React 19.2.0
- Redux 5.0.1
- Redux Thunk 3.1.0
- React Bootstrap 2.10.10
- Axios 1.13.2
- React Router DOM 7.12.0

**Backend:**
- Django 6.0.1
- Django REST Framework 3.16.1
- djangorestframework-simplejwt 5.5.1
- django-cors-headers 4.9.0
- PyJWT 2.10.1

## Notes

- CORS is configured to allow `http://localhost:3000`
- All API requests from React include the JWT token
- Tokens are stored in browser localStorage
- Protected routes redirect to login if not authenticated
- Spinner displays during data loading

