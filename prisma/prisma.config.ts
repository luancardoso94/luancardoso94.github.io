
    import { defineConfig } from 'prisma/config';

    export default defineConfig({
        seed: {
            path: './seed.ts',
            run: 'ts-node',
        },
    });