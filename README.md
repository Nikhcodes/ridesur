# RideSur — Taxi Booking Platform

A taxi booking web app built for Suriname. Built with React + Node.js + MySQL.

---

## Requirements

Make sure you have these installed on your machine:

- Node.js (v18 or higher)
- MariaDB
- Git

---

## Setup

### 1. Clone the repo

```bash
git clone https://github.com/Nikhcodes/ridesur.git
cd ridesur
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Install frontend dependencies

```bash
cd ../frontend
npm install
```

---

## Database Setup

Open your MariaDB shell:

```bash
sudo mariadb
```

Create the database:

```sql
CREATE DATABASE ridesur;
EXIT;
```

Then open DBeaver, connect to `ridesur` and run the SQL script to create all the tables. Ask Nikh for the SQL script.

---

## Environment Variables

Create a `.env` file inside the `backend` folder:

```env
DB_HOST=localhost
DB_USER=your_mariadb_username
DB_PASSWORD=your_mariadb_password
DB_NAME=ridesur
JWT_SECRET=ridesur2026supersecret
PORT=5000
```

Replace `your_mariadb_username` and `your_mariadb_password` with your own credentials.

---

## Running the app

Open two terminals:

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```

Frontend runs on `http://localhost:5173`
Backend runs on `http://localhost:5000`

---

## Project Structure

```
ridesur/
├── backend/
│   ├── config/        # Database connection
│   ├── controllers/   # Route logic
│   ├── middleware/    # JWT auth check
│   ├── routes/        # API endpoints
│   └── index.js       # Entry point
│
└── frontend/
    └── src/
        ├── api/           # Axios instance
        ├── components/    # Shared UI components
        ├── context/       # Auth context
        └── pages/
            ├── passenger/ # Passenger pages
            ├── driver/    # Driver pages
            └── admin/     # Admin pages
```

---

## Tech Stack

- **Frontend:** React (Vite), TailwindCSS, React Router, Axios
- **Backend:** Node.js, Express.js
- **Database:** MariaDB / MySQL
- **Auth:** JWT + bcrypt

---

## Git Workflow

Always pull before you start working:
```bash
git pull
```

After making changes:
```bash
git add .
git commit -m "describe what you built"
git push
```
