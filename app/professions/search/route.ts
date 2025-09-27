// app/api/professions/search/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const keyword = searchParams.get('keyword');
        const areaId = searchParams.get('areaId');
        const skillId = searchParams.get('skillId');

        const where: Prisma.ProfessionWhereInput = {};
        const filters = [];

        if (keyword) {
            filters.push({
                OR: [
                    { title: { contains: keyword, mode: 'insensitive' } },
                    { description: { contains: keyword, mode: 'insensitive' } },
                ],
            });
        }

        if (areaId) {
            filters.push({ areaId: areaId });
        }

        if (skillId) {
            filters.push({
                skills: {
                    some: { // 'some' significa que a profissao deve ter PELO MENOS a skill selecionada
                        id: skillId,
                    },
                },
            });
        }

        if (filters.length > 0) {
            where.AND = filters;
        }

        const professions = await prisma.profession.findMany({
            where,
            include: {
                area: true,
                skills: true,
            },
            orderBy: {
                title: 'asc',
            },
        });

        return NextResponse.json(professions);
    } catch (error) {
        console.error('Search API error:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}