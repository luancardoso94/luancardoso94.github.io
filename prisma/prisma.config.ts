// prisma.config.ts
import { defineConfig } from 'prisma/config';
import path from 'path';

export default defineConfig({
  migrations: {
    // se você quiser customizar pasta de migrations ou outras opções
  },
  // *muitas vezes o seed não fica diretamente aqui se a configuração não aceitar*
  // Se aceitar, pode ser algo como:
  seed: 'ts-node --compiler-options {"module":"CommonJS"} prisma/seed.ts',
  // outros campos...
});
