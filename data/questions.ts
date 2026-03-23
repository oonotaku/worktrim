export interface QuestionOption {
  value: string;
  label: string;
}

export interface Question {
  id: string;
  step: number;
  question: string;
  description?: string;
  options: QuestionOption[];
}

export const QUESTIONS: Question[] = [
  {
    id: 'employees',
    step: 1,
    question: '従業員は何名いますか？',
    description: 'パートタイム・アルバイトも含めてください',
    options: [
      { value: '1-5', label: '1〜5名' },
      { value: '6-10', label: '6〜10名' },
      { value: '11-30', label: '11〜30名' },
      { value: '31-50', label: '31〜50名' },
      { value: '51+', label: '51名以上' },
    ],
  },
  {
    id: 'meetingCount',
    step: 2,
    question: '1ヶ月に行う会議・打ち合わせは何回ですか？',
    description: '社内・社外・オンラインすべて含めてください',
    options: [
      { value: '0-5', label: '0〜5回' },
      { value: '6-10', label: '6〜10回' },
      { value: '11-20', label: '11〜20回' },
      { value: '21+', label: '21回以上' },
    ],
  },
  {
    id: 'meetingDuration',
    step: 3,
    question: '1回の会議・打ち合わせの平均時間はどれくらいですか？',
    options: [
      { value: '0.5', label: '30分程度' },
      { value: '1', label: '1時間程度' },
      { value: '1.5', label: '1時間30分程度' },
      { value: '2+', label: '2時間以上' },
    ],
  },
  {
    id: 'reportHours',
    step: 4,
    question: '月に報告書・日報・議事録の作成にかける時間はどれくらいですか？',
    description: '1人あたりの合計時間でお答えください',
    options: [
      { value: '<5', label: '5時間未満' },
      { value: '5-10', label: '5〜10時間' },
      { value: '10-20', label: '10〜20時間' },
      { value: '20+', label: '20時間以上' },
    ],
  },
  {
    id: 'aggregationCount',
    step: 5,
    question: '月に手作業でのデータ集計・転記作業は何回ありますか？',
    description: 'Excelへの手入力、紙からの転記なども含みます',
    options: [
      { value: '0-5', label: '0〜5回' },
      { value: '6-10', label: '6〜10回' },
      { value: '11-20', label: '11〜20回' },
      { value: '21+', label: '21回以上' },
    ],
  },
  {
    id: 'invoiceCount',
    step: 6,
    question: '月に請求書・見積書を何件作成していますか？',
    options: [
      { value: '<5', label: '5件未満' },
      { value: '5-10', label: '5〜10件' },
      { value: '11-20', label: '11〜20件' },
      { value: '21+', label: '21件以上' },
    ],
  },
  {
    id: 'paperFrequency',
    step: 7,
    question: '紙の書類（印刷・郵送・ファイリングなど）をどのくらい使いますか？',
    options: [
      { value: 'none', label: 'ほとんど使わない' },
      { value: 'monthly', label: '月に数回程度' },
      { value: 'weekly', label: '週に1〜2回' },
      { value: 'daily', label: 'ほぼ毎日使っている' },
    ],
  },
  {
    id: 'phoneFrequency',
    step: 8,
    question: '顧客対応・社外連絡で電話をどのくらい使いますか？',
    options: [
      { value: 'none', label: 'ほとんど使わない' },
      { value: 'monthly', label: '月に数回程度' },
      { value: 'weekly', label: '週に1〜2回' },
      { value: 'daily', label: '1日に何度も使う' },
    ],
  },
  {
    id: 'infoSharing',
    step: 9,
    question: '社内での情報共有は主にどのように行っていますか？',
    options: [
      { value: 'email', label: 'メール中心' },
      { value: 'verbal', label: '口頭・電話が多い' },
      { value: 'chat', label: 'チャットツール（Slack等）を使っている' },
      { value: 'mixed', label: 'メール・口頭・紙が混在している' },
    ],
  },
  {
    id: 'wastePerception',
    step: 10,
    question: '特に「時間のムダ」を感じている業務はどれですか？',
    description: '最も当てはまるものを1つ選んでください',
    options: [
      { value: 'meeting', label: '会議・打ち合わせが多すぎる' },
      { value: 'report', label: '報告書・資料作成に時間がかかる' },
      { value: 'data-entry', label: 'データ入力・集計に時間がかかる' },
      { value: 'invoice', label: '請求書・見積書の作成が手間' },
      { value: 'paper', label: '紙の書類が多くて非効率' },
      { value: 'phone', label: '電話対応に追われている' },
    ],
  },
];
