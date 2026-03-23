'use client';

interface ResultCTAProps {
  onDownloadPdf: () => void;
}

export default function ResultCTA({ onDownloadPdf }: ResultCTAProps) {
  return (
    <div className="space-y-4">
      {/* Primary: PDF — standalone, most prominent */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 md:p-6">
        <p className="font-bold text-slate-800 text-base mb-1">
          📄 この結果を保存しておきましょう
        </p>
        <p className="text-sm text-slate-500 mb-4 leading-relaxed">
          A4・3ページのPDFにまとめて出力できます。
          社内共有や、後で見返すときに役立ちます。
        </p>
        <button
          onClick={onDownloadPdf}
          className="w-full py-5 rounded-xl bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-slate-900 font-bold text-lg transition-colors shadow-sm"
        >
          PDFで保存する（無料）
        </button>
      </div>

      {/* Secondary: consultation */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5">
        <p className="text-xs text-slate-400 mb-1">やり方がわからないとき</p>
        <p className="font-bold text-slate-800 mb-2">「どこから始めればいいか」を一緒に考えます</p>
        <p className="text-sm text-slate-500 leading-relaxed mb-4">
          施策はわかったけど動き方がわからない、という方向けに30分の無料相談を受け付けています。ツールの選び方から実際の設定まで、ハンズオンでサポートします。売り込みは一切しません。
        </p>
        <a
          href="https://calendly.com/taku_oono-node-bee/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-4 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-900 text-white font-bold text-lg block text-center"
        >
          無料で相談してみる →
        </a>
      </div>

      {/* Tertiary: detailed diagnosis — softest option */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs text-slate-400 mb-0.5">もっと詳しく分析したい方へ</p>
          <p className="text-sm font-semibold text-slate-700">詳細診断サービス</p>
          <p className="text-xs text-slate-400 mt-0.5">業務フロー分析・改善ロードマップ作成</p>
        </div>
        <a
          href="https://calendly.com/taku_oono-node-bee/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 border border-slate-300 text-slate-500 hover:border-slate-500 hover:text-slate-700 text-xs font-medium px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
        >
          詳細を見る
        </a>
      </div>
    </div>
  );
}
