import type {
  DiagnosisAnswers,
  DiagnosisResult,
  ReductionBreakdown,
  EmployeeRange,
  MeetingCount,
  MeetingDuration,
  ReportHours,
  AggregationCount,
  InvoiceCount,
  PaperFrequency,
  PhoneFrequency,
  InfoSharingMethod,
} from '@/types';

const HOURLY_RATE = 3000; // 時給換算レート（円）
const WORKING_DAYS_PER_MONTH = 20;

// --- 各パラメータの数値変換 ---

function getMeetingCount(range: MeetingCount): number {
  const map: Record<MeetingCount, number> = {
    '0-5': 3,
    '6-10': 8,
    '11-20': 15,
    '21+': 25,
  };
  return map[range];
}

function getMeetingDurationHours(duration: MeetingDuration): number {
  const map: Record<MeetingDuration, number> = {
    '0.5': 0.5,
    '1': 1,
    '1.5': 1.5,
    '2+': 2.5,
  };
  return map[duration];
}

function getReportHours(range: ReportHours): number {
  const map: Record<ReportHours, number> = {
    '<5': 3,
    '5-10': 7.5,
    '10-20': 15,
    '20+': 25,
  };
  return map[range];
}

function getAggregationCount(range: AggregationCount): number {
  const map: Record<AggregationCount, number> = {
    '0-5': 3,
    '6-10': 8,
    '11-20': 15,
    '21+': 25,
  };
  return map[range];
}

function getInvoiceCount(range: InvoiceCount): number {
  const map: Record<InvoiceCount, number> = {
    '<5': 3,
    '5-10': 7.5,
    '11-20': 15,
    '21+': 25,
  };
  return map[range];
}

function getPaperReductionHours(frequency: PaperFrequency): number {
  const map: Record<PaperFrequency, number> = {
    none: 0.5,
    monthly: 2,
    weekly: 8,
    daily: 20,
  };
  return map[frequency];
}

function getEmployeeCoefficient(range: EmployeeRange): number {
  const map: Record<EmployeeRange, number> = {
    '1-5': 1.0,
    '6-10': 2.5,
    '11-30': 5.0,
    '31-50': 8.0,
    '51+': 12.0,
  };
  return map[range];
}

function getPhoneCallsPerMonth(frequency: PhoneFrequency): number {
  const map: Record<PhoneFrequency, number> = {
    none: 2,
    monthly: 5,
    weekly: WORKING_DAYS_PER_MONTH * 0.4 * 2, // week*2.5 days * 2 calls
    daily: WORKING_DAYS_PER_MONTH * 5,
  };
  return map[frequency];
}

function getInfoSharingMultiplier(method: InfoSharingMethod): number {
  const map: Record<InfoSharingMethod, number> = {
    chat: 0,       // 既に効率化済み
    email: 0.1,
    verbal: 0.2,
    mixed: 0.3,
  };
  return map[method];
}

// --- 各削減項目の計算 ---

/** 会議時間削減: 回数 × 時間 × 30% × 参加人数基準2名 × 従業員係数 */
function calcMeetingReduction(answers: DiagnosisAnswers): ReductionBreakdown {
  const meetings = getMeetingCount(answers.meetingCount);
  const duration = getMeetingDurationHours(answers.meetingDuration);
  const coefficient = getEmployeeCoefficient(answers.employees);
  const monthlyHours = meetings * duration * 0.3 * 2 * coefficient;

  return {
    label: '会議・打ち合わせの効率化',
    monthlyHours,
    annualHours: monthlyHours * 12,
    annualCost: monthlyHours * 12 * HOURLY_RATE,
  };
}

/** 報告書作成削減: 作成時間 × 50% × 従業員係数 */
function calcReportReduction(answers: DiagnosisAnswers): ReductionBreakdown {
  const hours = getReportHours(answers.reportHours);
  const coefficient = getEmployeeCoefficient(answers.employees);
  const monthlyHours = hours * 0.5 * coefficient;

  return {
    label: '報告書・議事録作成の効率化',
    monthlyHours,
    annualHours: monthlyHours * 12,
    annualCost: monthlyHours * 12 * HOURLY_RATE,
  };
}

/** 手作業集計削減: 回数 × 1時間 × 80% × 従業員係数 */
function calcAggregationReduction(answers: DiagnosisAnswers): ReductionBreakdown {
  const count = getAggregationCount(answers.aggregationCount);
  const coefficient = getEmployeeCoefficient(answers.employees);
  const monthlyHours = count * 1 * 0.8 * coefficient;

  return {
    label: 'データ集計・転記作業の自動化',
    monthlyHours,
    annualHours: monthlyHours * 12,
    annualCost: monthlyHours * 12 * HOURLY_RATE,
  };
}

/** 請求書・見積書作成削減: 件数 × 15分 × 70% */
function calcInvoiceReduction(answers: DiagnosisAnswers): ReductionBreakdown {
  const count = getInvoiceCount(answers.invoiceCount);
  const monthlyHours = count * (15 / 60) * 0.7;

  return {
    label: '請求書・見積書作成の効率化',
    monthlyHours,
    annualHours: monthlyHours * 12,
    annualCost: monthlyHours * 12 * HOURLY_RATE,
  };
}

