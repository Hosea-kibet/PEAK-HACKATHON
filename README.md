# CSV Data Cleaner - Full-Featured Web Application

A powerful, enterprise-grade CSV cleaning web application built with Next.js, PostgreSQL, and Prisma. Designed for validating, formatting, and managing bulk data with advanced features like database persistence, table pagination, and data export capabilities.

## 🚀 Features

### Core Features
- ✅ **CSV Upload & Preview** - Drag-and-drop or browse to upload CSV files
- ✅ **Phone Number Validation** - Automatic validation with yup schema validation
- ✅ **Error Highlighting** - Visual indicators for invalid entries
- ✅ **Inline Editing** - Edit problematic rows directly in the table
- ✅ **Advanced Data Table** - Built with @tanstack/react-table (sorting, filtering, pagination)
- ✅ **Data Export** - Download cleaned CSV files with file-saver

### Database Features
- ✅ **PostgreSQL Storage** - Persistent storage of raw and cleaned data
- ✅ **Prisma ORM** - Type-safe database operations
- ✅ **Docker Compose** - Easy PostgreSQL and pgAdmin setup
- ✅ **Data History** - Track all uploaded and cleaned data with timestamps

### Intermediate Features
- ✅ **Duplicate Detection** - Identify and remove duplicate phone numbers
- ✅ **Real-time Balance Analysis** - Check available units against data to upload
- ✅ **Summary Dashboard** - View total records, valid/invalid counts, duplicate stats
- ✅ **Smart Auto-Fix** - Automatically fix common phone number errors

### Advanced Features
- ✅ **Telco Identification** - Identify Safaricom, Airtel, or Telkom based on prefixes
- ✅ **Schema Validation** - Yup-based validation for data integrity
- ✅ **API Integration** - RESTful API for data submission and retrieval
- ✅ **Batch Operations** - Auto-fix all, remove duplicates, remove invalid records

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **CSV Parsing**: PapaParse
- **Data Table**: @tanstack/react-table v8
- **Validation**: Yup
- **File Export**: file-saver
- **Icons**: Lucide React

### Backend & Database
- **Database**: PostgreSQL 16
- **ORM**: Prisma 6
- **Database Admin**: pgAdmin 4
- **Container**: Docker & Docker Compose
- **Runtime**: Node.js with pg driver

## 📋 Prerequisites

- **Node.js** 18.x or higher
- **Docker** and Docker Compose
- **npm** or yarn package manager

## 🚦 Quick Start

### Option 1: Automated Setup (Recommended)

```bash
# Run the setup script
./setup.sh
```

This will:
1. Install npm dependencies
2. Start Docker containers (PostgreSQL & pgAdmin)
3. Generate Prisma Client
4. Run database migrations

### Option 2: Manual Setup

