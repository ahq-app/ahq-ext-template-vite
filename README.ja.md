# ahq-ext-template-vite

[English](README.md) | 日本語

AHQ の拡張機能のうち、**Vite でのビルドが必要なもの**（画面付きの拡張など）を、TypeScript / SCSS で作るためのテンプレートです。

通常は、[ahq-ext-kit](https://github.com/ahq-app/ahq-ext-kit)（仕様書と `AGENTS.md`）の手順に従って、コーディングエージェントが取得します。手動で取得する場合は、次のコマンドを実行します。

```sh
ahq create-extension my-ext --template vite   # my-ext ディレクトリに展開する
ahq create-extension . --template vite        # 現在のディレクトリに展開する（id はディレクトリ名）
```

## コマンド

| コマンド | 内容 |
| --- | --- |
| `npm run deploy` | ビルドして zip にまとめ、AHQ へ上書きインストールする（1 回で終了する） |
| `npm start` | ウォッチしながらビルドし、保存のたびに AHQ へインストールする |
| `npm run build` | ビルドして `dist/ahq-addon-<id>-<version>.zip` を作る |
| `npm run check` | 型チェック |

`ahq` が PATH に無い場合（Dev ビルドなど）は、`AHQ_BIN` で実行ファイルを指定します。

```sh
AHQ_BIN="/path/to/ahq.app/Contents/MacOS/ahq" npm run deploy
```

## 構成

| パス | 内容 |
| --- | --- |
| `manifest.json` | 拡張の定義（id・name・views など） |
| `src/ui/index.html` | 画面の HTML。そのまま同梱される |
| `src/ui/main.ts` / `style.scss` | 画面のスクリプトとスタイル。1 つの JS / CSS にまとめて出力される |
| `src/ui/icon.svg` | 画面の呼び出しボタンに使うアイコン |

## 注意

- JS は 1 つの IIFE にまとめ、通常の `<script>` で読み込みます。AHQ は画面を `allow-same-origin` なしの sandbox iframe で表示するため、`type="module"` のスクリプトは読み込めません。
- アイコンは [Iconify](https://iconify.design/) が使えます。`npm i -D @iconify-json/<set>` でセットを追加し、`import icon from '~icons/<set>/<name>?raw'` で SVG 文字列として取り込みます（`unplugin-icons`）。
- `manifest.json` の書き方や、AHQ 本体の機能の呼び方は、[ahq-ext-kit](https://github.com/ahq-app/ahq-ext-kit) の仕様書（日本語版は `docs/ja/`）を参照してください。
