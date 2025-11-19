# PEAK CSV Data Cleaner# PEAK CSV Data Cleaner# PEAK CSV Data Cleaner# PEAK CSV Data Cleaner



Validate and clean bulk Kenyan phone numbers with libphonenumber-js validation, duplicate detection, and telco identification.



## What This DoesValidate and clean bulk Kenyan phone numbers with libphonenumber-js validation, duplicate detection, and telco identification.



- Upload CSV files and validate phone numbers automatically

- Auto-fix invalid formats (removes chars, adds +254, converts local to international)

- Detect and remove duplicates## What It DoesA production-ready web application for validating and cleaning bulk Kenyan phone numbers with advanced features like libphonenumber validation, duplicate detection, and telco identification.

- Identify mobile operators (Safaricom, Airtel, Telkom)

- Batch operations: clean records, export CSV, submit to API

- Real-time validation feedback with toast notifications

- PostgreSQL data persistence- Upload CSV files and validate phone numbers automaticallyIt is built with Next.js as the backend and frontend.



## How to Run Locally- Auto-fix invalid formats (removes chars, adds +254, converts local to international)


npm install

docker-compose up -d

npx prisma migrate dev

npm run dev## Quick Start- **Upload CSV files** with phone numbers

```



Visit http://localhost:3000

```bash- **Automatic validation** using libphonenumber-js

## Prisma

git clone https://github.com/Hosea-kibet/PEAK-HACKATHON.git

```bash

npx prisma generate    # Generate Prisma Clientcd csv-cleaner- **Smart auto-fix** - removes invalid characters, adds +254 prefix##  What This Site Does

npx prisma migrate dev # Run database migrations

npx prisma studio     # Open Prisma Studio GUIchmod +x start-dev.sh

npx prisma db push    # Push schema changes to database

```./start-dev.sh- **Error categorization** - identifies invalid chars, too short, too long, invalid format



## Built On```



**Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS, react-hot-toast, @tanstack/react-table, libphonenumber-js, PapaParse- **Duplicate detection** - finds and removes duplicate numbers



**Backend:** Next.js API Routes, PostgreSQL 16, Prisma ORMOr manually:



**DevOps:** Docker, Docker Compose, pgAdmin```bash- **Telco identification** - identifies Safaricom, Airtel, Telkom



## Licensenpm install



MITdocker-compose up -d- **Batch operations** - clean multiple records, submit to API, download CSV###  ##  Features


npx prisma migrate dev

npm run dev- **Real-time feedback** - toast notifications for all actions

```



Visit http://localhost:3000



## Built With### Quick Start (Automated)



**Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS, react-hot-toast, @tanstack/react-table, libphonenumber-js, PapaParse-  **Auto-Clean** phone numbers (remove invalid chars, add country codes, format)



**Backend:** Next.js API Routes, PostgreSQL 16, Prisma ORM```bash



**DevOps:** Docker, Docker Compose, pgAdmingit clone https://github.com/Hosea-kibet/PEAK-HACKATHON.git-   



## Docker Servicescd csv-cleaner



- PostgreSQL: `localhost:5432` (csvuser:csvpass123)

- pgAdmin: `http://localhost:5050` (admin@csvcleaner.com:admin123)npm install



## Scriptsdocker-compose up -d-  **Persistent Storage** - Save cleaned data to PostgreSQL database



```bashnpx prisma generate

npm run dev              # Development

npm run build           # Production buildnpx prisma migrate dev-  **Submit to API** - Send clean records to PEAK backend with success notificationsThe PEAK CSV Data Cleaner is an enterprise-grade tool for:-  **Error Highlighting** - Visual indicators for invalid entries

npx prisma migrate dev  # Database migrations

docker-compose up -d    # Start Dockernpm run dev

```

