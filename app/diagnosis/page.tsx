'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import ProgressBar from '@/components/diagnosis/ProgressBar';
import QuestionCard from '@/components/diagnosis/QuestionCard';
import EmailStep from '@/components/diagnosis/EmailStep';
import { QUESTIONS } from '@/data/questions';
import type { DiagnosisAnswers } from '@/types';

const TOTAL_STEPS = QUESTIONS.length + 1; // 10 questions + email

type Answers = Partial<DiagnosisAnswers>;

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function DiagnosisPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  const currentQuestion = QUESTIONS[step];
  const isEmailStep = step === QUESTIONS.length;
  const currentAnswer = currentQuestion
    ? answers[currentQuestion.id as keyof Answers]
    : undefined;

  // ステップ変更時にページトップへスムーズスクロール
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  function handleSelect(value: string) {
    const id = currentQuestion.id as keyof Answers;
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setIsAnimating(true);
    setTimeout(() => {
      setStep((s) => s + 1);
      setIsAnimating(false);
    }, 350);
  }

  function handleBack() {
    if (step > 0) {
      setStep((s) => s - 1);
    }
  }

  function handleSubmit() {
    if (!validateEmail(email)) {
      setEmailError('正しいメールアドレスを入力してください');
      return;
    }
    setEmailError('');
    const finalAnswers: DiagnosisAnswers = {
      ...(answers as DiagnosisAnswers),
      email,
    };
    localStorage.setItem('worktrim_answers', JSON.stringify(finalAnswers));
    router.push('/result');
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 px-4 py-4 sticky top-0 z-10">
        <div className="max-w-xl mx-auto">
          <ProgressBar current={step + 1} total={TOTAL_STEPS} />
        </div>
      </header>

      <main ref={mainRef} className="max-w-xl mx-auto px-4 py-6 pb-10">
        {/* Brand */}
        <p className="text-center text-xs text-slate-400 mb-5">WorkTrim 業務削減診断</p>

        {/* Card with fade animation */}
        <div
          className={`transition-opacity duration-200 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
        >
          {!isEmailStep ? (
            <QuestionCard
              question={currentQuestion}
              selectedValue={currentAnswer as string | undefined}
              onSelect={handleSelect}
            />
          ) : (
            <EmailStep value={email} onChange={setEmail} error={emailError} />
          )}
        </div>

        {/* Navigation */}
        <div className="mt-5 flex flex-col gap-3">
          {isEmailStep && (
            <button
              onClick={handleSubmit}
              className="w-full py-5 rounded-xl bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-slate-900 font-bold text-lg transition-colors shadow-md"
            >
              結果を見る →
            </button>
          )}

          {step > 0 && (
            <button
              onClick={handleBack}
              className="w-full py-4 rounded-xl border-2 border-slate-200 text-slate-500 font-medium hover:bg-slate-100 active:bg-slate-100 transition-colors text-sm"
            >
              ← 前の質問に戻る
            </button>
          )}
        </div>

        {!isEmailStep && (
          <p className="text-center text-sm text-slate-400 mt-5">
            選ぶと自動で次に進みます
          </p>
        )}
      </main>
    </div>
  );
}
