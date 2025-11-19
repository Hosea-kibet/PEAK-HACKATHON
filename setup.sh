#!/bin/bash

# CSV Cleaner - Complete Setup Script

echo "🚀 Starting CSV Cleaner Setup..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

echo "📦 Installing npm dependencies..."
npm install

echo "🐳 Starting Docker containers (PostgreSQL & pgAdmin)..."
docker-compose up -d

echo "⏳ Waiting for PostgreSQL to be ready..."
sleep 5

echo "🔄 Generating Prisma Client..."
npx prisma generate

echo "📊 Running database migrations..."
npx prisma migrate dev --name init

echo "✅ Setup complete!"
echo ""
echo "🌐 Services running:"
echo "   - Next.js App: http://localhost:3000 (run 'npm run dev' to start)"
echo "   - PostgreSQL: localhost:5432"
echo "   - pgAdmin: http://localhost:5050"
echo ""
echo "📚 pgAdmin Credentials:"
echo "   Email: admin@csvcleaner.com"
echo "   Password: admin123"
echo ""
echo "🎯 Next steps:"
echo "   1. Run 'npm run dev' to start the development server"
echo "   2. Open http://localhost:3000 in your browser"
echo "   3. Access pgAdmin at http://localhost:5050 (optional)"
echo ""
echo "📖 For more information, see DATABASE_SETUP.md"
