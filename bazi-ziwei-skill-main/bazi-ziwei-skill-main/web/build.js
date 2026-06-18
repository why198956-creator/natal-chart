const path = require('path')

require('esbuild').build({
  entryPoints: [path.join(__dirname, 'entry.js')],
  bundle: true,
  platform: 'browser',
  format: 'iife',
  outfile: path.join(__dirname, 'bundle.js'),
  minify: true,
  logLevel: 'info',
}).catch(() => process.exit(1))
