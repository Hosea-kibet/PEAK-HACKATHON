# PEAK CSV Data Cleaner# PEAK CSV Data Cleaner



A production-ready web application for validating and cleaning bulk Kenyan phone numbers with advanced features like libphonenumber validation, duplicate detection, and telco identification.

It is built with Next.js as the backend and frontend.



## What It Does



- **Upload CSV files** with phone numbers

- **Automatic validation** using libphonenumber-js

- **Smart auto-fix** - removes invalid characters, adds +254 prefix##  What This Site Does

- **Error categorization** - identifies invalid chars, too short, too long, invalid format

- **Duplicate detection** - finds and removes duplicate numbers

- **Telco identification** - identifies Safaricom, Airtel, Telkom

- **Batch operations** - clean multiple records, submit to API, download CSV###  ##  Features

- **Real-time feedback** - toast notifications for all actions


## How to Run

- **Upload & Validate** CSV files containing phone numbers

### Quick Start (Automated)

-  **Auto-Clean** phone numbers (remove invalid chars, add country codes, format)

```bash

git clone https://github.com/Hosea-kibet/PEAK-HACKATHON.git-  **Identify Issues** - Categorize errors (invalid characters, too short, too long, invalid format)##  What This Site Does### Core Features

cd csv-cleaner

chmod +x start-dev.sh-  **Detect Duplicates** - Find and remove duplicate phone numbers

./start-dev.sh

```-  **Identify Telcos** - Determine which mobile operator each number belongs to-  **CSV Upload & Preview** - Drag-and-drop or browse to upload CSV files



### Manual Setup-  **Batch Process** - Clean multiple records at once with a single click



```bash-  **Generate Reports** - Download CSV reports of cleaned data###  Main Purpose-  **Phone Number Validation** - Automatic validation with yup schema validation

npm install

docker-compose up -d-  **Persistent Storage** - Save cleaned data to PostgreSQL database

npx prisma generate

npx prisma migrate dev-  **Submit to API** - Send clean records to PEAK backend with success notificationsThe PEAK CSV Data Cleaner is an enterprise-grade tool for:-  **Error Highlighting** - Visual indicators for invalid entries

npm run dev

```



Open http://localhost:3000###  Workflow-  **Upload & Validate** CSV files containing phone numbers-  **Inline Editing** - Edit problematic rows directly in the table



## Built On1. **Upload** a CSV file with phone numbers



### Frontend2. **Automatic Validation** runs immediately using libphonenumber-js-  **Auto-Clean** phone numbers (remove invalid chars, add country codes, format)-  **Advanced Data Table** - Built with @tanstack/react-table (sorting, filtering, pagination)

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

- **Balance Checking** - Mock API for verifying sufficient units before submission

- Supports multiple phone formats (international, local, short)

- Real-time validation feedback- **Statistics Dashboard** - View summary: total, valid, invalid, duplicate counts1. **Upload** a CSV file with phone numbers-  **Duplicate Detection** - Identify and remove duplicate phone numbers

- Batch clean, remove duplicates, remove invalid records

- CSV export of cleaned data- **Telco Distribution** - See breakdown of operators in your dataset

- Mock API submission with loading/success toasts

- PEAK brand theme (Navy blue + Orange)2. **Automatic Validation** runs immediately using libphonenumber-js-  **Real-time Balance Analysis** - Check available units against data to upload

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

# 4. Start development server```prisma

#### Remove Duplicates

```npm run devmodel CleanedData {

Button: "Remove All Duplicates"

→ Keeps first occurrence```  id            String   @id @default(uuid())

→ Removes all subsequent duplicates

→ Shows count of deleted records  fileName      String

```

Open [http://localhost:3000](http://localhost:3000) in your browser.  originalPhone String

#### Remove Invalid

```  cleanedPhone  String

Button: "Remove All Invalid"

→ Deletes all records with errors#### Option 3: Without Docker (Development Only)  isValid       Boolean

