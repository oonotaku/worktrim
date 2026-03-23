interface EmailStepProps {
  value: string;
  onChange: (value: string) => void;
  error: string;
}

export default function EmailStep({ value, onChange, error }: EmailStepProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 px-5 py-7 md:px-8 md:py-8">
      <div className="mb-5">
        <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-sm font-semibold px-3 py-1 rounded-full mb-4">
          <span>✓</span> 診断はすべて完了しました
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-2 leading-snug">
          結果を表示するメールアドレスを入力してください
        </h2>
        <p className="text-sm text-slate-500 leading-relaxed">
          入力後すぐに結果ページが開きます。
          あとでPDFで保存することもできます。
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-600 mb-2">
          メールアドレス
        </label>
        <input
          type="email"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="your@email.com"
          autoComplete="email"
          inputMode="email"
          className={`w-full border-2 rounded-xl px-5 py-4 text-base text-slate-800 placeholder-slate-300 outline-none transition-colors ${
            error
              ? 'border-red-400 focus:border-red-500 bg-red-50'
              : 'border-slate-200 focus:border-amber-400 bg-white'
          }`}
        />
        {error && (
          <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
            <span>⚠</span> {error}
          </p>
        )}
      </div>

      <div className="mt-5 flex flex-col gap-2 text-sm text-slate-500">
        <div className="flex items-center gap-2">
          <span className="text-slate-400">🔒</span>
          <span>第三者への提供・営業メールは一切ありません</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-400">📄</span>
          <span>結果はPDFでいつでも保存できます</span>
        </div>
      </div>
    </div>
  );
}
