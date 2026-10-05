import { install } from './install.mjs'
import { pack } from './pack.mjs'

// ビルド済みの `dist/ext` を zip にして AHQ へ上書きインストールする（1 回で終了する）。
try {
  await install(pack())
} catch (error) {
  console.error(`[ahq] install failed: ${error.message}`)
  process.exitCode = 1
}
