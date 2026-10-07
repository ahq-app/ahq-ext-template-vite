import { execFile } from 'node:child_process'
import { resolve } from 'node:path'
import { promisify } from 'node:util'

const execFileAsync = promisify(execFile)

// If `ahq` is not on the PATH (for example, with a Dev build), specify the executable with AHQ_BIN.
// Example: AHQ_BIN="/path/to/ahq.app/Contents/MacOS/ahq" npm run deploy
export const AHQ_BIN = process.env.AHQ_BIN ?? 'ahq'

/**
 * Overwrite-installs the zip into AHQ and prints the result. Throws on failure.
 */
export async function install(zipPath) {
  let stdout
  try {
    ;({ stdout } = await execFileAsync(AHQ_BIN, ['extension', 'install', resolve(zipPath), '--overwrite', '--json'], {
      maxBuffer: 64 * 1024 * 1024,
    }))
  } catch (error) {
    throw new Error(error.stderr?.trim() || error.message)
  }
  const result = JSON.parse(stdout)
  console.log(`[ahq] installed ${result.id}@${result.version}`)
  for (const warning of result.warnings ?? []) console.warn(`[ahq] warning: ${warning}`)
}
