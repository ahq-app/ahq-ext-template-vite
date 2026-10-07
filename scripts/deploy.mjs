import { install } from './install.mjs'
import { pack } from './pack.mjs'

// Zips the built `dist/ext` and overwrite-installs it into AHQ (finishes in one run).
try {
  await install(pack())
} catch (error) {
  console.error(`[ahq] install failed: ${error.message}`)
  process.exitCode = 1
}
