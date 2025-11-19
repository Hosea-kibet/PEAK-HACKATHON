import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

interface CleanRecord {
  fileName: string;
  originalPhone: string;
  cleanedPhone: string;
  isValid: boolean;
  errorMessage?: string;
  rowData: Record<string, unknown>;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fileName, originalPhone, cleanedPhone, isValid, errorMessage, rowData } = body;

    // Save to CleanedData table (unique constraint on originalPhone)
    const cleanedRecord = await prisma.cleanedData.create({
      data: {
        fileName,
        originalPhone,
        cleanedPhone,
        isValid,
        errorMessage: errorMessage || null,
        rowData,
      },
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Record cleaned and saved successfully',
      data: cleanedRecord 
    });
  } catch (error) {
    // Check if it's a unique constraint violation (already cleaned)
    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
      return NextResponse.json(
        { success: false, message: 'This record has already been cleaned', isDuplicate: true },
        { status: 409 }
      );
    }
    console.error('Error saving cleaned record:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to save cleaned record', error: String(error) },
      { status: 500 }
    );
  }
}

// Batch clean with date range
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { records } = body;

    if (!records || !Array.isArray(records)) {
      return NextResponse.json(
        { success: false, message: 'Invalid records data' },
        { status: 400 }
      );
    }

    // Create multiple records
    const cleanedRecords = await prisma.cleanedData.createMany({
      data: records.map((record: CleanRecord) => ({
        fileName: record.fileName,
        originalPhone: record.originalPhone,
        cleanedPhone: record.cleanedPhone,
        isValid: record.isValid,
        errorMessage: record.errorMessage || null,
        rowData: record.rowData as never,
      })),
    });

    return NextResponse.json({
      success: true,
      message: `${cleanedRecords.count} records cleaned and saved successfully`,
      count: cleanedRecords.count,
    });
  } catch (error) {
    console.error('Error batch cleaning records:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to batch clean records', error: String(error) },
      { status: 500 }
    );
  }
}
