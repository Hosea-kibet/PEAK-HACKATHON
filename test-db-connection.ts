import 'dotenv/config';
import { prisma } from './lib/prisma';

async function testConnection() {
  try {
    console.log('🔍 Testing database connection...');
    
    // Test connection
    await prisma.$connect();
    console.log('Database connected successfully!');
    
    // Count records in RawData
    const rawCount = await prisma.rawData.count();
    console.log(`RawData table has ${rawCount} records`);
    
    // Count records in CleanedData
    const cleanedCount = await prisma.cleanedData.count();
    console.log(`CleanedData table has ${cleanedCount} records`);
    
    // Show latest 5 raw records
    if (rawCount > 0) {
      console.log('\nLatest 5 raw records:');
      const latestRaw = await prisma.rawData.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          fileName: true,
          createdAt: true,
        },
      });
      console.table(latestRaw);
    }
    
    await prisma.$disconnect();
    console.log('\nTest completed!');
  } catch (error) {
    console.error('Error:', error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

testConnection();
