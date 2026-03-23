interface ActionItemsProps {
  actions: string[];
}

export default function ActionItems({ actions }: ActionItemsProps) {
  const steps = [
    {
      number: '1',
      tag: '今週中に試せる',
      tagColor: 'bg-amber-400 text-slate-900',
      borderColor: 'border-amber-300',
      bg: 'bg-amber-50',
    },
    {
      number: '2',
      tag: '来週から始める',
      tagColor: 'bg-slate-600 text-white',
      borderColor: 'border-slate-200',
      bg: 'bg-white',
    },
    {
      number: '3',
      tag: '1ヶ月以内に',
      tagColor: 'bg-slate-400 text-white',
      borderColor: 'border-slate-200',
      bg: 'bg-white',
    },
  ];

  return (
    <div>
      <h2 className="text-lg font-bold text-slate-700 mb-1">まず、これだけやってみてください</h2>
      <p className="text-sm text-slate-500 mb-4">
        難しいツール不要。あなたの回答をもとに、取り組みやすい順に並べました
      </p>
      <div className="space-y-3">
        {actions.map((action, i) => {
          const s = steps[i];
          return (
            <div
              key={i}
              className={`border-2 ${s.borderColor} ${s.bg} rounded-xl p-5`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="w-7 h-7 rounded-full bg-slate-800 text-white text-sm font-black flex items-center justify-center shrink-0">
                  {s.number}
                </span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${s.tagColor}`}>
                  {s.tag}
                </span>
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">{action}</p>
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-slate-400">
        ※ いずれも費用ゼロまたは数千円/月以内で始められます。
        ITが苦手でも大丈夫です。
      </p>
    </div>
  );
}
