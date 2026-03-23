export default function Benefits() {
  const benefits = [
    {
      number: '01',
      title: '中小企業の現場に合った診断',
      desc: '大企業向けの難しい用語は使いません。日常の業務をそのまま答えるだけで、現実的な削減余地が分かります。',
    },
    {
      number: '02',
      title: 'すぐに動ける具体的な提案',
      desc: '「DXを進めましょう」のような曖昧な提案ではなく、今日から試せる具体的な改善アクションをお伝えします。',
    },
    {
      number: '03',
      title: '結果はPDFで手元に保存',
      desc: '診断結果は社内共有・稟議に使えるPDFでダウンロードできます。見える化された数字は社内説得に役立ちます。',
    },
  ];

  return (
    <section className="py-16 px-4 bg-slate-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-800 mb-10">
          WorkTrimが選ばれる3つの理由
        </h2>
        <div className="space-y-6">
          {benefits.map((item) => (
            <div key={item.number} className="flex gap-5 bg-white rounded-xl p-6 shadow-sm">
              <div className="text-3xl font-black text-amber-400 shrink-0">{item.number}</div>
              <div>
                <h3 className="font-bold text-slate-800 text-lg mb-1">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
