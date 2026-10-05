# ahq-ext-kit

AHQ の拡張機能（画面を持つ addon）を、TypeScript / SCSS で開発するためのテンプレートです。
`ahq create-extension <name>` が、このリポジトリの最新リリースを取得して展開します。

## はじめかた

```sh
ahq create-extension my-ext
cd my-ext
npm install
npm start
```

`npm start` は、ファイルを保存するたびにビルドし、zip にまとめて `ahq extension install --overwrite` で AHQ に入れ直します。
AHQ を起動したままで、画面の更新を確認できます。

`ahq` が PATH に無い場合（Dev ビルドなど）は、`AHQ_BIN` で実行ファイルを指定します。

```sh
AHQ_BIN="/path/to/ahq.app/Contents/MacOS/ahq" npm start
```

## コマンド

| コマンド | 内容 |
| --- | --- |
| `npm start` | ウォッチしながらビルドし、保存のたびに AHQ へインストールする |
| `npm run build` | ビルドして `dist/ahq-addon-<id>-<version>.zip` を作る |
| `npm run check` | 型チェック |

## 構成

| パス | 内容 |
| --- | --- |
| `manifest.json` | 拡張の定義（id・name・views など）。仕様は AHQ の `docs/extension-spec.md` |
| `src/ui/index.html` | 画面の HTML。そのまま同梱される |
| `src/ui/main.ts` / `style.scss` | 画面のスクリプトとスタイル。1 つの JS / CSS にまとめて出力される |
| `src/ui/icon.svg` | 画面の呼び出しボタンに使うアイコン |

## 開発のヒント

- **JS は 1 つの IIFE にまとめて、通常の `<script>` で読み込みます。** AHQ は画面を `allow-same-origin` なしの sandbox iframe で表示するため、`type="module"` のスクリプトは読み込めません。
- **AHQ 本体の機能は `window.ahq.call(method, params)` で呼びます。** 呼べるメソッドは `manifest.json` の `permissions` に宣言したものだけです。
- **配色は `--ahq-color-*` の CSS 変数を使うと、AHQ のテーマに追従します。**
- **アイコンは [Iconify](https://iconify.design/) が使えます。** 使いたいセットを `npm i -D @iconify-json/<set>` で追加し、`import icon from '~icons/<set>/<name>?raw'` で SVG 文字列として取り込みます（`unplugin-icons`）。
- **`id` と `name` を変えるときは `manifest.json` を編集します。** `version` を変えると zip の名前も変わります。
- **フック（`hooks`）を使う場合は、`main` に指定する JS を別途ビルドします。** 詳しくは AHQ の `docs/extension-spec.md` を参照してください。
