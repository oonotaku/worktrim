# WorkTrim — 業務削減診断ツール

中小企業・小規模事業者向けの「業務削減診断MVP」です。
10問に答えるだけで、削減できる業務時間・コスト・今すぐできる施策が確認できます。

## 起動方法

```bash
# 依存パッケージをインストール
npm install

# 開発サーバーを起動
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## ページ構成

| URL | 内容 |
|-----|------|
| `/` | LPページ（ヒーロー・ベネフィット・CTA） |
| `/diagnosis` | 診断フォーム（10問 + メールアドレス） |
| `/result` | 診断結果（削減時間・内訳・施策・PDF出力） |

## ダミーデータで結果確認

`/result` に直接アクセスすると、`lib/calculator.ts` の `DUMMY_ANSWERS` をもとに
サンプルの診断結果が表示されます。

## ファイル構成

```
app/
  page.tsx              # LPページ
  diagnosis/page.tsx    # 診断フォームページ
  result/page.tsx       # 結果ページ
components/
  lp/                   # LPセクション（Hero, WhatYouGet, Benefits, WasteExamples, BottomCTA）
  diagnosis/            # 診断フォーム（QuestionCard, ProgressBar, EmailStep）
  result/               # 結果表示（SummaryCards, BreakdownTable, ActionItems, ResultCTA, PrintableReport）
data/
  questions.ts          # 質問定義（10問）
lib/
  calculator.ts         # 削減時間・コストの計算ロジック
types/
  index.ts              # 型定義
```

## 計算ロジック

| 項目 | 計算式 |
|------|--------|
| 会議時間削減 | 月の会議回数 × 平均時間 × 30% × 参加人数（従業員数の50%） |
| 報告書作成削減 | 月の報告書作成時間 × 50% × 人数係数 |
| 手作業集計削減 | 月の集計回数 × 1時間 × 80% |
| 請求書・見積書削減 | 月の作成件数 × 15分 × 70% |
| 紙業務削減 | 頻度に応じて月2〜40時間 |
| 電話対応効率化 | 月の電話件数 × 10分 × 40% |
| 情報共有改善 | 共有方法 × 人数 × 係数 |

コスト換算: 時給3,000円

計算ロジックは `lib/calculator.ts` にまとめられており、係数の調整が容易です。

## PDF出力

結果ページの「PDFで保存」ボタン → ブラウザの印刷機能を使用（A4横サイズ推奨）。
印刷専用レイアウト（`PrintableReport.tsx`）が表示されます。

## 技術スタック

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- データ保存: localStorage（DBなし）
- PDF: ブラウザ印刷（`window.print()`）
