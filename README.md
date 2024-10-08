# 天気予報アプリケーション

## 概要

このプロジェクトは、場所と日付に基づいた天気情報を表示する Single Page Application (SPA) です。ユーザーは地名または緯度経度を入力して、特定の場所の現在の天気と予報を取得できます。また、その場所の特定の日付の詳細な天気情報も閲覧可能です。

## 機能

- 現在の天気情報の表示

  - 地名または緯度経度による検索機能
  - 詳細な気象データの表示（気温、湿度、風速など）

- 7 日間天気予報の表示

  - 各日の概要（最高/最低気温、天気アイコン）
  - それぞれのリンクをクリックすることで特定日の詳細ページへ遷移

- 特定日の詳細天気情報表示

  - 選択した日付の詳細な気象データ
  - 時間ごとの天気予報
  - 地域名での再検索機能（同じ日付で別の地域の天気を表示）

- ナビゲーションと UX

  - 直感的な UX
  - 検索履歴の維持（URL 構造による状態の保持）
  - スムーズなページ遷移とデータ更新

- レスポンシブデザイン

  - PC、タブレット、スマートフォンなど、様々なデバイスに対応

- パフォーマンスとアクセシビリティの最適化
  - 効率的なデータ取得と表示
    - API リクエストの最適化
    - レンダリングパフォーマンスの向上
  - スムーズなユーザーインタラクション
    - リアルタイムの検索サジェスト
    - ページ遷移時のスムーズなアニメーション
  - キーボードアクセシビリティ
    - 検索バーでのキーボードナビゲーション対応
      - 矢印キーによる検索サジェスト間の移動
      - エンターキーによる選択と検索実行
    - フォーカス可能な全要素へのキーボードアクセス
  - スクリーンリーダー対応
    - 適切な ARIA ラベルとロールの使用

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
WEATHER_API_KEY=your api key
```

4. 開発サーバーの起動

```bash
$ pnpm dev
```

## 技術スタック

- フレームワーク: Next.js (React)
- 言語: TypeScript
- スタイリング: sass (module scss)
- API 通信: axios
- 状態管理・データフェッチ: SWR
- ユニットテスト: jest
- E2E テスト: Playwright
- リンター: ESLint
- フォーマッター: prettier
- パッケージマネージャー: pnpm
- CI: Github Actions
- デプロイ: Vercel

## プロジェクト構成

```
weather-app/
├── .github/
│   └── workflows/
│       └── ci.yml
├── .next/
├── .vscode/
├── node_modules/
├── playwright-report/
├── public/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── api
│   │   │   └── weather
│   │   ├── specific_day/[location]/[date]/
│   │   │   ├── page.module.scss
│   │   │   ├── page.test.tsx
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── page.module.scss
│   │   ├── page.test.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── features/
│   │   │   ├── CurrentWeatherDisplay/
│   │   │   ├── DayForecastCard/
│   │   │   ├── ForecastWeatherDisplay/
│   │   │   ├── HourlyDetailCard/
│   │   │   ├── LocationSearchBar/
│   │   │   └── SpecificDayWeatherDisplay/
│   │   ├── header/
│   │   ├── Layout/
│   │   └── ui/
│   │       ├── DetailItem/
│   │       └── Input/
│   ├── hooks/
│   │   ├── common/
│   │   │   └── useSearchKeyboardNavigation/
│   │   ├── search/
│   │   └── weather/
│   │       ├── useCurrentWeather/
│   │       ├── useForecastWeather/
│   │       ├── useSpecificDayWeather/
│   │       └── useWeatherQuery/
│   ├── lib/
│   │   ├── api.ts
│   │   ├── format.ts
│   │   └── mockData.ts
│   ├── styles/
│   │   ├── globals.scss
│   │   ├── mixin.scss
│   │   └── variables.scss
│   ├── types/
│   │   └── weather.ts
│   └── utils/
│       └── temperatureUtils.ts
├── test-results/
├── tests/
│   ├── home.spec.ts
│   └── specific_day.spec.ts
├── .env.local
├── .env.sample
├── .eslintrc.json
├── .gitignore
├── .prettierrc
├── jest.config.ts
├── jest.setup.ts
├── next-env.d.ts
├── next.config.mjs
├── package.json
├── playwright.config.ts
├── pnpm-lock.yaml
├── README.md
└── tsconfig.json
```

## 外部ライブラリの採用理由

### axios

- 可読性と使いやすさ: axios は標準の fetchAPI と比較して、より直感的な API を提供し、コードの可読性が向上します。
- 安定性と実績: 長年にわたり広く使用され、安定性が実証されています。
- 自動変換: レスポンスデータの JSON パースを自動で行うなど、便利な機能が多く実装されています。
- インターセプター: リクエストやレスポンスを簡単に加工できる機能があり、認証トークンの管理などに便利です。
- エラーハンドリング: より詳細なエラー情報を提供し、エラーハンドリングが容易になります。

### SWR

- 性能とユーザー体験の向上: キャッシュからデータを即座に表示し、バックグラウンドで再検証を行うことで、高速なユーザー体験を提供します。
- 自動再取得: ウィンドウにフォーカスが当たった時や、ネットワーク回復時に自動的にデータを再取得します。
- ローディングとエラー状態の簡易管理: ローディング状態やエラー状態を簡単に扱えるため、コードの可読性と保守性が向上します。
- デバウンスとスロットリング: 頻繁なデータフェッチを最適化し、パフォーマンスを向上させます。
- ページネーションや Infinite Loading のサポート: これらの複雑な機能を簡単に実装できます。
- TypeScript サポート: 型安全性が高く、開発効率が向上します。
- 業界標準: 多くのプロジェクトで採用されており、開発者の学習コストが低くなります。

### SWR vs React Query

- SWR は、React Query と比較して、よりシンプルでリーンな設計となっています。本プロジェクトの規模と要件に最適なバランスを提供していると判断し、採用しました。

## 初めて使用する技術の採用

### Playwright

このプロジェクトで初めて採用した主要な技術は Playwright です。E2E（エンドツーエンド）テストツールとして、Playwright を選択しました。

#### 代替技術との比較

代替となる技術としては Cypress があります。私は以前、関わりとしては限定的でしたが、務プロジェクトで Cypress の導入を経験したことがあります。

#### 選択理由

1. 学習と成長の機会：
   Playwright を選択することで、チーム全体が新しいツールを学び、スキルセットを拡大する機会を得られると考えました。

2. クロスブラウザテスト：
   Playwright の複数ブラウザエンジン（Chromium、Firefox、WebKit）に対する単一 API でのサポートは、私たちのアプリケーションの幅広いユーザー基盤をカバーするのに適していると判断しました。

3. モダンウェブ技術との親和性：
   Next.js を使用している私たちのプロジェクトに、Playwright がよく適合すると考えました。

4. 成長する採用率：
   E2E テストツールとしての Playwright の急速な成長と採用率の上昇は、長期的なサポートと継続的な改善が期待できることを示唆しています。

#### 学なんだ点

- E2E テストの本格的な導入は今回が初めてであり、テスト戦略の設計から実装、CI への統合まで、多くの新しい学びがありました。
- Playwright の機能を最大限に活用するための学習曲線はありましたが、公式ドキュメントとコミュニティのサポートが非常に役立ちました。
- テストの安定性、特に非同期操作や動的コンテンツの扱いに関して、多くの知見を得ることができました。

#### 今後の展望

Playwright を通じて得た E2E テストの知見は、今後のプロジェクトにも活かせると考えています。また、継続的に Playwright の新機能や改善点をフォローし、テスト戦略を進化させていく予定です。

#### CI 環境での E2E テストの課題

CI 環境での E2E テスト実行において、いくつかの重要な課題に直面しました：

1. 外部 API の利用：
   ローカル環境では問題なく動作するテストが、CI 環境では外部 API との通信に起因するタイムアウトや遅延により失敗することがありました。

2. 実行時間の長さ：
   CI 環境での E2E テストの実行に予想以上の時間がかかり、ビルドプロセス全体の遅延につながりました。

3. 不安定な結果：
   ネットワーク状況やリソースの制約により、CI 環境でのテスト結果が不安定になることがありました。

これらの課題により、現在の CI 設定では E2E テストを除外しています。

#### 改善のためのアプローチ

今後、CI 環境での E2E テストを効果的に実装するために、以下のアプローチが有効かと期待しております。

1. モックサーバーの導入：
   外部 API の代わりにモックサーバーを使用し、ネットワーク依存性を減らすことで、テストの安定性と速度を向上させます。

2. テストの最適化：
   重要なユーザーフローに焦点を当てたテストのサブセットを CI 用に作成し、実行時間を短縮します。

3. キャッシュの活用：
   ブラウザのインストールや node モジュールのキャッシュを活用し、セットアップ時間を削減します。

4. 並列実行の導入：
   テストの並列実行を設定し、全体の実行時間を短縮します。

5. リトライメカニズムの実装：
   一時的な障害に対処するため、失敗したテストの自動リトライを導入します。

6. 環境固有の設定：
   CI 環境に特化した Playwright 設定（タイムアウトの調整など）を作成します。

7. 段階的な CI 統合：
   まず安定したテストのみを CI に統合し、徐々に対象を拡大していくアプローチを取ります。

## LLM の活用

本プロジェクトの開発過程において、LLM（具体的には ChatGPT/Claude）を活用しました。以下に、その活用方法と有効性、そして注意点について記述します。

### 活用方法

1. コード生成とレビュー：

   - 初期のコードサンプルの生成
   - 既存コードの改善案の提案してレビュー
   - 型定義やインターフェースの作成支援

2. ドキュメンテーション：

   - README.md の構造化と内容の充実
   - コメントの生成と改善

3. テスト支援：

   - テストケースの提案
   - Playwright を使用した E2E テストコードのサンプルの生成

4. デバッグ支援：

   - エラーメッセージの解析と解決策の提案
   - パフォーマンス最適化のためのアドバイス

5. アーキテクチャ設計：
   - コンポーネント構造の提案
   - ファイル構成の最適化

### 有効性

1. 開発速度の向上：
   LLM の活用により、特に初期段階でのコード生成やボイラープレートコードの作成が迅速化されました。

2. 品質の向上：
   コードレビューやベストプラクティスの提案により、全体的なコード品質が向上しました。

3. 学習効率の向上：
   新技術（Playwright 等）の学習において、具体的な使用例や説明を得ることで、理解が深まりました。

4. 問題解決の効率化：
   デバッグや最適化において、多様な視点からの解決策を得ることができました。

### 注意点と課題

1. 出力と動きの検証：
   LLM の提案は常に人間のレビューと検証が必ず必要です。特に、最新の技術情報や特定のプロジェクト要件に関しては、バージョンの更新などで追加の確認が不可欠でした。

2. セキュリティとプライバシー：
   機密情報や個人情報を含むコードやデータを LLM に入力しないよう、常に注意を払う必要があります。

3. 依存度のバランス：
   LLM に過度に依存せず、自身の思考と判断力を維持することが重要でした。

4. コンテキストの制限：
   長いコードや複雑な構造を一度に理解させることが難しく、適切な分割と要約が必要でした。
5. 提案に対するエビデンスの要求：
   LLM からの提案や回答に対して、常にその根拠や出典を求めることが重要でした。これにより：

   - 提案の信頼性を評価し、誤った情報や古い情報を排除できました。
   - LLM の「幻覚」（事実ではない情報の生成）を識別し、対処することができました。
   - 提案を実装する前に、関連するドキュメントや事例を参照し、適切性を確認できました。

   例：Playwright の使用方法に関する提案を受けた際、公式ドキュメントや最新の GitHub issue を確認し、提案の妥当性を検証しました。
