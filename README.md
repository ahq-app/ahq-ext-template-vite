# ahq-ext-template-vite

English | [日本語](README.ja.md)

A template for building the kinds of [AHQ](https://github.com/ahq-app/ahq) extensions that **need a Vite build** (for example, extensions with screens) in TypeScript / SCSS.

Usually, a coding agent fetches it by following the instructions in [ahq-ext-kit](https://github.com/ahq-app/ahq-ext-kit) (specifications and `AGENTS.md`). To fetch it by hand, run one of the following commands.

```sh
ahq create-extension my-ext --template vite   # expands into the my-ext directory
ahq create-extension . --template vite        # expands into the current directory (the id is the directory name)
```

## Commands

| Command | Description |
| --- | --- |
| `npm run deploy` | Builds, puts the result in a zip and overwrite-installs it into AHQ (it finishes in one run) |
| `npm start` | Builds while watching and installs into AHQ on every save |
| `npm run build` | Builds and creates `dist/ahq-addon-<id>-<version>.zip` |
| `npm run check` | Type-checks |

If `ahq` is not on your PATH (for example, with a Dev build), specify the executable with `AHQ_BIN`.

```sh
AHQ_BIN="/path/to/ahq.app/Contents/MacOS/ahq" npm run deploy
```

## Structure

| Path | Description |
| --- | --- |
| `manifest.json` | The definition of the extension (id, name, views and so on) |
| `src/ui/index.html` | The HTML of the screen. Bundled as is |
| `src/ui/main.ts` / `style.scss` | The script and style of the screen. Output as a single JS / CSS file |
| `src/ui/icon.svg` | The icon used for the button that opens the screen |

## Notes

- Bundle the JS into a single IIFE and load it with a normal `<script>`. AHQ displays screens in a sandboxed iframe without `allow-same-origin`, so scripts with `type="module"` cannot be loaded.
- You can use [Iconify](https://iconify.design/) for icons. Add a set with `npm i -D @iconify-json/<set>` and import it as an SVG string with `import icon from '~icons/<set>/<name>?raw'` (`unplugin-icons`).
- For how to write `manifest.json` and how to call AHQ's features, see the specifications in [ahq-ext-kit](https://github.com/ahq-app/ahq-ext-kit) (`docs/en/`).

The Japanese version ([日本語](README.ja.md)) is the primary source, and the English version is updated to match it.
