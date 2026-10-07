import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { zipSync } from 'fflate'

const EXT_DIR = 'dist/ext'

/**
 * Zips `dist/ext` into a file that can be installed into AHQ, and returns its path.
 * The file name follows AHQ's naming rule `ahq-<category>-<id>-<version>.zip`.
 */
export function pack() {
  const manifest = JSON.parse(readFileSync(join(EXT_DIR, 'manifest.json'), 'utf8'))
  const files = {}
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      const path = join(dir, name)
      if (statSync(path).isDirectory()) walk(path)
      else files[relative(EXT_DIR, path).split(sep).join('/')] = readFileSync(path)
    }
  }
  walk(EXT_DIR)

  const zipPath = join('dist', `ahq-${manifest.category}-${manifest.id}-${manifest.version}.zip`)
  writeFileSync(zipPath, zipSync(files))
  return zipPath
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  console.log(pack())
}
