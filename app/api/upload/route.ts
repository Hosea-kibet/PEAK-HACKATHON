import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fileName, rows } = body;

    if (!fileName || !rows || !Array.isArray(rows)) {
      return NextResponse.json(
        { success: false, message: 'Invalid upload data' },
        { status: 400 }
      );
    }

    // Extract phone numbers and save to database
    // Database will automatically reject duplicates due to unique constraint
    const results = {
      saved: 0,
      duplicates: 0,
      errors: 0,
      duplicatePhones: [] as string[],
    };

    for (const row of rows) {
      // Find phone column
      const phoneEntry = Object.entries(row).find(([key]) => 
        key.toLowerCase().includes('phone') || key.toLowerCase().includes('mobile')
      );
      
      if (!phoneEntry) continue;
      
      const phone = String(phoneEntry[1] || '').trim();
      if (!phone) continue;

      try {
        await prisma.rawData.create({
          data: {
            fileName,
            phone,
            rowData: row as never,
          },
        });
        results.saved++;
      } catch (error: unknown) {
        // Check if it's a unique constraint violation (P2002)
        if (
          error instanceof Error && 
          'code' in error && 
          (error as { code: string }).code === 'P2002'
        ) {
          results.duplicates++;
          results.duplicatePhones.push(phone);
        } else {
          results.errors++;
          console.error('Error saving record:', error);
        }
      }
    }

    // Determine response based on results
    if (results.saved === 0 && results.duplicates > 0) {
      return NextResponse.json({
        success: false,
        isDuplicate: true,
        message: `All ${results.duplicates} records are duplicates (already in database)`,
        saved: results.saved,
        duplicates: results.duplicates,
        duplicatePhones: results.duplicatePhones.slice(0, 10), // Show first 10
      }, { status: 409 });
    }

    if (results.duplicates > 0) {
      return NextResponse.json({
        success: true,
        message: `Saved ${results.saved} new records. ${results.duplicates} duplicates skipped.`,
        saved: results.saved,
        duplicates: results.duplicates,
        duplicatePhones: results.duplicatePhones.slice(0, 10),
      });
    }

    return NextResponse.json({
      success: true,
      message: `${results.saved} records saved to database`,
      saved: results.saved,
      duplicates: 0,
    });
  } catch (error) {
    console.error('Error saving raw data:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to save raw data', error: String(error) },
      { status: 500 }
    );
  }
}

// Get uncleaned records
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '100');

    // Get all raw data records
    const rawRecords = await prisma.rawData.findMany({
      select: {
        id: true,
        fileName: true,
        rowData: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    });

    // Get all cleaned record IDs (we'll match by fileName and phone)
    const cleanedRecords = await prisma.cleanedData.findMany({
      select: {
        fileName: true,
        originalPhone: true,
      },
    });

    // Create a set of cleaned records for quick lookup
    const cleanedSet = new Set(
      cleanedRecords.map((r: { fileName: string; originalPhone: string }) => `${r.fileName}:${r.originalPhone}`)
    );

    // Filter to only uncleaned records
    const uncleanedRecords = rawRecords.filter((raw: typeof rawRecords[0]) => {
      const rowData = raw.rowData as Record<string, unknown>;
      // Try to find phone column
      const phoneValue = Object.entries(rowData).find(([key]) => 
        key.toLowerCase().includes('phone') || key.toLowerCase().includes('mobile')
      )?.[1];
      
      const key = `${raw.fileName}:${phoneValue}`;
      return !cleanedSet.has(key);
    });

    // Group by filename
    const groupedByFile = uncleanedRecords.reduce((acc: Record<string, typeof uncleanedRecords>, record: typeof uncleanedRecords[0]) => {
      if (!acc[record.fileName]) {
        acc[record.fileName] = [];
      }
      acc[record.fileName].push(record);
      return acc;
    }, {});

    return NextResponse.json({
      success: true,
      totalUncleaned: uncleanedRecords.length,
      totalRaw: rawRecords.length,
      totalCleaned: cleanedRecords.length,
      files: Object.keys(groupedByFile).map(fileName => ({
        fileName,
        uncleanedCount: groupedByFile[fileName].length,
        uploadedAt: groupedByFile[fileName][0].createdAt,
      })),
      records: uncleanedRecords.slice(0, 50), // Return first 50 for preview
    });
  } catch (error) {
    console.error('Error fetching uncleaned records:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch uncleaned records', error: String(error) },
      { status: 500 }
    );
  }
}
