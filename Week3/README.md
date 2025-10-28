# User Registration System

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **PostgreSQL** (v14 or higher) - [Download](https://www.postgresql.org/download/)
- **npm** or **yarn** package manager

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Week3
```

### 2. Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create environment file
copy .env.example .env
```
Edit .env file with your PostgreSQL credentials
```bash
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=user_registration
PORT=3001
FRONTEND_URL=http://localhost:5173
```
Create the database (using psql or pgAdmin)
```bash
psql -U postgres
CREATE DATABASE user_registration;
```

### 3. Frontend Setup

```bash
# Navigate to frontend folder (from Week3 directory)
cd frontend

# Install dependencies
npm install
```

## 🎮 Running the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run start:dev
```
The backend will run on `http://localhost:3001`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
The frontend will run on `http://localhost:5173`

## 📱 Usage

1. **Open your browser** and navigate to `http://localhost:5173`

2. **Navigate through the app:**
   - **Home Page** (`/`) - Welcome page with feature overview
   - **Sign Up** (`/signup`) - Register a new user account
   - **Login** (`/login`) - Login page (UI demo, no backend logic)

3. **Register a new user:**
   - Click "Sign Up" in the navigation
   - Enter a valid email address
   - Create a password (minimum 6 characters)
   - Confirm your password
   - Click "Sign Up"
   - On success, you'll be redirected to the login page