```

## Features



- Multiple phone formats supported (international, local, short)

- 7 error types with detailed messagesOpen http://localhost:3000###  Workflow-  **Upload & Validate** CSV files containing phone numbers-  **Inline Editing** - Edit problematic rows directly in the table

- Batch clean, delete duplicates, remove invalid records

- Export cleaned data as CSV

- Mock API submission

- PEAK brand theme (Navy blue + Orange)## Built On1. **Upload** a CSV file with phone numbers

- Mobile responsive



## License

### Frontend2. **Automatic Validation** runs immediately using libphonenumber-js-  **Auto-Clean** phone numbers (remove invalid chars, add country codes, format)-  **Advanced Data Table** - Built with @tanstack/react-table (sorting, filtering, pagination)

MIT

- **Next.js 16** - React framework with App Router

- **React 19** - UI library3. **Review Results** - See valid, invalid, and duplicate records

- **TypeScript 5** - Type safety

- **Tailwind CSS 4** - Styling4. **Clean Data** - Auto-fix valid entries, flag invalid for manual review-  **Identify Issues** - Categorize errors (invalid characters, too short, too long, invalid format)-  **Data Export** - Download cleaned CSV files with file-saver

- **react-hot-toast** - Toast notifications

- **@tanstack/react-table v8** - Advanced data table5. **Download/Submit** - Get CSV report or send to PEAK backend

- **libphonenumber-js** - Phone validation

- **PapaParse** - CSV parsing6. **Track History** - All data stored in PostgreSQL for reference-  **Detect Duplicates** - Find and remove duplicate phone numbers

- **Lucide React** - Icons

- **file-saver** - CSV download



### Backend & Database##  Key Features-  **Identify Telcos** - Determine which mobile operator each number belongs to### Database Features

- **Next.js API Routes** - Backend endpoints

- **PostgreSQL 16** - Database

- **Prisma 6** - ORM

- **Docker** - Containerization### Core Cleaning Features-  **Batch Process** - Clean multiple records at once with a single click-  **PostgreSQL Storage** - Persistent storage of raw and cleaned data

- **pgAdmin 4** - Database admin UI

- **libphonenumber-js Integration** - Accurate Kenyan phone number validation (KE country code)

## Docker Services

- **Smart Auto-Fix** - Removes invalid characters, adds +254 prefix, validates-  **Generate Reports** - Download CSV reports of cleaned data-  **Prisma ORM** - Type-safe database operations

- **PostgreSQL**: localhost:5432 (csvuser:csvpass123)

- **pgAdmin**: http://localhost:5050 (admin@csvcleaner.com:admin123)- **Error Categorization** - 7 error types (INVALID_CHARACTERS, TOO_SHORT, TOO_LONG, INVALID_FORMAT, INVALID_PREFIX, EMPTY, VALID)



## Available Scripts- **Duplicate Detection** - Identify and remove duplicate phone numbers-  **Persistent Storage** - Save cleaned data to PostgreSQL database-  **Docker Compose** - Easy PostgreSQL and pgAdmin setup



```bash- **Inline Editing** - Edit cells directly in the table for manual corrections

npm run dev              # Start development server

npm run build           # Production build- **Batch Operations** - Clean selected records, delete duplicates, remove invalid entries-  **Submit to API** - Send clean records to PEAK backend with success notifications-  **Data History** - Track all uploaded and cleaned data with timestamps

npm run start           # Start production server

npm run lint            # ESLint

npx prisma generate    # Generate Prisma Client

npx prisma migrate dev # Run migrations### Validation & Analysis

docker-compose up -d   # Start Docker

docker-compose down    # Stop Docker- **Real-Time Validation** - Instant feedback as you upload or edit

