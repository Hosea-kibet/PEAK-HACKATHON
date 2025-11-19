import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'cleaned';
    const limit = parseInt(searchParams.get('limit') || '100');
    const fileName = searchParams.get('fileName');

    if (type === 'cleaned') {
      const data = await prisma.cleanedData.findMany({
        where: fileName ? { fileName } : undefined,
        take: limit,
        orderBy: { createdAt: 'desc' },
      });

      return NextResponse.json({
        success: true,
        data,
        count: data.length,
      });
    } else if (type === 'raw') {
      const data = await prisma.rawData.findMany({
        where: fileName ? { fileName } : undefined,
        take: limit,
        orderBy: { createdAt: 'desc' },
      });

      return NextResponse.json({
        success: true,
        data,
        count: data.length,
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid type parameter' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Data retrieval error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve data',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