```bash
# 1. Install dependencies
npm install

# 2. Start Docker services
docker-compose up -d

# 3. Generate Prisma Client
npx prisma generate

# 4. Run migrations
npx prisma migrate dev --name init

# 5. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🐳 Docker Services

The application includes the following services:

### PostgreSQL
- **Port**: 5432
- **Database**: csv_cleaner
- **User**: csvuser
- **Password**: csvpass123

### pgAdmin
- **URL**: http://localhost:5050
- **Email**: admin@csvcleaner.com
- **Password**: admin123

## 📊 Database Schema

### RawData Table
Stores original CSV data as uploaded:
```prisma
model RawData {
  id        String   @id @default(uuid())
  fileName  String
  rowData   Json
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### CleanedData Table
Stores processed and validated data:
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

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Create production build
npm run start           # Start production server
npm run lint            # Run ESLint

# Database
npm run db:generate     # Generate Prisma Client
npm run db:migrate      # Run migrations
npm run db:push         # Push schema changes
npm run db:studio       # Open Prisma Studio

# Docker
npm run docker:up       # Start Docker containers
npm run docker:down     # Stop Docker containers
npm run docker:logs     # View Docker logs

# Complete Setup
npm run setup           # Full setup (install, docker, migrate)
```

## � API Endpoints

### POST /api/submit
Submit and store CSV data
```typescript
{
  data: Array<Record<string, unknown>>,
  metadata: { fileName: string }
}
```

### GET /api/data
Retrieve stored data
```bash
# Get cleaned data
GET /api/data?type=cleaned&limit=100

# Get raw data
GET /api/data?type=raw&limit=100&fileName=example.csv
```

### GET /api/balance
Check API balance (mock endpoint)

## 🎯 Usage Guide

1. **Upload CSV File**
   - Drag and drop or click to browse
   - Supports CSV files with phone number data

2. **Review Data**
   - View validation results in the table
   - Sort, filter, and paginate through records
   - Identify duplicates and invalid entries

3. **Clean Data**
   - Use auto-fix for common errors
   - Edit cells directly in the table
   - Remove duplicates or invalid rows

4. **Export Results**
   - Click "Export CSV" to download cleaned data
   - Data is also stored in PostgreSQL for future reference

5. **Database Access**
   - View data in pgAdmin
   - Run SQL queries
   - Monitor data history

## 🔍 Development

### Project Structure
```
csv-cleaner/
├── app/                 # Next.js app directory
│   ├── api/            # API routes
│   ├── page.tsx        # Main page
│   └── layout.tsx      # Root layout
├── components/         # React components
│   ├── DataTable.tsx   # Advanced table with react-table
│   ├── FileUpload.tsx  # File upload component
│   └── ...
├── lib/                # Utilities
│   ├── prisma.ts       # Prisma client
│   ├── validation.ts   # Yup schemas
│   └── ...
├── prisma/             # Prisma schema and migrations
├── types/              # TypeScript types
├── docker-compose.yml  # Docker services
└── DATABASE_SETUP.md   # Detailed setup guide
```

### Environment Variables
```bash
DATABASE_URL="postgresql://csvuser:csvpass123@localhost:5432/csv_cleaner?schema=public"
```

## 📚 Documentation

- [DATABASE_SETUP.md](DATABASE_SETUP.md) - Comprehensive database setup guide
- [FEATURES.md](FEATURES.md) - Detailed feature documentation
- [IMPLEMENTATION.md](IMPLEMENTATION.md) - Implementation details

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Check Docker containers
docker-compose ps

# View logs
docker-compose logs postgres

# Restart containers
docker-compose restart
```

### Prisma Issues
```bash
# Regenerate client
npx prisma generate

# Reset database
npx prisma migrate reset
```

### Port Conflicts
Modify ports in `docker-compose.yml` if 5432 or 5050 are in use.

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues and questions, please open an issue on GitHub.

## 📁 Project Structure

```
csv-cleaner/
├── app/
│   ├── api/
│   │   ├── balance/       # Balance checking API endpoint
│   │   └── submit/        # Data submission API endpoint
│   ├── page.tsx           # Main application page
│   └── layout.tsx         # Root layout
├── components/
│   ├── FileUpload.tsx     # CSV file upload component
│   ├── DataTable.tsx      # Interactive data table
│   ├── StatsDashboard.tsx # Statistics dashboard
│   └── BalanceChecker.tsx # Balance checking UI
├── lib/
│   ├── phoneUtils.ts      # Phone validation & telco detection
│   └── csvUtils.ts        # CSV processing utilities
└── types/
    └── index.ts           # TypeScript type definitions
```

## 🎯 How to Use

### 1. Upload CSV File
- Click the upload area or drag & drop your CSV file
- The app automatically detects phone and bundle columns

### 2. Review Data
- View summary statistics in the dashboard
- Check telco distribution (Safaricom, Airtel, Telkom)
- Identify invalid entries (highlighted in red)
- See duplicate records (highlighted in yellow)

### 3. Clean Data
- **Auto-Fix All**: Automatically format all phone numbers
- **Remove Duplicates**: Keep only first occurrence of each number
- **Remove Invalid**: Delete all rows with invalid phone numbers
- **Manual Edit**: Click on any cell to edit manually

### 4. Sort Data
- Click column headers to sort ascending/descending
- Numeric sorting for bundle sizes

### 5. Check Balance (Optional)
- Click "Check Balance" to verify sufficient units
- View warnings if balance is insufficient

### 6. Export or Submit
- **Download CSV**: Export cleaned data as CSV file
- **Submit to API**: Send data directly to backend (requires valid records only)

## 📱 Phone Number Formats Supported

The application intelligently handles various phone number formats:

- `+254712345678` (International format)
- `254712345678` (Without plus sign)
- `0712345678` (Local Kenyan format)
- `712345678` (9 digits)

### Common Auto-Fixes
- Removes spaces, dashes, and special characters
- Adds missing country code (+254)
- Removes extra zeros (e.g., 2540712... → 254712...)
- Validates correct length and prefix

## 🏢 Telco Identification

The app identifies mobile network operators based on phone prefixes:

- **Safaricom**: 7XX, 1XX series (green badge)
- **Airtel**: 73X, 75X, 76X, 77X series (red badge)
- **Telkom**: 77X, 78X series (blue badge)

*Note: Due to number portability in Kenya, telco identification is approximate.*

## 🔧 API Configuration

### Balance API (`/api/balance`)
Currently returns mock balance data. Update `app/api/balance/route.ts` to connect to your actual balance API:

```typescript
// Replace mock with actual API call
const response = await fetch('https://your-api.com/balance', {
  method: 'GET',
  headers: { 'Authorization': 'Bearer YOUR_TOKEN' }
});
```

### Submit API (`/api/submit`)
Update `app/api/submit/route.ts` to submit to your backend:

```typescript
const response = await fetch('https://your-backend-api.com/submit', {
  method: 'POST',
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_TOKEN'
  },
  body: JSON.stringify(exportRows)
});
```

## 🎨 Customization

### Modify Phone Validation Rules
Edit `lib/phoneUtils.ts` to customize validation logic:

```typescript
export function validateAndFormatPhone(input: string): PhoneValidationResult {
  // Add your custom validation logic
}
```

### Update Telco Prefixes
Update the `TELCO_PREFIXES` object in `lib/phoneUtils.ts` as network operators change their prefix allocations.

### Styling
All components use Tailwind CSS. Customize colors and styles in component files or update `tailwind.config.ts`.

## 📊 CSV Format Requirements

Your CSV file should include:
- A column containing phone numbers (auto-detected by keywords: phone, mobile, number, contact, etc.)
- Optional: A column for bundle/data sizes (auto-detected)

Example CSV:
```csv
Phone Number,Bundle Size,Name
0712345678,100,John Doe
254723456789,250,Jane Smith
```

## 🐛 Troubleshooting

### CSV Won't Upload
- Ensure file is valid CSV format
- Check file isn't corrupted
- Try re-exporting from Excel/Sheets

### Phone Numbers Not Validating
- Verify phone column is detected correctly
- Check data contains actual Kenyan phone numbers
- Look for non-standard characters in the data

### Balance Check Not Working
- Check browser console for errors
- Verify API endpoint is accessible
- Update API configuration in `/app/api/balance/route.ts`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 📞 Support

For issues or questions, please create an issue in the repository.

---

**Built with ❤️ using Next.js and TypeScript**
