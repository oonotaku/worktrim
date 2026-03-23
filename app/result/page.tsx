'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import SummaryCards from '@/components/result/SummaryCards';
import BreakdownTable from '@/components/result/BreakdownTable';
import ActionItems from '@/components/result/ActionItems';
import ResultCTA from '@/components/result/ResultCTA';
import PrintableReport from '@/components/result/PrintableReport';
import { calculateResult, DUMMY_ANSWERS } from '@/lib/calculator';
import type { DiagnosisAnswers, DiagnosisResult } from '@/types';

export default function ResultPage() {
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    let answers: DiagnosisAnswers;
    try {
      const stored = localStorage.getItem('worktrim_answers');
      answers = stored ? JSON.parse(stored) : DUMMY_ANSWERS;
    } catch {
      answers = DUMMY_ANSWERS;
    }
    setEmail(answers.email || DUMMY_ANSWERS.email);
    setResult(calculateResult(answers));
  }, []);

  function handleDownloadPdf() {
    window.print();
  }

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-slate-500 text-sm">診断結果を計算しています...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* 印刷用レポート（画面では非表示） */}
      <PrintableReport result={result} email={email} />

      {/* 画面表示 */}
      <div className="min-h-screen bg-slate-50 print:hidden">
        {/* Header */}
        <header className="bg-white border-b border-slate-100 px-4 py-4">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <Link href="/" className="font-black text-slate-800 text-lg">
              WorkTrim
            </Link>
            <Link
              href="/diagnosis"
              className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
            >
              もう一度診断する
            </Link>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-7 space-y-8 pb-16">
          {/* Hero message — number-first */}
          <div>
            <div className="inline-flex items-center gap-1.5 bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              <span>✓</span> 診断完了
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 leading-snug">
              毎月 <span className="text-amber-500">{result.monthlyHours} 時間</span>、
              <br className="md:hidden" />
              取り戻せます
            </h1>
            <p className="text-slate-500 text-sm mt-2">
              あなたの回答から、削減できる業務時間とコストを算出しました
            </p>
          </div>

          {/* Summary */}
          <SummaryCards result={result} />

          {/* Breakdown */}
          <BreakdownTable breakdown={result.breakdown} />

          {/* Actions */}
          <ActionItems actions={result.topActions} />

          {/* CTA */}
          <ResultCTA onDownloadPdf={handleDownloadPdf} />

          {/* Footer note */}
          <p className="text-center text-xs text-slate-400 pb-2">
            ※ 本診断は入力内容をもとにした概算です。
            実際の効果は取り組み方により変わります。
          </p>
        </main>
      </div>
    </>
  );
}
