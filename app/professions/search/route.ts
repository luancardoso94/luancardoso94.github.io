// app/api/professions/search/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client'; // <-- IMPORTANTE: ADICIONE `Prisma` AQUI

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const keyword = searchParams.get('keyword');
    const areaId = searchParams.get('areaId');
    const skillId = searchParams.get('skillId');

    // A CORRECAO PRINCIPAL ESTA AQUI
    const filters: Prisma.ProfessionWhereInput[] = [];

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
          some: {
            id: skillId,
          },
        },
      });
    }
    
    // Este bloco agora E seguro e nao dara erro de tipo
    const where: Prisma.ProfessionWhereInput = {};
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