import Link from 'next/link';

export default function BottomCTA() {
  return (
    <section className="py-16 px-4 bg-slate-800 text-white text-center">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          3分で、ムダな業務を見つけましょう
        </h2>
        <p className="text-slate-300 mb-8 leading-relaxed">
          登録不要・完全無料。答えるだけで診断結果をその場で確認できます。
          <br />
          結果はPDFで保存して、社内の改善提案にもご活用ください。
        </p>
        <Link
          href="/diagnosis"
          className="inline-block bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-lg px-10 py-4 rounded-xl shadow-lg transition-colors duration-200"
        >
          無料で診断をはじめる →
        </Link>
        <p className="mt-4 text-slate-400 text-sm">所要時間3分 · メールアドレスは最後に1度だけ</p>
      </div>
    </section>
  );
}