/** 紙業務削減: 頻度に応じて月10〜40時間 */
function calcPaperReduction(answers: DiagnosisAnswers): ReductionBreakdown {
  const monthlyHours = getPaperReductionHours(answers.paperFrequency);

  return {
    label: '紙書類のデジタル化',
    monthlyHours,
    annualHours: monthlyHours * 12,
    annualCost: monthlyHours * 12 * HOURLY_RATE,
  };
}

/** 電話対応効率化: 頻度 × 10分 × 40% × 営業日数 */
function calcPhoneReduction(answers: DiagnosisAnswers): ReductionBreakdown {
  const callsPerMonth = getPhoneCallsPerMonth(answers.phoneFrequency);
  const monthlyHours = callsPerMonth * (10 / 60) * 0.4;

  return {
    label: '電話対応の効率化',
    monthlyHours,
    annualHours: monthlyHours * 12,
    annualCost: monthlyHours * 12 * HOURLY_RATE,
  };
}

/** 情報共有の非効率による追加損失: 従業員係数を乗数として使用 */
function calcInfoSharingReduction(answers: DiagnosisAnswers): ReductionBreakdown {
  const multiplier = getInfoSharingMultiplier(answers.infoSharing);
  const coefficient = getEmployeeCoefficient(answers.employees);
  const monthlyHours = 3 * coefficient * WORKING_DAYS_PER_MONTH * 0.25 * multiplier;

  return {
    label: '社内情報共有の改善',
    monthlyHours,
    annualHours: monthlyHours * 12,
    annualCost: monthlyHours * 12 * HOURLY_RATE,
  };
}

// --- 施策の提案ロジック ---

function getTopActions(answers: DiagnosisAnswers, breakdown: ReductionBreakdown[]): string[] {
  const sorted = [...breakdown].sort((a, b) => b.annualCost - a.annualCost);
  const top = sorted.slice(0, 3);

  const actionMap: Record<string, string> = {
    '会議・打ち合わせの効率化':
      '会議にアジェンダを必ず設定し、時間を30分に絞る。週次定例はSlackの非同期報告またはNotionに切り替える',
    '報告書・議事録作成の効率化':
      'ChatGPT / Notion AI を使って議事録・日報を5分で作成する仕組みを導入する',
    'データ集計・転記作業の自動化':
      'Googleスプレッドシートの自動集計 または kintone を使い、手作業を半減させる',
    '請求書・見積書作成の効率化':
      'freee または マネーフォワード クラウド請求書 を導入し、テンプレートで作成時間を70%削減する',
    '紙書類のデジタル化':
      '書類受領時にスマホでスキャン→クラウド保存のルールを作り、紙の保管・探し出し時間をゼロにする',
    '電話対応の効率化':
      'よくある問い合わせをまとめたFAQページまたはLINE公式アカウントを作成し、電話件数を減らす',
    '社内情報共有の改善':
      'Slack（無料版）または LINE WORKS を導入し、口頭・メール伝達をチャットに集約する',
  };

  return top.map((item) => actionMap[item.label] ?? `「${item.label}」の改善施策を実施する`);
}

// --- メイン計算関数 ---

export function calculateResult(answers: DiagnosisAnswers): DiagnosisResult {
  const breakdown: ReductionBreakdown[] = [
    calcMeetingReduction(answers),
    calcReportReduction(answers),
    calcAggregationReduction(answers),
    calcInvoiceReduction(answers),
    calcPaperReduction(answers),
    calcPhoneReduction(answers),
    calcInfoSharingReduction(answers),
  ].filter((item) => item.monthlyHours > 0);

  const monthlyHours = breakdown.reduce((sum, item) => sum + item.monthlyHours, 0);
  const annualHours = monthlyHours * 12;
  const annualCost = annualHours * HOURLY_RATE;

  const topActions = getTopActions(answers, breakdown);

  return {
    monthlyHours: Math.round(monthlyHours * 10) / 10,
    annualHours: Math.round(annualHours * 10) / 10,
    annualCost: Math.round(annualCost),
    breakdown: breakdown.map((item) => ({
      ...item,
      monthlyHours: Math.round(item.monthlyHours * 10) / 10,
      annualHours: Math.round(item.annualHours * 10) / 10,
      annualCost: Math.round(item.annualCost),
    })),
    topActions,
  };
}

// ダミーデータ（開発・デモ用）
export const DUMMY_ANSWERS: DiagnosisAnswers = {
  employees: '6-10',
  meetingCount: '11-20',
  meetingDuration: '1',
  reportHours: '10-20',
  aggregationCount: '6-10',
  invoiceCount: '5-10',
  paperFrequency: 'weekly',
  phoneFrequency: 'daily',
  infoSharing: 'mixed',
  wastePerception: 'meeting',
  email: 'demo@example.com',
};
