interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percent = Math.round((current / total) * 100);
  // メールステップはカウント外で表示
  const isEmailStep = current === total;
  const remaining = total - current;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-slate-600">
          {isEmailStep ? '最後の1ステップ' : `あと ${remaining} 問`}
        </span>
        <span className="text-xs text-slate-400">{percent}%</span>
      </div>
      <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
