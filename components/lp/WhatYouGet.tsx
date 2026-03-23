export default function WhatYouGet() {
  const items = [
    {
      icon: '⏱',
      title: '年間・月間の削減時間',
      desc: '会議・報告書・集計など業務別に、削減できる時間数を算出します',
    },
    {
      icon: '💴',
      title: 'コスト削減の見込み額',
      desc: '時給3,000円換算で、削減できる人件費コストをわかりやすく表示します',
    },
    {
      icon: '✅',
      title: '今すぐできる施策トップ3',
      desc: '難しいITツール不要。まず取り組むべき具体的なアクションを提案します',
    },
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-800 mb-2">
          診断でわかること
        </h2>
        <p className="text-center text-slate-500 mb-10">3分の診断で、3つの答えが手元に残ります</p>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.title}
              className="border border-slate-200 rounded-xl p-6 text-center hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="font-bold text-slate-800 text-lg mb-2">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
