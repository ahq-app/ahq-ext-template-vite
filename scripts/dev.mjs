import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { build } from 'vite'
import { pack } from './pack.mjs'

const execFileAsync = promisify(execFile)

// Dev ビルドなど `ahq` が PATH に無い場合は、AHQ_BIN で実行ファイルを指定する。
// 例: AHQ_BIN="/path/to/ahq.app/Contents/MacOS/ahq" npm start
const AHQ_BIN = process.env.AHQ_BIN ?? 'ahq'

/** zip を AHQ にインストール（上書き）し、結果を表示する。 */
async function install(zipPath) {
  try {
    const { stdout } = await execFileAsync(AHQ_BIN, ['extension', 'install', zipPath, '--overwrite'], {
      maxBuffer: 64 * 1024 * 1024,
    })
    const result = JSON.parse(stdout)
    console.log(`[ahq] installed ${result.id}@${result.version}`)
    for (const warning of result.warnings ?? []) console.warn(`[ahq] warning: ${warning}`)
  } catch (error) {
    console.error(`[ahq] install failed: ${error.stderr?.trim() || error.message}`)
  }
}

const watcher = await build({ build: { watch: {} } })
watcher.on('event', async (event) => {
  if (event.code === 'ERROR') {
    console.error(event.error)
  } else if (event.code === 'END') {
    await install(pack())
  }
  if (event.result) await event.result.close()
})
console.log(`[ahq] watching... (AHQ_BIN=${AHQ_BIN})`)
