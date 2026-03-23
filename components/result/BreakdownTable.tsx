import type { ReductionBreakdown } from '@/types';

interface BreakdownTableProps {
  breakdown: ReductionBreakdown[];
}

export default function BreakdownTable({ breakdown }: BreakdownTableProps) {
  const sorted = [...breakdown].sort((a, b) => b.annualCost - a.annualCost);
  const maxCost = sorted[0]?.annualCost ?? 1;

  return (
    <div>
      <h2 className="text-lg font-bold text-slate-700 mb-1">どの業務で削減できるか</h2>
      <p className="text-sm text-slate-500 mb-4">削減効果が大きい順に並んでいます</p>

      {/* Bar-based cards (mobile-first, no horizontal scroll) */}
      <div className="space-y-3">
        {sorted.map((item) => {
          const barWidth = Math.max(4, Math.round((item.annualCost / maxCost) * 100));
          return (
            <div key={item.label} className="bg-white border border-slate-200 rounded-xl px-4 py-4">
              <div className="flex items-start justify-between gap-3 mb-2">
                <p className="font-medium text-slate-700 text-sm leading-snug">{item.label}</p>
                <p className="shrink-0 font-bold text-green-700 text-sm whitespace-nowrap">
                  {item.annualCost.toLocaleString()}円/年
                </p>
              </div>
              {/* Bar */}
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all duration-700"
                  style={{ width: `${barWidth}%` }}
                />
              </div>
              <div className="flex gap-4 text-xs text-slate-400">
                <span>月 {item.monthlyHours}h</span>
                <span>年 {item.annualHours}h</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Totals row */}
      <div className="mt-3 bg-slate-800 text-white rounded-xl px-4 py-4 flex items-center justify-between">
        <p className="font-bold text-sm">合計削減見込み</p>
        <div className="text-right">
          <p className="font-black text-amber-300 text-lg">
            {sorted.reduce((s, i) => s + i.annualCost, 0).toLocaleString()}円/年
          </p>
          <p className="text-slate-400 text-xs">
            年間 {sorted.reduce((s, i) => s + i.annualHours, 0).toFixed(1)}h ·
            月間 {sorted.reduce((s, i) => s + i.monthlyHours, 0).toFixed(1)}h
          </p>
        </div>
      </div>
      <p className="text-xs text-slate-400 mt-2">※ 時給3,000円で換算した概算です</p>
    </div>
  );
}
