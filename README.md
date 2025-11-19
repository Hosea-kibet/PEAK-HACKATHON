# PEAK CSV Data Cleaner

A lightweight, production-ready tool for cleaning and validating bulk Kenyan phone numbers.

**Workflow:** Upload CSV → Clean → Fix → Deduplicate → Identify Telcos → Export CSV

**Stack:** Next.js + Prisma + PostgreSQL + Docker

---

##  Setup
Follow These Steps

**Step 1: Install Dependencies**
```bash
npm install
```

**Step 2: Start Docker (PostgreSQL & pgAdmin)**
```bash
npm run docker:up
```
 Wait 5-10 seconds for PostgreSQL to start

**Step 3: Setup Prisma & Database**
```bash
npm run db:generate
npm run db:migrate
```

**Step 4: Start Development Server**
```bash
npm run dev
```

 Visit `http://localhost:3000`

---

## Features

-  Validate phone numbers with libphonenumber-js
-  Auto-fix invalid formats (+254, remove characters, normalize)
-  Detect & remove duplicates
-  Identify Safaricom, Airtel, Telkom
-  CSV upload & export
-  Inline editing for invalid entries
-  Real-time toast notifications
-  PostgreSQL history & storage
-  Mobile responsive interface

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

### Database (Prisma)
```bash
npm run db:generate      # Generate Prisma Client
npm run db:migrate       # Run database migrations
npm run db:push          # Push schema to database (force reset)
npm run db:studio        # Open Prisma Studio GUI
npm run db:seed          # Seed database
npm run db:test          # Test database connection
npm run db:fix-phones    # Fix scientific notation in phone numbers
```

### Docker
```bash
npm run docker:up        # Start Docker containers
npm run docker:down      # Stop Docker containers
npm run docker:logs      # View Docker logs
```

### Complete Setup
```bash
npm run setup            # Install + Docker + Generate + Migrate (all-in-one)
```

---

## Tech Stack

| Category | Technologies |
|----------|--------------|
| **Frontend** | Next.js 16, React 19, TypeScript, Tailwind CSS, PapaParse, TanStack Table, react-hot-toast |
| **Backend** | Next.js API Routes |
| **Validation** | libphonenumber-js |
| **Database** | PostgreSQL 16, Prisma ORM |
| **DevOps** | Docker, Docker Compose, pgAdmin |

---

## License

MIT
