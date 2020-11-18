const {build} = require('esbuild');
const path = require('path');
const env = process.env.NODE_ENV || 'development';

const options = {
  define: {'process.env.NODE_ENV': env},
  entryPoints: [path.resolve(__dirname, 'src/falcor-react-toolkit.ts')],
  minify: env === 'production',
  bundle: true,
  external: ['react'],
  sourcemap: env === 'development',
  target: 'es2019',
  // platform: 'browser',
  outdir: path.resolve(__dirname, 'dist'),
  tsconfig: path.resolve(__dirname, 'tsconfig.json'),
};

build(options).catch((err) => {
  process.stderr.write(err.stderr);
  process.exit(1);
});
