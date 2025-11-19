import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { validatePhone } from '@/lib/validation';

// This endpoint receives cleaned CSV data and stores it in the database
export async function POST(request: NextRequest) {
  try {
    const { data, metadata } = await request.json();

    // Store raw data first
    const rawDataRecords = data.map((row: Record<string, unknown>) => ({
      fileName: metadata?.fileName || 'unknown.csv',
      rowData: row,
    }));

    await prisma.rawData.createMany({
      data: rawDataRecords,
    });

    // Process and store cleaned data
    const cleanedDataRecords = await Promise.all(
      data.map(async (row: Record<string, unknown>) => {
        const originalPhone = String(row.phone || '');
        const validation = await validatePhone(originalPhone);
        
        // Basic phone cleaning - remove spaces, dashes, parentheses
        const cleanedPhone = originalPhone.replace(/[\s\-()]/g, '');

        return {
          fileName: metadata?.fileName || 'unknown.csv',
          originalPhone,
          cleanedPhone,
          isValid: validation.isValid,
          errorMessage: validation.error || null,
          rowData: row,
        };
      })
    );

    const result = await prisma.cleanedData.createMany({
      data: cleanedDataRecords,
    });

    console.log('Data processed and stored:', {
      recordCount: data.length,
      metadata
    });

    // Mock success response
    const response = {
      success: true,
      message: 'Data submitted successfully',
      recordsProcessed: result.count,
      submissionId: `SUB-${Date.now()}`,
      timestamp: new Date().toISOString()
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Submission error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to submit data',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

