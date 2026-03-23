import type { Question } from '@/data/questions';

interface QuestionCardProps {
  question: Question;
  selectedValue: string | undefined;
  onSelect: (value: string) => void;
}

export default function QuestionCard({ question, selectedValue, onSelect }: QuestionCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 px-5 py-7 md:px-8 md:py-8">
      <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-2 leading-snug">
        {question.question}
      </h2>
      {question.description && (
        <p className="text-sm text-slate-500 mb-6 leading-relaxed">{question.description}</p>
      )}
      {!question.description && <div className="mb-5" />}
      <div className="space-y-3">
        {question.options.map((option) => {
          const isSelected = selectedValue === option.value;
          return (
            <button
              key={option.value}
              onClick={() => onSelect(option.value)}
              className={`w-full text-left px-5 py-4 rounded-xl border-2 font-medium transition-all duration-150 text-base min-h-[56px] flex items-center gap-3 ${
                isSelected
                  ? 'border-amber-400 bg-amber-50 text-amber-900'
                  : 'border-slate-200 bg-white text-slate-700 active:bg-slate-50'
              }`}
            >
              {/* Radio circle / checkmark */}
              <span
                className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  isSelected
                    ? 'border-amber-400 bg-amber-400'
                    : 'border-slate-300 bg-white'
                }`}
              >
                {isSelected && (
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              <span className="leading-snug">{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