```

- **Telco Identification** - Detect Safaricom, Airtel, Telkom, or Unknown operators### 🎬 Workflow### Intermediate Features

## Key Features


- Supports multiple phone formats (international, local, short)

- Real-time validation feedback- **Statistics Dashboard** - View summary: total, valid, invalid, duplicate counts1. **Upload** a CSV file with phone numbers-  **Duplicate Detection** - Identify and remove duplicate phone numbers

- Batch clean, remove duplicates, remove invalid records

- CSV export of cleaned data- **Telco Distribution** - See breakdown of operators in your dataset

- Mock API submission with loading.


- PostgreSQL data persistence

- Mobile responsive### Data Management



## Technology Stack Summary- **PostgreSQL Storage** - Persist raw and cleaned data with timestamps3. **Review Results** - See valid, invalid, and duplicate records-  **Summary Dashboard** - View total records, valid/invalid counts, duplicate stats



| Category | Technologies |- **File History** - Track all uploaded files and their metadata

|----------|--------------|

| Frontend | Next.js, React, TypeScript, Tailwind, react-hot-toast, @tanstack/react-table |- **CSV Export** - Download cleaned data with full details4. **Clean Data** - Auto-fix valid entries, flag invalid for manual review-  **Smart Auto-Fix** - Automatically fix common phone number errors

| Validation | libphonenumber-js |

| CSV | PapaParse, file-saver |- **Cleaning Reports** - Generated CSV with status, messages, and suggestions

| Backend | Next.js API Routes, PostgreSQL, Prisma ORM |

| DevOps | Docker, Docker Compose, pgAdmin |- **Toast Notifications** - Real-time feedback on submissions and operations5. **Download/Submit** - Get CSV report or send to PEAK backend



## License



MIT### User Experience6. **Track History** - All data stored in PostgreSQL for reference### Advanced Features


- **Drag & Drop Upload** - Easy file selection

- **Advanced Data Table** - Sort, filter, paginate through thousands of records-  **Telco Identification** - Identify Safaricom, Airtel, or Telkom based on prefixes

- **Color-Coded Badges** - Visual indicators for status (valid/invalid/telco)

- **Mobile Responsive** - Works on desktop and tablets##  Key Features-  **Schema Validation** - Yup-based validation for data integrity

- **PEAK Brand Theme** - Navy blue and orange color scheme matching company branding

-  **API Integration** - RESTful API for data submission and retrieval

##  Technology Stack

### Core Cleaning Features-  **Batch Operations** - Auto-fix all, remove duplicates, remove invalid records

### Frontend

| Technology | Purpose | Version |- **libphonenumber-js Integration** - Accurate Kenyan phone number validation (KE country code)

|-----------|---------|---------|

| **Next.js** | React framework with App Router | 16.0.3 |- **Smart Auto-Fix** - Removes invalid characters, adds +254 prefix, validates## 🛠️ Technology Stack

| **React** | UI library | 19.x |

| **TypeScript** | Type-safe JavaScript | 5.x |- **Error Categorization** - 7 error types (INVALID_CHARACTERS, TOO_SHORT, TOO_LONG, INVALID_FORMAT, INVALID_PREFIX, EMPTY, VALID)

| **Tailwind CSS** | Utility-first styling | 4.x |

| **PapaParse** | CSV parsing | 5.x |- **Duplicate Detection** - Identify and remove duplicate phone numbers### Frontend

| **libphonenumber-js** | Phone validation | 1.x |

| **react-hot-toast** | Toast notifications | Latest |- **Inline Editing** - Edit cells directly in the table for manual corrections- **Framework**: Next.js 16 (App Router)

| **@tanstack/react-table** | Advanced data table | v8 |

| **Lucide React** | Icons | Latest |- **Batch Operations** - Clean selected records, delete duplicates, remove invalid entries- **Language**: TypeScript

| **file-saver** | CSV download | Latest |

- **Styling**: Tailwind CSS 4

### Backend & Database

| Technology | Purpose | Version |### Validation & Analysis- **CSV Parsing**: PapaParse

|-----------|---------|---------|

| **Next.js API Routes** | Backend endpoints | 16.0.3 |- **Real-Time Validation** - Instant feedback as you upload or edit- **Data Table**: @tanstack/react-table v8

| **PostgreSQL** | Database | 16 |

| **Prisma** | ORM & migrations | 6.x |- **Telco Identification** - Detect Safaricom, Airtel, Telkom, or Unknown operators- **Validation**: Yup

| **pgAdmin** | Database admin UI | 4.x |

| **Docker** | Containerization | Latest |- **Balance Checking** - Mock API for verifying sufficient units before submission- **File Export**: file-saver

| **Docker Compose** | Multi-container orchestration | Latest |

- **Statistics Dashboard** - View summary: total, valid, invalid, duplicate counts- **Icons**: Lucide React

##  Installation & Setup

- **Telco Distribution** - See breakdown of operators in your dataset

### Prerequisites

- **Node.js** 18.x or higher### Backend & Database

- **npm** or yarn package manager

- **Docker** and Docker Compose (for database)### Data Management- **Database**: PostgreSQL 16



### Quick Start (5 minutes)- **PostgreSQL Storage** - Persist raw and cleaned data with timestamps- **ORM**: Prisma 6



#### Option 1: Automated Setup (Recommended)- **File History** - Track all uploaded files and their metadata- **Database Admin**: pgAdmin 4

```bash

