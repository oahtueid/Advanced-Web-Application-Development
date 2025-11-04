# JWT Authentication System

A complete React single-page application implementing secure authentication using JWT access tokens and refresh tokens.

## 🚀 Live Demo

**Frontend:** [JWT Authentication App](https://ia04-react-auth-jwt-fe.vercel.app/)  
**Backend:** [Backend](https://ia04-react-auth-jwt-be.vercel.app/)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- pnpm (install globally: `npm install -g pnpm`)

### Clone the project
   ```bash
   git clone https://github.com/oahtueid/Advanced-Web-Application-Development.git
   ```
### Backend Setup

1. **Navigate to backend folder:**
   ```bash
   cd Week4/backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables in `.env`:**
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=your_password
   DB_DATABASE=jwt_auth
   
   JWT_ACCESS_SECRET=your-strong-secret-key-here
   JWT_REFRESH_SECRET=another-strong-secret-key-here
   JWT_ACCESS_EXPIRATION=15m
   JWT_REFRESH_EXPIRATION=7d
   
   PORT=3001
   FRONTEND_URL=http://localhost:5173
   ```

5. **Create PostgreSQL database:**
   ```sql
   CREATE DATABASE jwt_auth;
   ```

6. **Start the backend:**
   ```bash
   pnpm run start:dev
   ```

   Backend will run on `http://localhost:3001`

### Frontend Setup

1. **Navigate to frontend folder:**
   ```bash
   cd Week4/frontend
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables in `.env`:**
   ```env
   VITE_API_BASE_URL=http://localhost:3001
   ```

5. **Start the frontend:**
   ```bash
   pnpm run dev
   ```

   Frontend will run on `http://localhost:5173`

