import type { DiagnosisResult } from '@/types';

interface SummaryCardsProps {
  result: DiagnosisResult;
}

function formatCost(yen: number): string {
  if (yen >= 1_000_000) {
    const m = yen / 1_000_000;
    return m % 1 === 0 ? `${m}百万円` : `${m.toFixed(1)}百万円`;
  }
  return `${Math.round(yen / 10000)}万円`;
}

/** 人間スケールに換算（例: 156時間 → 「約19日分」） */
function toWorkDays(hours: number): string {
  const days = Math.round(hours / 8);
  if (days <= 1) return '約1日分';
  return `約 ${days} 日分`;
}

export default function SummaryCards({ result }: SummaryCardsProps) {
  return (
    <div className="space-y-4">
      {/* Hero number */}
      <div className="bg-slate-800 text-white rounded-2xl px-6 py-7 text-center">
        <p className="text-sm text-slate-400 mb-1">この診断でわかった年間の削減余地</p>
        <p className="text-5xl md:text-6xl font-black text-amber-400 leading-none">
          {result.annualHours}
          <span className="text-2xl font-bold text-amber-300 ml-1">時間</span>
        </p>
        <p className="text-slate-400 text-sm mt-2">
          = {toWorkDays(result.annualHours)}の業務量に相当
        </p>
        <div className="mt-4 pt-4 border-t border-slate-700 flex items-center justify-center gap-2">
          <span className="text-slate-300 text-sm">コスト換算で</span>
          <span className="text-2xl font-black text-green-400">{formatCost(result.annualCost)}</span>
          <span className="text-slate-400 text-xs">（時給3,000円）</span>
        </div>
      </div>

      {/* Monthly highlight */}
      <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl px-5 py-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-amber-700 mb-0.5">毎月取り戻せる時間</p>
          <p className="text-sm text-amber-800 leading-relaxed">
            今月から改善をはじめると、毎月これだけ業務が楽になります
          </p>
        </div>
        <div className="shrink-0 ml-4 text-right">
          <p className="text-3xl font-black text-amber-600 leading-none">{result.monthlyHours}</p>
          <p className="text-sm text-amber-500">時間</p>
        </div>
      </div>

      {/* Insight note */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-sm text-blue-800 leading-relaxed">
        <span className="font-bold">💡 </span>
        この中のどれか1つでも手をつければ、その効果は今月から出はじめます。
        まず「一番やりやすそうなもの」から始めてみてください。
      </div>
    </div>
  );
}
