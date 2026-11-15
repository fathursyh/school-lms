# School LMS

A full-stack **High School Learning Management System (LMS)** and school portal built with **AdonisJS v7**, **Inertia.js + React**, **Lucid ORM**, and **Tailwind CSS v4 + shadcn/ui**.

---

## What This App Is About

The application combines a public-facing high school website (announcements/posts, extracurricular programs, e-library & career resource entry points) with a role-based Learning Management System for **Administrators**, **Teachers**, and **Students**.

### Core Domain (from Database Migrations)

- **Users & Roles (`users`, `remember_me_tokens`)**
  - Role-based access (`ADMIN`, `TEACHER`, `STUDENT`) with unique school identifiers, session auth, and remember-me tokens.
  - All primary keys use 26-character **ULIDs**.
- **Academic Structure (`academic_years`, `subjects`, `classes`)**
  - Manage academic years (`year`, `ODD`/`EVEN` semester, active flag), subjects (`name`, `code`), and classes (`grade`, `name`, homeroom teacher).
- **Enrollments & Teaching Assignments (`class_students`, `class_subjects`)**
  - Enroll students into classes and assign subjects and teachers to each class.
- **Learning & Coursework (`materials`, `assignments`, `submissions`)**
  - Teachers publish class materials (text + file attachments) and assignments (`passing_score`, `due_at`).
  - Students submit assignments (`file_url`, `notes`) and receive scores, feedback, and grading timestamps.
- **Attendance Tracking (`attendance_sessions`, `attendance_records`)**
  - Per-subject meeting sessions (`meeting_number`, `date`, `open_at`, `closed_at`) and student attendance records (`PRESENT`, `SICK`, `PERMIT`, `ABSENT`, `notes`).

---

## Tech Stack

- **Backend:** AdonisJS v7, Lucid ORM (MySQL / SQLite), VineJS, AdonisJS Auth & Shield
- **Frontend:** React 19, Inertia.js v3, Tailwind CSS v4, shadcn/ui (Radix UI), Lucide Icons, TanStack Table v8
- **Tooling:** TypeScript, Vite, ESLint, Prettier, Japa (testing)

---

## Prerequisites

- **Node.js** `>= 24.0.0`
- **npm**
- **MySQL** (default in `.env.example`) or **SQLite** (`better-sqlite3` is included)

---

## Installation & Setup

1. **Clone the repository and install dependencies**
   ```bash
   git clone <repository-url>
   cd school-lms
   npm install
   ```

2. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Generate an application key:
   ```bash
   node ace generate:key
   ```
   Update `.env` with your database credentials and initial admin account:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=your_password
   DB_DATABASE=school-lms

   ROOT_EMAIL=admin@school.edu
   ROOT_PASSWORD=your_secure_password
   ```
   *(To use SQLite instead of MySQL, set `DB_CONNECTION=sqlite`.)*

3. **Run database migrations**
   ```bash
   node ace migration:run
   ```

4. **Seed initial data**
   ```bash
   node ace db:seed
   ```
   This seeds the initial users (`ADMIN`, `TEACHER`, `STUDENT` via `user_seeder.ts`) and academic years (`2026` `ODD`/`EVEN` via `academic_year_seeder.ts`).

5. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3333`.

---

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start AdonisJS dev server with Vite HMR |
| `npm run build` | Build the production bundle |
| `npm run start` | Run the compiled production server |
| `npm run test` | Run Japa test suite |
| `npm run typecheck` | Run TypeScript checks for server and Inertia client |
| `npm run lint` | Run ESLint |
| `npm run lintf` | Run ESLint with `--fix` |
| `npm run format` | Format code with Prettier |

---

## Project Structure

```text
├── app/
│   ├── controllers/     # Route controllers (auth, admin, public, etc.)
│   ├── middleware/      # Auth, guest, role, inertia middleware
│   ├── models/          # Lucid models & ULID mixin
│   ├── transformers/    # Inertia/DTO data transformers
│   └── validators/      # VineJS request validators
├── database/
│   ├── migrations/      # Database schema migrations
│   └── seeders/         # Initial database seeders
├── inertia/
│   ├── components/      # Shared UI, sidebar, forms, DataTable
│   ├── layouts/         # Main & role-based layouts (AdminLayout, etc.)
│   └── pages/           # Public & role-protected Inertia pages
└── start/
    ├── routes/          # Modular route definitions
    ├── kernel.ts        # Middleware stack
    └── routes.ts        # Root route registration
```
