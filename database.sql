CREATE TABLE hr_users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INTEGER NOT NULL,
    designation VARCHAR(255) NOT NULL,
    hiring_date DATE NOT NULL,
    date_of_birth DATE NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    photo_path VARCHAR(255),
    deleted_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE attendance (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER NOT NULL,
    date DATE NOT NULL,
    check_in_time TIME NOT NULL,

    CONSTRAINT fk_employee
        FOREIGN KEY(employee_id)
        REFERENCES employees(id)
        ON DELETE CASCADE,

    CONSTRAINT unique_employee_date
        UNIQUE(employee_id, date)
);