import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding ...');

    // Limpa o banco de dados NA ORDEM CORRETA
    await prisma.profession.deleteMany();
    await prisma.skill.deleteMany();
    await prisma.area.deleteMany();
    console.log('Database cleaned.');

    // Cria Areas
    const tecnologia = await prisma.area.create({ data: { name: 'Tecnologia' } });
    const saude = await prisma.area.create({ data: { name: 'Saude' } });
    console.log('Areas created.');

    // Cria Habilidades
    const react = await prisma.skill.create({ data: { name: 'React' } });
    const nodejs = await prisma.skill.create({ data: { name: 'Node.js' } });
    const sql = await prisma.skill.create({ data: { name: 'SQL' } });
    const enfermagem = await prisma.skill.create({ data: { name: 'Cuidados de Enfermagem' } });
    console.log('Skills created.');

    // Cria Profissoes
    await prisma.profession.create({
        data: {
            title: 'Desenvolvedor Fullstack',
            description: 'Cria aplicacoes web completas, tanto frontend quanto backend.',
            salaryMin: 4000,
            salaryMax: 9000,
            areaId: tecnologia.id,
            skills: {
                connect: [
                    { id: react.id },
                    { id: nodejs.id },
                    { id: sql.id },
                ],
            },
        },
    });

    await prisma.profession.create({
        data: {
            title: 'Enfermeiro(a)',
            description: 'Cuida de pacientes em hospitais e clinicas.',
            salaryMin: 3000,
            salaryMax: 6000,
            areaId: saude.id,
            skills: {
                connect: [
                    { id: enfermagem.id },
                ],
            },
        },
    });


    console.log('Professions created.');
    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error('Seeding error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });