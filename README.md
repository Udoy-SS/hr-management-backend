# HR Management Backend API

A RESTful HR Management Backend API built with Node.js, TypeScript, Express, Knex, and PostgreSQL.

## Tech Stack

- Node.js
- TypeScript
- Express.js
- PostgreSQL
- Knex.js
- Joi
- JWT Authentication
- Bcrypt
- Multer
- ESLint
- Prettier

## Features

- HR user login with JWT authentication
- Protected employee, attendance, and report routes
- Employee CRUD operations
- Employee photo upload using Multer
- Attendance CRUD operations
- Attendance upsert by employee_id and date
- Monthly attendance report
- Late arrival count after 09:45 AM
- Employee search by name
- Employee and attendance pagination
- Attendance date range filtering
- Employee soft delete using deleted_at

---

# Setup Instructions

## 1. Clone the repository

```bash
git clone https://github.com/Udoy-SS/hr-management-backend.git

cd hr-management-backend
```

## 2. Install dependencies

```bash
npm install
```

## 3. Environment Configuration

Create a `.env` file in the root directory.

Use `.env.example` as a reference.

Example:

```env
PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=hr_management

JWT_SECRET=your_secret_key

UPLOAD_PATH=uploads
```

---

# Database Setup

## Using Knex Migration

Run migrations:

```bash
npx knex migrate:latest
```

Run seed data:

```bash
npx knex seed:run
```

## Using SQL File

A complete database schema is available in:

```
database.sql
```

---

# Running the Application

## Development Mode

```bash
npm run dev
```

## Build Project

```bash
npm run build
```

## Production Mode

```bash
npm start
```

---

# API Endpoints

## Authentication

### HR Login

```
POST /auth/login
```

---

## Employees

```
GET    /employees
GET    /employees/:id
POST   /employees
PUT    /employees/:id
DELETE /employees/:id
```

Supports:

- Employee search
- Pagination
- Photo upload

---

## Attendance

```
GET    /attendance
GET    /attendance/:id
POST   /attendance
PUT    /attendance/:id
DELETE /attendance/:id
```

Supports:

- Employee filtering
- Date range filtering
- Attendance upsert

---

## Reports

Monthly attendance summary:

```
GET /reports/attendance?month=YYYY-MM
```

Optional employee filter:

```
GET /reports/attendance?month=2025-08&employee_id=1
```

Response includes:

- employee_id
- employee name
- days present
- late arrival count

Late rule:

```
Check-in time after 09:45 AM is counted as late.
```

---

# Default HR Login

```json
{
  "email": "hr@example.com",
  "password": "123456"
}
```

---

# Authentication

All employee, attendance, and report routes require JWT authentication.

Use:

```
Authorization: Bearer <your_token>
```

---

# Project Structure

```
src
├── modules
│   ├── auth
│   ├── employees
│   ├── attendance
│   └── reports
│
├── database
├── middlewares
├── validations
└── types
```

---

# Notes

- Employee photos are stored locally using Multer.
- Database migrations and seeds are included.
- Environment variables are managed through `.env`.
- Code formatting is maintained using ESLint and Prettier.