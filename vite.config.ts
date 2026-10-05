import { copyFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import Icons from 'unplugin-icons/vite'

/** 拡張にそのまま同梱するファイル（出力先 `dist/ext` からの相対パスへの対応）。 */
const STATIC_FILES: Record<string, string> = {
  'manifest.json': 'manifest.json',
  'src/ui/index.html': 'ui/index.html',
  'src/ui/icon.svg': 'ui/icon.svg',
}

/**
 * ビルドしないファイルを出力先へコピーする。ウォッチ中も変更を拾う。
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

// AHQ は拡張機能の画面を `allow-same-origin` なしの sandbox iframe で表示する。
// このとき `<script type="module">` は CORS で読み込めないため、JS は単一の IIFE として出力し、
// HTML 側から通常の `<script>` で読み込む。
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
