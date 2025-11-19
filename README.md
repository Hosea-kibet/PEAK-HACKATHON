# PEAK CSV Data Cleaner

A lightweight, production-ready tool for cleaning and validating bulk Kenyan phone numbers.

**Workflow:** Upload CSV → Clean → Fix → Deduplicate → Identify Telcos → Export CSV

**Stack:** Next.js + Prisma + PostgreSQL + Docker

---

## Features

- ✅ Validate phone numbers with libphonenumber-js
- ✅ Auto-fix invalid formats (+254, remove characters, normalize)
- ✅ Detect & remove duplicates
- ✅ Identify Safaricom, Airtel, Telkom
- ✅ CSV upload & export
- ✅ Inline editing for invalid entries
- ✅ Real-time toast notifications
- ✅ PostgreSQL history & storage
- ✅ Mobile responsive interface

---

## Quick Setup

```bash
npm install
docker-compose up -d
npx prisma generate
npx prisma migrate dev
npm run dev
```

Visit `http://localhost:3000`

---

## Docker Services

### PostgreSQL
- **Host:** localhost
- **Port:** 5432
- **User:** csvuser
- **Password:** csvpass123
- **Database:** csv_cleaner

### pgAdmin
- **URL:** http://localhost:5050
- **Email:** admin@csvcleaner.com
- **Password:** admin123

---

## Available Scripts

### Development
```bash
npm run dev              # Start development server
npm run build            # Production build
npm run start            # Run production
npm run lint             # Lint code
```

### Prisma
```bash
npx prisma generate      # Generate Prisma Client
npx prisma migrate dev   # Run migrations
npx prisma studio        # Open Prisma Studio GUI
```

### Docker
```bash
docker-compose up -d     # Start Docker services
docker-compose down      # Stop containers
```

---

## Tech Stack

| Category | Technologies |
|----------|--------------|
| **Frontend** | Next.js, React, TypeScript, Tailwind CSS, PapaParse, TanStack Table, react-hot-toast |
| **Backend** | Next.js API Routes |
| **Validation** | libphonenumber-js |
| **Database** | PostgreSQL 16, Prisma ORM |
| **DevOps** | Docker, Docker Compose, pgAdmin |

---

## License

MIT