→ Keep only valid phone numbers

→ Shows count of deleted records```bash  errorMessage  String?

```

# Skip database and just run frontend  rowData       Json

### Step 5: Export or Submit

- **Download CSV** - Export cleaned data (includes all columns)npm install  createdAt     DateTime @default(now())

- **Submit to PEAK** - Send valid records to backend with success notification

npm run dev  updatedAt     DateTime @updatedAt

## 📱 Phone Number Validation Rules

}

### Supported Formats

The app intelligently handles various Kenyan phone number formats:# Note: Features requiring database will not work```



| Format | Example | Auto-Fixed To |```

|--------|---------|---------------|

| International | `+254712345678` | `+254712345678`  |## 🔧 Available Scripts

| Without + | `254712345678` | `+254712345678`  |

| Local | `0712345678` | `+254712345678`  |##  Docker Services

| Short | `712345678` | `+254712345678`  |

| With spaces | `+254 712 345 678` | `+254712345678`  |```bash

| With dashes | `0712-345-678` | `+254712345678`  |

The application includes pre-configured Docker services:# Development

### Auto-Fix Capabilities

-  Removes spaces, dashes, parenthesesnpm run dev              # Start development server

-  Removes letters and special characters

-  Adds country code (+254) if missing### PostgreSQL Databasenpm run build           # Create production build

-  Converts local format (07xx) to international

-  Validates prefix (7 or 1 after country code)- **Port**: 5432npm run start           # Start production server

-  Validates total length (12 digits with +254)

- **Database**: `csv_cleaner`npm run lint            # Run ESLint

### Error Categories

- **User**: `csvuser`

| Error Type | Example | Message |

|-----------|---------|---------|- **Password**: `csvpass123`# Database

| INVALID_CHARACTERS | `712#2028@701` | "Contains invalid characters - will be moved to manual cleaning tab" |

| TOO_SHORT | `712345` | "Too short (6 digits) - needs at least 9 digits - will be moved to manual cleaning tab" |- **Connection**: `postgresql://csvuser:csvpass123@localhost:5432/csv_cleaner`npm run db:generate     # Generate Prisma Client

| TOO_LONG | `7123456789012345` | "Too long (15 digits) - maximum 12 digits - will be moved to manual cleaning tab" |

| INVALID_FORMAT | `123456789` | "Invalid phone number format - will be moved to manual cleaning tab" |npm run db:migrate      # Run migrations

| INVALID_PREFIX | `2545123456789` | "Invalid Kenyan number (wrong prefix) - will be moved to manual cleaning tab" |

| EMPTY | `` (blank) | "Phone number is required" |### pgAdmin (Database Management UI)npm run db:push         # Push schema changes

| VALID | `0712345678` |  Auto-fixed and ready! |

