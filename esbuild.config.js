const esbuild = require('esbuild');
const alias = require('esbuild-plugin-alias');

esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  platform: 'node',
  target: 'node18',
  outdir: 'dist',
  plugins: [
    alias({
      '@actions': require('path').resolve(__dirname, 'src/actions'),
      '@scenes': require('path').resolve(__dirname, 'src/scenes'),
      '@utils': require('path').resolve(__dirname, 'src/utils'),
      '@config': require('path').resolve(__dirname, 'src/config'),
      '@handlers': require('path').resolve(__dirname, 'src/handlers'),
    }),
  ],
})
.then(() => console.log('✅ Build complete'))
.catch(() => process.exit(1));
