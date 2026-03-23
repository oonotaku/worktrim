export default function WasteExamples() {
  const examples = [
    { emoji: '📊', text: '毎週1時間かけてExcelに数字を転記している' },
    { emoji: '📋', text: '誰も読まない日報・週報を毎週書いている' },
    { emoji: '📞', text: '同じ問い合わせに毎日電話で答えている' },
    { emoji: '🗂', text: '紙の書類を印刷・捺印・郵送している' },
    { emoji: '💬', text: '会議が長くて結論が出ない' },
    { emoji: '🧾', text: '請求書を1件ずつ手入力で作っている' },
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-800 mb-2">
          こんな「ムダ」はありませんか？
        </h2>
        <p className="text-center text-slate-500 mb-10">
          多くの中小企業が、毎月数十時間分の業務コストを知らずに払っています
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {examples.map((item) => (
            <div
              key={item.text}
              className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-lg p-4"
            >
              <span className="text-2xl shrink-0">{item.emoji}</span>
              <p className="text-slate-700 text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-slate-500 text-sm mt-8">
          これらは工夫次第で、今すぐ削減できるものがほとんどです。
        </p>
      </div>
    </section>
  );
}