# Clone the repository- **CSV Export** - Download cleaned data with full details- **Container**: Docker & Docker Compose

git clone https://github.com/Hosea-kibet/PEAK-HACKATHON.git

cd csv-cleaner- **Cleaning Reports** - Generated CSV with status, messages, and suggestions- **Runtime**: Node.js with pg driver



# Run setup script- **Toast Notifications** - Real-time feedback on submissions and operations

chmod +x start-dev.sh

./start-dev.sh##  Prerequisites

```

### User Experience

This automatically:

-  Installs npm dependencies- **Drag & Drop Upload** - Easy file selection- **Node.js** 18.x or higher

-  Starts Docker containers (PostgreSQL + pgAdmin)

-  Generates Prisma Client- **Advanced Data Table** - Sort, filter, paginate through thousands of records- **Docker** and Docker Compose

-  Runs database migrations

-  Starts development server on http://localhost:3000- **Color-Coded Badges** - Visual indicators for status (valid/invalid/telco)- **npm** or yarn package manager



#### Option 2: Manual Setup- **Mobile Responsive** - Works on desktop and tablets

```bash

# 1. Install dependencies- **PEAK Brand Theme** - Navy blue and orange color scheme matching company branding##  Quick Start

npm install



# 2. Start Docker services

docker-compose up -d##  Technology Stack### Option 1: Automated Setup (Recommended)



# 3. Set up Prisma

npx prisma generate

npx prisma migrate dev### Frontend```bash



# 4. Start development server| Technology | Purpose | Version |# Run the setup script

npm run dev

```|-----------|---------|---------|./setup.sh



Open [http://localhost:3000](http://localhost:3000) in your browser.| **Next.js** | React framework with App Router | 16.0.3 |```



#### Option 3: Without Docker (Development Only)| **React** | UI library | 19.x |

```bash

# Skip database and just run frontend| **TypeScript** | Type-safe JavaScript | 5.x |This will:

npm install

npm run dev| **Tailwind CSS** | Utility-first styling | 4.x |1. Install npm dependencies



# Note: Features requiring database will not work| **PapaParse** | CSV parsing | 5.x |2. Start Docker containers (PostgreSQL & pgAdmin)

```

| **libphonenumber-js** | Phone validation | 1.x |3. Generate Prisma Client

##  Docker Services

| **react-hot-toast** | Toast notifications | Latest |4. Run database migrations

The application includes pre-configured Docker services:

| **@tanstack/react-table** | Advanced data table | v8 |

### PostgreSQL Database

- **Port**: 5432| **Lucide React** | Icons | Latest |### Option 2: Manual Setup

- **Database**: `csv_cleaner`

- **User**: `csvuser`| **file-saver** | CSV download | Latest |

- **Password**: `csvpass123`

- **Connection**: `postgresql://csvuser:csvpass123@localhost:5432/csv_cleaner````bash



### pgAdmin (Database Management UI)### Backend & Database# 1. Install dependencies

- **URL**: [http://localhost:5050](http://localhost:5050)

- **Email**: `admin@csvcleaner.com`| Technology | Purpose | Version |npm install

- **Password**: `admin123`

|-----------|---------|---------|

To stop Docker services:

```bash| **Next.js API Routes** | Backend endpoints | 16.0.3 |# 2. Start Docker services

docker-compose down

```| **PostgreSQL** | Database | 16 |docker-compose up -d



##  Project Structure| **Prisma** | ORM & migrations | 6.x |



```| **pgAdmin** | Database admin UI | 4.x |# 3. Generate Prisma Client

csv-cleaner/

├── app/| **Docker** | Containerization | Latest |npx prisma generate

│   ├── api/

│   │   ├── balance/route.ts       # Mock balance checking endpoint| **Docker Compose** | Multi-container orchestration | Latest |

│   │   ├── clean/route.ts         # Clean record endpoint

│   │   ├── files/route.ts         # File history endpoint# 4. Run migrations

│   │   ├── submit/route.ts        # Data submission endpoint

