/// <reference types="vite/client" />

declare module '~icons/*?raw' {
  const svg: string
  export default svg
}

/** The RPC runtime that AHQ injects into the screen (iframe) automatically. */
interface Window {
  ahq: {
    /** Calls a method of AHQ itself that is declared in `permissions` of `manifest.json`. */
    call(method: string, params?: unknown): Promise<unknown>
  }
}
