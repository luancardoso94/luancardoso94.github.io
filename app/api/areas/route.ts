// app/api/areas/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const areas = await prisma.area.findMany({
            orderBy: { name: 'asc' },
        });
        return NextResponse.json(areas);
    } catch (error) {
        console.error('Failed to fetch areas:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}