│   │   └── upload/route.ts        # CSV upload endpoint##  Installation & Setupnpx prisma migrate dev --name init

│   ├── page.tsx                   # Main application page

│   ├── layout.tsx                 # Root layout with Toaster

│   ├── globals.css                # Global styles

│   └── favicon.ico### Prerequisites# 5. Start development server

├── components/

│   ├── DataTable.tsx              # Advanced data table with sorting/filtering- **Node.js** 18.x or highernpm run dev

│   ├── FileUpload.tsx             # Drag & drop file upload

│   ├── StatsDashboard.tsx         # Statistics and metrics display- **npm** or yarn package manager```

│   ├── BalanceChecker.tsx         # Balance checking UI

│   └── LoadingSpinner.tsx         # Loading indicator- **Docker** and Docker Compose (for database)

├── lib/

│   ├── phoneUtils.ts              # Phone validation & telco detectionOpen [http://localhost:3000](http://localhost:3000) to view the application.

│   ├── csvUtils.ts                # CSV utilities

│   └── prisma.ts                  # Prisma client singleton### Quick Start (5 minutes)

├── types/

│   └── index.ts                   # TypeScript interfaces & types## 🐳 Docker Services

├── prisma/

│   ├── schema.prisma              # Database schema#### Option 1: Automated Setup (Recommended)

│   └── migrations/                # Database migrations

├── public/```bashThe application includes the following services:

│   ├── image.png                  # PEAK logo

│   └── sample-data.csv            # Example CSV for testing# Clone the repository

├── docker-compose.yml             # Docker services configuration

├── .env                           # Environment variables (database URL)git clone https://github.com/Hosea-kibet/PEAK-HACKATHON.git### PostgreSQL

├── package.json                   # Dependencies

├── tsconfig.json                  # TypeScript configurationcd csv-cleaner- **Port**: 5432

├── tailwind.config.ts             # Tailwind CSS configuration

├── next.config.ts                 # Next.js configuration- **Database**: csv_cleaner

└── README.md                      # This file

```# Run setup script- **User**: csvuser




- **URL**: http://localhost:5050

**Supported Column Names**: `Phone`, `Mobile`, `Number`, `Contact`, `Phone Number`, etc.

This automatically:- **Email**: admin@csvcleaner.com

### Step 2: View Validation Results

After upload, the app displays:-  Installs npm dependencies- **Password**: admin123

-  **Statistics Dashboard** - Total records, valid/invalid counts, duplicate count

- 📱 **Telco Distribution** - Breakdown of Safaricom, Airtel, Telkom, Unknown-  Starts Docker containers (PostgreSQL + pgAdmin)

-  **Valid Records** - Green badge for correctly formatted numbers

-  **Invalid Records** - Red badge with error type and specific issue-  Generates Prisma Client##  Database Schema

-  **Duplicates** - Yellow badge for repeated phone numbers

-  Runs database migrations

### Step 3: Filter & Review

Use filter buttons to view:-  Starts development server on http://localhost:3000### RawData Table

- **All** - Every record

- **Valid** - Only correctly formatted numbers (ready to submit)Stores original CSV data as uploaded:

- **Invalid** - Records with errors (categorized by error type)

- **Duplicates** - Repeated phone numbers#### Option 2: Manual Setup```prisma



### Step 4: Clean Data```bashmodel RawData {

Choose one of these options:

# 1. Install dependencies  id        String   @id @default(uuid())

#### Auto-Fix All

```npm install  fileName  String

Button: "Auto-Fix All"

→ Removes invalid characters automatically  rowData   Json

→ Adds +254 prefix if missing

→ Validates with libphonenumber# 2. Start Docker services  createdAt DateTime @default(now())

→ Only saves if result is valid

```docker-compose up -d  updatedAt DateTime @updatedAt



#### Clean Selected Records}

```

1. Filter to "Valid" records# 3. Set up Prisma```

2. Select records with checkbox

3. Click "Submit Selected"npx prisma generate

→ Shows loading toast

→ Simulates API submission (2 seconds)npx prisma migrate dev### CleanedData Table

→ Shows "Clean records submitted to PEAK HURRAY! 🚀" success toast

→ Records removed from selectionStores processed and validated data:

```

