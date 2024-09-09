# 天気予報アプリケーション

## 概要

このプロジェクトは、場所に基づいた天気を表示する Single Page Application (SPA)です。ユーザーは地名または緯度経度を入力して、特定の場所の天気情報を取得できます。

## 機能

- 現在の天気情報の表示
- 週間天気予報の表示
- 特定日時の詳細な天気情報の表示
- 地名または緯度経度による検索機能
- レスポンシブデザイン（PC/スマートフォン対応）

## 技術スタック

- フレームワーク: Next.js (React)
- 言語: TypeScript
- スタイリング: sass (module scss)
- API 通信: axios
- リンター: ESLint
- フォーマッター: prettier
- パッケージマネージャー: pnpm

## セットアップ

1. リポジトリのクローン

```bash
$ git clone https://github.com/Kang-Yuchan/weather-app.git
```

2. 依存関係のインストール

```bash
$ npm install -g pnpm

$ pnpm install
```

3. 環境変数の設定

`.env.sample`を参考に `.env.local` ファイルを作成し、以下の内容を追加します

```
NEXT_PUBLIC_WEATHER_API_KEY=your api key
```

4. 開発サーバーの起動

```bash
$ pnpm dev
```
