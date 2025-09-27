// app/api/skills/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const skills = await prisma.skill.findMany({
            orderBy: { name: 'asc' },
        });
        return NextResponse.json(skills);
    } catch (error) {
        console.error('Failed to fetch skills:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}