# HR Management Backend API

A RESTful HR Management Backend API built with Node.js, TypeScript, Express, Knex, and PostgreSQL.

## Tech Stack

- Node.js
- TypeScript
- Express.js
- PostgreSQL
- Knex.js
- Joi
- JWT
- Bcrypt
- Multer
- ESLint
- Prettier

## Features

- HR login with JWT authentication
- Protected employee, attendance, and report routes
- Employee CRUD
- Employee photo upload using Multer
- Attendance CRUD
- Attendance upsert by employee_id and date
- Monthly attendance report
- Late arrival count after 09:45 AM
- Employee search
- Employee and attendance pagination
- Attendance date range filter
- Employee soft delete using deleted_at

## Setup Instructions

### 1. Install dependencies

```bash
npm install
```