- **URL**: [http://localhost:5050](http://localhost:5050)npm run db:studio       # Open Prisma Studio

## 📱 Telco Identification

- **Email**: `admin@csvcleaner.com`

The app identifies mobile operators based on phone prefixes:

- **Password**: `admin123`# Docker

| Operator | Prefix Ranges | Badge Color |

|----------|--------------|------------|npm run docker:up       # Start Docker containers

| **Safaricom** | 700-729, 740-748, 757-759, 768-769, 790-799, 110-115 |  Green |

| **Airtel** | 730-739, 750-756, 762-767, 770-778 |  Red |To stop Docker services:npm run docker:down     # Stop Docker containers

| **Telkom** | 770-789 |  Blue |

| **Unknown** | Other prefixes |  Gray |```bashnpm run docker:logs     # View Docker logs



*Note: Due to number portability in Kenya, identification is based on current allocation and may not reflect actual current operator.*docker-compose down



## 🔧 Available Commands```# Complete Setup



### Developmentnpm run setup           # Full setup (install, docker, migrate)

```bash

npm run dev              # Start development server (http://localhost:3000)```

npm run build           # Create production build

npm run start           # Start production server

npm run lint            # Run ESLint checks

``````## � API Endpoints



### Databasecsv-cleaner/

```bash

npx prisma generate    # Generate Prisma Client├── app/### POST /api/submit

npx prisma migrate dev # Run migrations

npx prisma studio     # Open Prisma Studio (database GUI)│   ├── api/Submit and store CSV data

```

│   │   ├── balance/route.ts       # Mock balance checking endpoint```typescript

### Docker

```bash│   │   ├── clean/route.ts         # Clean record endpoint{

docker-compose up -d   # Start containers

docker-compose down    # Stop containers│   │   ├── files/route.ts         # File history endpoint  data: Array<Record<string, unknown>>,

docker-compose logs    # View logs

docker-compose ps      # Show container status│   │   ├── submit/route.ts        # Data submission endpoint  metadata: { fileName: string }

```

│   │   └── upload/route.ts        # CSV upload endpoint}

### Full Setup

```bash│   ├── page.tsx                   # Main application page```

./start-dev.sh         # Complete automated setup

```│   ├── layout.tsx                 # Root layout with Toaster



##  API Endpoints│   ├── globals.css                # Global styles### GET /api/data



### POST `/api/upload`│   └── favicon.icoRetrieve stored data

Upload and store raw CSV data

```typescript├── components/```bash

Request Body:

{│   ├── DataTable.tsx              # Advanced data table with sorting/filtering# Get cleaned data

  fileName: string,

  rows: Array<Record<string, string>>│   ├── FileUpload.tsx             # Drag & drop file uploadGET /api/data?type=cleaned&limit=100

}

│   ├── StatsDashboard.tsx         # Statistics and metrics display

Response:

{│   ├── BalanceChecker.tsx         # Balance checking UI# Get raw data

  saved: number,

  duplicates: number,│   └── LoadingSpinner.tsx         # Loading indicatorGET /api/data?type=raw&limit=100&fileName=example.csv

  duplicatePhones: string[]

}├── lib/```

```

│   ├── phoneUtils.ts              # Phone validation & telco detection

### POST `/api/clean`

Clean and store individual record│   ├── csvUtils.ts                # CSV utilities### GET /api/balance

```typescript

Request Body:│   └── prisma.ts                  # Prisma client singletonCheck API balance (mock endpoint)

{

  fileName: string,├── types/

  originalPhone: string,

  cleanedPhone: string,│   └── index.ts                   # TypeScript interfaces & types## 🎯 Usage Guide

  isValid: boolean,

  errorMessage: string,├── prisma/

  rowData: Record<string, string>

}│   ├── schema.prisma              # Database schema1. **Upload CSV File**

```

│   └── migrations/                # Database migrations   - Drag and drop or click to browse

### POST `/api/submit`

Submit records to backend (mocked)├── public/   - Supports CSV files with phone number data

```typescript

Request Body:│   ├── image.png                  # PEAK logo

{

  data: Array<Record<string, string>>,│   └── sample-data.csv            # Example CSV for testing2. **Review Data**

  metadata: { fileName: string, totalRecords: number }

}├── docker-compose.yml             # Docker services configuration   - View validation results in the table



Response:├── .env                           # Environment variables (database URL)   - Sort, filter, and paginate through records

{ success: true, message: "Records submitted" }

```├── package.json                   # Dependencies   - Identify duplicates and invalid entries



### GET `/api/balance`├── tsconfig.json                  # TypeScript configuration

Check available units (mocked)

```typescript├── tailwind.config.ts             # Tailwind CSS configuration3. **Clean Data**

Response:

{├── next.config.ts                 # Next.js configuration   - Use auto-fix for common errors

  availableUnits: number,

  message: string└── README.md                      # This file   - Edit cells directly in the table

}

``````   - Remove duplicates or invalid rows



### GET `/api/files`

Get list of previously uploaded files

```typescript##  How to Use4. **Export Results**

Response:

{   - Click "Export CSV" to download cleaned data

  files: Array<{

    fileName: string,### Step 1: Upload CSV File   - Data is also stored in PostgreSQL for future reference

    recordCount: number,

    uploadedAt: string1. Click the upload area or drag and drop your CSV file

  }>

}2. File must contain a phone number column (auto-detected)5. **Database Access**

```

3. Supports formats: `.csv`, Excel exports   - View data in pgAdmin

##  UI/UX Features

   - Run SQL queries

### PEAK Brand Theme

- **Primary Color**: Navy Blue (`#1e3a8a`)**Supported Column Names**: `Phone`, `Mobile`, `Number`, `Contact`, `Phone Number`, etc.   - Monitor data history

- **Secondary Color**: Bright Orange (`#f97316`)

- **Background**: Gradient from slate to blue

- **Logo**: PEAK branding in header

### Step 2: View Validation Results## 🔍 Development

### Visual Feedback

-  Green badges for valid recordsAfter upload, the app displays:

-  Red badges for invalid records

-  Orange badges for duplicates-  **Statistics Dashboard** - Total records, valid/invalid counts, duplicate count### Project Structure

-  Blue for Safaricom

-  Red for Airtel- 📱 **Telco Distribution** - Breakdown of Safaricom, Airtel, Telkom, Unknown```

- 🟦 Blue for Telkom

- ⚪ Gray for Unknown- 🟢 **Valid Records** - Green badge for correctly formatted numberscsv-cleaner/



### Notifications- 🔴 **Invalid Records** - Red badge with error type and specific issue├── app/                 # Next.js app directory

- 📥 Loading toasts during operations

- ✅ Success toasts with completion message- 🟡 **Duplicates** - Yellow badge for repeated phone numbers│   ├── api/            # API routes

- ❌ Error toasts for failed operations

- 🎉 "Clean records submitted to PEAK HURRAY!" celebration message│   ├── page.tsx        # Main page



## 📊 Database Schema### Step 3: Filter & Review│   └── layout.tsx      # Root layout



### RawData TableUse filter buttons to view:├── components/         # React components

Stores original CSV uploads:

```prisma- **All** - Every record│   ├── DataTable.tsx   # Advanced table with react-table

model RawData {

  id        String   @id @default(uuid())- **Valid** - Only correctly formatted numbers (ready to submit)│   ├── FileUpload.tsx  # File upload component

  fileName  String

  rowData   Json- **Invalid** - Records with errors (categorized by error type)│   └── ...

  createdAt DateTime @default(now())

  updatedAt DateTime @updatedAt- **Duplicates** - Repeated phone numbers├── lib/                # Utilities

}

```│   ├── prisma.ts       # Prisma client



### CleanedData Table### Step 4: Clean Data│   ├── validation.ts   # Yup schemas

Stores processed and validated records:

```prismaChoose one of these options:│   └── ...

model CleanedData {

  id            String   @id @default(uuid())├── prisma/             # Prisma schema and migrations

  fileName      String

  originalPhone String#### Auto-Fix All├── types/              # TypeScript types

  cleanedPhone  String

  isValid       Boolean```├── docker-compose.yml  # Docker services

  errorMessage  String?

  rowData       JsonButton: "Auto-Fix All"└── DATABASE_SETUP.md   # Detailed setup guide

  createdAt     DateTime @default(now())

  updatedAt     DateTime @updatedAt→ Removes invalid characters automatically```

}

```→ Adds +254 prefix if missing



## 🧪 Testing→ Validates with libphonenumber### Environment Variables



### With Sample Data→ Only saves if result is valid```bash

1. Use the included `public/sample-data.csv`

2. Upload to test all features```DATABASE_URL="postgresql://csvuser:csvpass123@localhost:5432/csv_cleaner?schema=public"

3. Contains mix of valid, invalid, and duplicate records

```

### Example CSV Format

```csv#### Clean Selected Records

Name,Phone,Bundle

John Doe,0712345678,500MB```## 📚 Documentation

Jane Smith,+254723456789,1GB

Bob Wilson,254731119993,2GB1. Filter to "Valid" records

Alice Cooper,71#2345@678,100MB

```2. Select records with checkbox- [DATABASE_SETUP.md](DATABASE_SETUP.md) - Comprehensive database setup guide



## 🐛 Troubleshooting3. Click "Submit Selected"- [FEATURES.md](FEATURES.md) - Detailed feature documentation



### Issue: "Cannot connect to database"→ Shows loading toast- [IMPLEMENTATION.md](IMPLEMENTATION.md) - Implementation details

```bash

# Check Docker is running→ Simulates API submission (2 seconds)

docker ps

→ Shows "Clean records submitted to PEAK HURRAY! 🚀" success toast## 🐛 Troubleshooting

# Restart containers

docker-compose restart→ Records removed from selection



# Check DATABASE_URL in .env```### Database Connection Issues

cat .env

``````bash



### Issue: "CSV won't upload"#### Remove Duplicates# Check Docker containers

- ✅ Ensure file is valid CSV format

- ✅ Check file isn't corrupted```docker-compose ps

- ✅ Try re-exporting from Excel

- ✅ Verify phone column existsButton: "Remove All Duplicates"



### Issue: "Phone numbers not validating"→ Keeps first occurrence# View logs

- ✅ Check numbers are Kenyan (start with 254, 07, 7)

- ✅ Verify no invisible characters→ Removes all subsequent duplicatesdocker-compose logs postgres

- ✅ Check data doesn't have extra columns

→ Shows count of deleted records

### Issue: Port already in use

```bash```# Restart containers

# Modify ports in docker-compose.yml

# Or kill the process using the portdocker-compose restart

lsof -ti:5432 | xargs kill -9  # PostgreSQL

lsof -ti:5050 | xargs kill -9  # pgAdmin#### Remove Invalid```

```

```

### Issue: Prisma migration errors

```bashButton: "Remove All Invalid"### Prisma Issues

# Reset database (⚠️ deletes all data)

npx prisma migrate reset→ Deletes all records with errors```bash



# Or push schema→ Keep only valid phone numbers# Regenerate client

npx prisma db push

```→ Shows count of deleted recordsnpx prisma generate



## 📚 Additional Resources```



- [Next.js Documentation](https://nextjs.org/docs)# Reset database

- [Prisma Documentation](https://www.prisma.io/docs)

- [Tailwind CSS Docs](https://tailwindcss.com/docs)### Step 5: Export or Submitnpx prisma migrate reset

- [libphonenumber-js Docs](https://github.com/catamphetamine/libphonenumber-js)

- [PostgreSQL Docs](https://www.postgresql.org/docs)- **Download CSV** - Export cleaned data (includes all columns)```



## 🤝 Contributing- **Submit to PEAK** - Send valid records to backend with success notification



Contributions are welcome! Please feel free to submit a Pull Request.### Port Conflicts



## 📄 License## 📱 Phone Number Validation RulesModify ports in `docker-compose.yml` if 5432 or 5050 are in use.



MIT License - feel free to use this project for commercial or personal purposes.



## 📞 Support### Supported Formats## 📄 License



For issues, questions, or feature requests, please open an issue in the repository.The app intelligently handles various Kenyan phone number formats:



---MIT



**Built with ❤️ using Next.js, React, TypeScript, and Tailwind CSS**| Format | Example | Auto-Fixed To |



**Part of the PEAK Hackathon Project**|--------|---------|---------------|## 🤝 Contributing


| International | `+254712345678` | `+254712345678` ✅ |

| Without + | `254712345678` | `+254712345678` ✅ |Contributions are welcome! Please feel free to submit a Pull Request.

| Local | `0712345678` | `+254712345678` ✅ |

| Short | `712345678` | `+254712345678` ✅ |## 📞 Support

| With spaces | `+254 712 345 678` | `+254712345678` ✅ |

| With dashes | `0712-345-678` | `+254712345678` ✅ |For issues and questions, please open an issue on GitHub.



### Auto-Fix Capabilities## 📁 Project Structure

- ✅ Removes spaces, dashes, parentheses

- ✅ Removes letters and special characters```

- ✅ Adds country code (+254) if missingcsv-cleaner/

- ✅ Converts local format (07xx) to international├── app/

- ✅ Validates prefix (7 or 1 after country code)│   ├── api/

- ✅ Validates total length (12 digits with +254)│   │   ├── balance/       # Balance checking API endpoint

│   │   └── submit/        # Data submission API endpoint

### Error Categories│   ├── page.tsx           # Main application page

│   └── layout.tsx         # Root layout

| Error Type | Example | Message |├── components/

|-----------|---------|---------|│   ├── FileUpload.tsx     # CSV file upload component

| INVALID_CHARACTERS | `712#2028@701` | "Contains invalid characters - will be moved to manual cleaning tab" |│   ├── DataTable.tsx      # Interactive data table

| TOO_SHORT | `712345` | "Too short (6 digits) - needs at least 9 digits - will be moved to manual cleaning tab" |│   ├── StatsDashboard.tsx # Statistics dashboard

| TOO_LONG | `7123456789012345` | "Too long (15 digits) - maximum 12 digits - will be moved to manual cleaning tab" |│   └── BalanceChecker.tsx # Balance checking UI

| INVALID_FORMAT | `123456789` | "Invalid phone number format - will be moved to manual cleaning tab" |├── lib/

| INVALID_PREFIX | `2545123456789` | "Invalid Kenyan number (wrong prefix) - will be moved to manual cleaning tab" |│   ├── phoneUtils.ts      # Phone validation & telco detection

| EMPTY | `` (blank) | "Phone number is required" |│   └── csvUtils.ts        # CSV processing utilities

| VALID | `0712345678` | ✅ Auto-fixed and ready! |└── types/

    └── index.ts           # TypeScript type definitions

## 📱 Telco Identification```



The app identifies mobile operators based on phone prefixes:## 🎯 How to Use



| Operator | Prefix Ranges | Badge Color |### 1. Upload CSV File

|----------|--------------|------------|- Click the upload area or drag & drop your CSV file

| **Safaricom** | 700-729, 740-748, 757-759, 768-769, 790-799, 110-115 | 🟢 Green |- The app automatically detects phone and bundle columns

| **Airtel** | 730-739, 750-756, 762-767, 770-778 | 🔴 Red |

| **Telkom** | 770-789 | 🔵 Blue |### 2. Review Data

| **Unknown** | Other prefixes | ⚪ Gray |- View summary statistics in the dashboard

- Check telco distribution (Safaricom, Airtel, Telkom)

*Note: Due to number portability in Kenya, identification is based on current allocation and may not reflect actual current operator.*- Identify invalid entries (highlighted in red)

- See duplicate records (highlighted in yellow)

## 🔧 Available Commands

### 3. Clean Data

### Development- **Auto-Fix All**: Automatically format all phone numbers

```bash- **Remove Duplicates**: Keep only first occurrence of each number

npm run dev              # Start development server (http://localhost:3000)- **Remove Invalid**: Delete all rows with invalid phone numbers

npm run build           # Create production build- **Manual Edit**: Click on any cell to edit manually

npm run start           # Start production server

npm run lint            # Run ESLint checks### 4. Sort Data

```- Click column headers to sort ascending/descending

- Numeric sorting for bundle sizes

### Database

```bash### 5. Check Balance (Optional)

npx prisma generate    # Generate Prisma Client- Click "Check Balance" to verify sufficient units

npx prisma migrate dev # Run migrations- View warnings if balance is insufficient

npx prisma studio     # Open Prisma Studio (database GUI)

```### 6. Export or Submit

- **Download CSV**: Export cleaned data as CSV file

### Docker- **Submit to API**: Send data directly to backend (requires valid records only)

```bash

docker-compose up -d   # Start containers## 📱 Phone Number Formats Supported

docker-compose down    # Stop containers

docker-compose logs    # View logsThe application intelligently handles various phone number formats:

docker-compose ps      # Show container status

```- `+254712345678` (International format)

- `254712345678` (Without plus sign)

### Full Setup- `0712345678` (Local Kenyan format)

```bash- `712345678` (9 digits)

./start-dev.sh         # Complete automated setup

```### Common Auto-Fixes

- Removes spaces, dashes, and special characters

## 🌐 API Endpoints- Adds missing country code (+254)

- Removes extra zeros (e.g., 2540712... → 254712...)

### POST `/api/upload`- Validates correct length and prefix

Upload and store raw CSV data

```typescript## 🏢 Telco Identification

Request Body:

{The app identifies mobile network operators based on phone prefixes:

  fileName: string,

  rows: Array<Record<string, string>>- **Safaricom**: 7XX, 1XX series (green badge)

}- **Airtel**: 73X, 75X, 76X, 77X series (red badge)

- **Telkom**: 77X, 78X series (blue badge)

Response:

{*Note: Due to number portability in Kenya, telco identification is approximate.*

  saved: number,

  duplicates: number,## 🔧 API Configuration

  duplicatePhones: string[]

}### Balance API (`/api/balance`)

```Currently returns mock balance data. Update `app/api/balance/route.ts` to connect to your actual balance API:



### POST `/api/clean````typescript

Clean and store individual record// Replace mock with actual API call

```typescriptconst response = await fetch('https://your-api.com/balance', {

Request Body:  method: 'GET',

{  headers: { 'Authorization': 'Bearer YOUR_TOKEN' }

  fileName: string,});

  originalPhone: string,```

  cleanedPhone: string,

  isValid: boolean,### Submit API (`/api/submit`)

  errorMessage: string,Update `app/api/submit/route.ts` to submit to your backend:

  rowData: Record<string, string>

}```typescript

```const response = await fetch('https://your-backend-api.com/submit', {

  method: 'POST',

### POST `/api/submit`  headers: { 

Submit records to backend (mocked)    'Content-Type': 'application/json',

```typescript    'Authorization': 'Bearer YOUR_TOKEN'

Request Body:  },

{  body: JSON.stringify(exportRows)

  data: Array<Record<string, string>>,});

  metadata: { fileName: string, totalRecords: number }```

}

## 🎨 Customization

Response:

{ success: true, message: "Records submitted" }### Modify Phone Validation Rules

```Edit `lib/phoneUtils.ts` to customize validation logic:



### GET `/api/balance````typescript

Check available units (mocked)export function validateAndFormatPhone(input: string): PhoneValidationResult {

```typescript  // Add your custom validation logic

Response:}

{```

  availableUnits: number,

  message: string### Update Telco Prefixes

}Update the `TELCO_PREFIXES` object in `lib/phoneUtils.ts` as network operators change their prefix allocations.

```

### Styling

### GET `/api/files`All components use Tailwind CSS. Customize colors and styles in component files or update `tailwind.config.ts`.

Get list of previously uploaded files

```typescript## 📊 CSV Format Requirements

Response:

{Your CSV file should include:

  files: Array<{- A column containing phone numbers (auto-detected by keywords: phone, mobile, number, contact, etc.)

    fileName: string,- Optional: A column for bundle/data sizes (auto-detected)

    recordCount: number,

    uploadedAt: stringExample CSV:

  }>```csv

}Phone Number,Bundle Size,Name

```0712345678,100,John Doe

254723456789,250,Jane Smith

## 🎨 UI/UX Features```



### PEAK Brand Theme## 🐛 Troubleshooting

- **Primary Color**: Navy Blue (`#1e3a8a`)

- **Secondary Color**: Bright Orange (`#f97316`)### CSV Won't Upload

- **Background**: Gradient from slate to blue- Ensure file is valid CSV format

- **Logo**: PEAK branding in header- Check file isn't corrupted

- Try re-exporting from Excel/Sheets

### Visual Feedback

- 🟢 Green badges for valid records### Phone Numbers Not Validating

- 🔴 Red badges for invalid records- Verify phone column is detected correctly

- 🟡 Orange badges for duplicates- Check data contains actual Kenyan phone numbers

- 🔵 Blue for Safaricom- Look for non-standard characters in the data

- 🔴 Red for Airtel

- 🟦 Blue for Telkom### Balance Check Not Working

- ⚪ Gray for Unknown- Check browser console for errors

- Verify API endpoint is accessible

### Notifications- Update API configuration in `/app/api/balance/route.ts`

- 📥 Loading toasts during operations

- ✅ Success toasts with completion message## 🤝 Contributing

- ❌ Error toasts for failed operations

- 🎉 "Clean records submitted to PEAK HURRAY!" celebration messageContributions are welcome! Please feel free to submit a Pull Request.



## 📊 Database Schema## 📄 License



### RawData TableThis project is open source and available under the MIT License.

Stores original CSV uploads:

```prisma## 📞 Support

model RawData {

  id        String   @id @default(uuid())For issues or questions, please create an issue in the repository.

  fileName  String

  rowData   Json---

  createdAt DateTime @default(now())

  updatedAt DateTime @updatedAt**Built with ❤️ using Next.js and TypeScript**

}
```

### CleanedData Table
Stores processed and validated records:
```prisma
model CleanedData {
  id            String   @id @default(uuid())
  fileName      String
  originalPhone String
  cleanedPhone  String
  isValid       Boolean
  errorMessage  String?
  rowData       Json
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

## 🧪 Testing

### With Sample Data
1. Use the included `public/sample-data.csv`
2. Upload to test all features
3. Contains mix of valid, invalid, and duplicate records

### Example CSV Format
```csv
Name,Phone,Bundle
John Doe,0712345678,500MB
Jane Smith,+254723456789,1GB
Bob Wilson,254731119993,2GB
Alice Cooper,71#2345@678,100MB
```

## 🐛 Troubleshooting

### Issue: "Cannot connect to database"
```bash
# Check Docker is running
docker ps

# Restart containers
docker-compose restart

# Check DATABASE_URL in .env
cat .env
```

### Issue: "CSV won't upload"
- ✅ Ensure file is valid CSV format
- ✅ Check file isn't corrupted
- ✅ Try re-exporting from Excel
- ✅ Verify phone column exists

### Issue: "Phone numbers not validating"
- ✅ Check numbers are Kenyan (start with 254, 07, 7)
- ✅ Verify no invisible characters
- ✅ Check data doesn't have extra columns

### Issue: Port already in use
```bash
# Modify ports in docker-compose.yml
# Or kill the process using the port
lsof -ti:5432 | xargs kill -9  # PostgreSQL
lsof -ti:5050 | xargs kill -9  # pgAdmin
```

### Issue: Prisma migration errors
```bash
# Reset database (⚠️ deletes all data)
npx prisma migrate reset

# Or push schema
npx prisma db push
```

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [libphonenumber-js Docs](https://github.com/catamphetamine/libphonenumber-js)
- [PostgreSQL Docs](https://www.postgresql.org/docs)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for commercial or personal purposes.

## 📞 Support

For issues, questions, or feature requests, please open an issue in the repository.

---

**Built with ❤️ using Next.js, React, TypeScript, and Tailwind CSS**

**Part of the PEAK Hackathon Project**
