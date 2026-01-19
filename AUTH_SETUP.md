# JWT Authentication Setup

This project uses JWT (JSON Web Token) authentication with the NGO Connect backend API.

## Configuration

### Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update the `VITE_API_BASE_URL` in `.env`:
   - **Local Development**: `http://localhost:8000`
   - **Production**: `https://ngoconeect-backend.onrender.com`

### Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Authentication Flow

### 1. Registration
- User fills registration form with email, first name, last name, and password
- Backend sends OTP to user's email
- User enters OTP to verify email
- After verification, user can login

### 2. Login
- User enters email and password
- Backend returns access token and refresh token
- Tokens are stored in localStorage
- User is redirected to home page

### 3. Protected Routes
- Access token is automatically added to all API requests via axios interceptor
- If token expires (401 error), refresh token is used to get new access token
- If refresh fails, user is redirected to login page

### 4. Logout
- Refresh token is sent to backend to invalidate it
- All tokens and user data are cleared from localStorage
- User is redirected to home page

## API Endpoints Used

- `POST /api/user/register/` - Register new user
- `POST /api/user/verify-email/` - Verify email with OTP
- `POST /api/user/resend-otp/` - Resend OTP
- `POST /api/user/token/` - Login
- `POST /api/user/token/refresh/` - Refresh access token
- `POST /api/user/logout/` - Logout
- `GET /api/user/profile/` - Get user profile
- `PATCH /api/user/profile/` - Update user profile
- `POST /api/user/change-password/` - Change password
- `GET /api/user/profile/donations/` - Get user's donations

## Token Storage

Tokens are stored in localStorage:
- `access_token` - JWT access token (short-lived)
- `refresh_token` - Refresh token (long-lived)
- `user_email` - User's email
- `user_role` - User's role (general_user, volunteer, admin, etc.)

## Switching to Production

To switch from localhost to production:

1. Update `.env`:
   ```env
   VITE_API_BASE_URL=https://ngoconeect-backend.onrender.com
   ```

2. Restart the development server:
   ```bash
   npm run dev
   ```

That's it! The entire app will now use the production backend.
