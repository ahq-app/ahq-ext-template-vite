import { build } from 'vite'
import { AHQ_BIN, install } from './install.mjs'
import { pack } from './pack.mjs'

const watcher = await build({ build: { watch: {} } })
watcher.on('event', async (event) => {
  if (event.code === 'ERROR') {
    console.error(event.error)
  } else if (event.code === 'END') {
    try {
      await install(pack())
    } catch (error) {
      console.error(`[ahq] install failed: ${error.message}`)
    }
  }
  if (event.result) await event.result.close()
})
console.log(`[ahq] watching... (AHQ_BIN=${AHQ_BIN})`)
