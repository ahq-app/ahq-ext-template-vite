/// <reference types="vite/client" />

declare module '~icons/*?raw' {
  const svg: string
  export default svg
}

/** AHQ が画面（iframe）へ自動で注入する RPC ランタイム。 */
interface Window {
  ahq: {
    /** `manifest.json` の `permissions` に宣言したメソッドを AHQ 本体に呼び出させる。 */
    call(method: string, params?: unknown): Promise<unknown>
  }
}
