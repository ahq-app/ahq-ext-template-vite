import { execFile } from 'node:child_process'
import { resolve } from 'node:path'
import { promisify } from 'node:util'

const execFileAsync = promisify(execFile)

// Dev ビルドなど `ahq` が PATH に無い場合は、AHQ_BIN で実行ファイルを指定する。
// 例: AHQ_BIN="/path/to/ahq.app/Contents/MacOS/ahq" npm run deploy
export const AHQ_BIN = process.env.AHQ_BIN ?? 'ahq'

/**
 * zip を AHQ にインストール（上書き）し、結果を表示する。失敗時は例外を投げる。
 */
export async function install(zipPath) {
  let stdout
  try {
    ;({ stdout } = await execFileAsync(AHQ_BIN, ['extension', 'install', resolve(zipPath), '--overwrite'], {
      maxBuffer: 64 * 1024 * 1024,
    }))
  } catch (error) {
    throw new Error(error.stderr?.trim() || error.message)
  }
  const result = JSON.parse(stdout)
  console.log(`[ahq] installed ${result.id}@${result.version}`)
  for (const warning of result.warnings ?? []) console.warn(`[ahq] warning: ${warning}`)
}
