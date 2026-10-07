import { copyFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import Icons from 'unplugin-icons/vite'

/** Files bundled into the extension as is (mapped to paths relative to the output directory `dist/ext`). */
const STATIC_FILES: Record<string, string> = {
  'manifest.json': 'manifest.json',
  'src/ui/index.html': 'ui/index.html',
  'src/ui/icon.svg': 'ui/icon.svg',
}

/**
 * Copies files that are not built into the output directory. Changes are picked up while watching.
 */
function copyStaticFiles(): Plugin {
  let outDir = ''
  return {
    name: 'copy-static-files',
    configResolved(config) {
      outDir = config.build.outDir
    },
    buildStart() {
      for (const from of Object.keys(STATIC_FILES)) this.addWatchFile(from)
    },
    writeBundle() {
      for (const [from, to] of Object.entries(STATIC_FILES)) {
        mkdirSync(dirname(join(outDir, to)), { recursive: true })
        copyFileSync(from, join(outDir, to))
      }
    },
  }
}

// AHQ displays an extension's screen in a sandboxed iframe without `allow-same-origin`.
// A `<script type="module">` cannot be loaded there because of CORS, so the JS is output as a single IIFE
// and loaded from the HTML with a normal `<script>`.
export default defineConfig({
  plugins: [Icons({ compiler: 'raw' }), copyStaticFiles()],
  build: {
    outDir: 'dist/ext',
    emptyOutDir: true,
    cssCodeSplit: false,
    lib: {
      entry: 'src/ui/main.ts',
      formats: ['iife'],
      name: 'ahqExtension',
      fileName: () => 'ui/main.js',
      cssFileName: 'ui/main',
    },
  },
})
