# RideSur

A taxi booking platform built for Suriname. Passengers book rides, drivers accept them, admins oversee the platform.

Built with React, Vite, Node.js, and MariaDB.

---

## Prerequisites

Before you start, make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18 or higher
- [MariaDB](https://mariadb.org/)
- [DBeaver](https://dbeaver.io/) (recommended for database management)
- [Git](https://git-scm.com/install/windows)(incase of linux os switch to linux instead of windows)

---

## Getting started

### 1. Clone the repository

```bash
git clone https://github.com/Nikhcodes/ridesur.git
cd ridesur
```

### 2. Install dependencies

Backend:
```bash
cd backend
npm install
```

Frontend:
```bash
cd ../frontend
npm install
```

---

## Database setup

Open your MariaDB shell:

```bash
sudo mariadb
```

Create the database, then exit:

```sql
CREATE DATABASE ridesur;
EXIT;
```

Open DBeaver, connect to the `ridesur` database, open a new SQL script, paste the following and run it all at once with **Ctrl + Alt + X**:

```sql
USE ridesur;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  role ENUM('passenger', 'driver', 'admin') DEFAULT 'passenger',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE drivers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  license_number VARCHAR(50),
  vehicle VARCHAR(100),
  is_available BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE rides (
  id INT AUTO_INCREMENT PRIMARY KEY,
  passenger_id INT NOT NULL,
  driver_id INT,
  pickup VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  status ENUM('requested', 'accepted', 'in_progress', 'completed') DEFAULT 'requested',
  price DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (passenger_id) REFERENCES users(id),
  FOREIGN KEY (driver_id) REFERENCES users(id)
);

CREATE TABLE ratings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ride_id INT NOT NULL,
  driver_id INT NOT NULL,
  passenger_id INT NOT NULL,
  score INT CHECK (score BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (ride_id) REFERENCES rides(id),
  FOREIGN KEY (driver_id) REFERENCES users(id),
  FOREIGN KEY (passenger_id) REFERENCES users(id)
);

CREATE TABLE notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  message VARCHAR(255) NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

After running the script you should see 5 tables in DBeaver: `users`, `drivers`, `rides`, `ratings`, `notifications`.

---

## Environment variables

Create a `.env` file inside the `backend` folder:

```env
DB_HOST=localhost
DB_USER=your_mariadb_username
DB_PASSWORD=your_mariadb_password
DB_NAME=ridesur
JWT_SECRET=ridesur2026supersecret
PORT=5000
```

Replace `your_mariadb_username` and `your_mariadb_password` with your own MariaDB credentials.

> Not sure what your username is? Run `SELECT User FROM mysql.user;` inside the MariaDB shell to check.

---

## Running the app

You need two terminals open at the same time.

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

| Service  | URL |
|----------|-----|
| Frontend | http://localhost:5173 |
| Backend  | http://localhost:5000 |

---

## Creating an admin account

Register a normal account through the app, then run this in DBeaver to promote it to admin:

```sql
UPDATE users SET role = 'admin' WHERE email = 'your@email.com';
```

---

## Project structure

```
ridesur/
├── backend/
│   ├── config/          # Database connection
│   ├── controllers/     # Business logic for each route
│   ├── middleware/      # JWT authentication check
│   ├── routes/          # API endpoint definitions
│   ├── utils/           # Shared utilities (notifications etc.)
│   ├── .env             # Environment variables (not committed)
│   └── index.js         # Server entry point
│
└── frontend/
    └── src/
        ├── api/             # Axios instance and base config
        ├── components/      # Shared UI components
        ├── context/         # Auth and language context
        └── pages/
            ├── passenger/   # Book ride, history, status, profile
            ├── driver/      # Requests, current ride, earnings
            └── admin/       # Users, drivers, rides overview
```

---

## Tech stack

| Layer | Technology |
|-------|-----------|
| Frontend | React (Vite), TailwindCSS v4, React Router |
| HTTP client | Axios |
| Backend | Node.js, Express.js |
| Database | MariaDB / MySQL |
| Authentication | JWT + bcrypt |

---

## Git workflow

Always pull before starting work:

```bash
git pull
```

After making changes:

```bash
git add .
git commit -m "short description of what you changed"
git push
```

Keep commits small and descriptive. One feature or fix per commit.

---

## Troubleshooting

**Backend won't connect to the database**
Check your `.env` credentials. Run `SELECT User FROM mysql.user;` in MariaDB to confirm your username.

**Frontend shows a blank page**
Make sure the backend is running on port 5000 before starting the frontend.

**Rides not showing up in history**
Make sure you're logged in with the correct account. Passenger history only shows rides booked by that passenger.

**Driver not appearing in the drivers table**
This is handled automatically on registration. If you have an existing driver account that's missing, run:
```sql
INSERT INTO drivers (user_id, license_number, vehicle, is_available)
VALUES (your_user_id, 'N/A', 'N/A', false);
```
