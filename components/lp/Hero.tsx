import Link from 'next/link';

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-slate-800 to-slate-900 text-white py-16 px-4 md:py-24">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-block bg-amber-400 text-slate-900 text-sm font-bold px-4 py-1 rounded-full mb-6">
          無料 · 3分で完了
        </div>
        <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6 text-balance">
          毎月、何時間
          <span className="text-amber-400">ムダな業務</span>
          に<br />費やしていますか？
        </h1>
        <p className="text-lg md:text-xl text-slate-300 mb-4 leading-relaxed">
          10の質問に答えるだけで、あなたの会社で<br className="hidden md:block" />
          削減できる業務時間とコストをすぐに算出します。
        </p>
        <p className="text-slate-400 text-sm mb-10">
          ※ AIツールを売りつけるものではありません。
          「人がやらなくていい仕事」を見つけるための診断です。
        </p>
        <Link
          href="/diagnosis"
          className="inline-block bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-lg px-10 py-4 rounded-xl shadow-lg transition-colors duration-200"
        >
          無料で診断をはじめる →
        </Link>
        <p className="mt-4 text-slate-400 text-sm">登録不要・所要時間3分</p>
      </div>
    </section>
  );
}
