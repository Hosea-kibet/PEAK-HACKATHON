import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fileName = searchParams.get('fileName');
    const limit = parseInt(searchParams.get('limit') || '1000');

    if (fileName) {
      // Get specific file data
      const records = await prisma.rawData.findMany({
        where: {
          fileName: fileName,
        },
        orderBy: {
          createdAt: 'asc',
        },
        take: limit,
      });

      return NextResponse.json({
        success: true,
        fileName,
        count: records.length,
        records: records.map(r => ({
          id: r.id,
          ...(r.rowData as object),
        })),
      });
    } else {
      // Get list of all uploaded files
      const files = await prisma.rawData.groupBy({
        by: ['fileName'],
        _count: {
          fileName: true,
        },
        _max: {
          createdAt: true,
        },
      });

      return NextResponse.json({
        success: true,
        files: files.map(f => ({
          fileName: f.fileName,
          recordCount: f._count.fileName,
          uploadedAt: f._max.createdAt,
        })),
      });
    }
  } catch (error) {
    console.error('Error fetching files:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch files', error: String(error) },
      { status: 500 }
    );
  }
}
