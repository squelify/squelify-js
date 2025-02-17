import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index.ts',
    'src/client.ts',
    'src/types.ts',
    {
      builder: 'mkdist',
      input: 'src/services/',
      outDir: 'dist/services',
      format: 'esm',
    },
  ],
  declaration: true /* Generates .d.ts declaration file */,
  sourcemap: true /* Generates .map sourcemap file */,
  clean: true /* Clean the dist directory before building */,
  rollup: {
    emitCJS: false /* Don't emit CommonJS files */,
    commonjs: false /* Don't use CommonJS */,
  },
})
