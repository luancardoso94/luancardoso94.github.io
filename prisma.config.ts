
// prisma.config.ts (localizado na raiz do projeto)
import { defineConfig } from '@prisma/cli';

export default defineConfig({
  seed: 'ts-node --compiler-options {"module":"CommonJS"} prisma/seed.ts',
});