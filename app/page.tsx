import Hero from '@/components/lp/Hero';
import WhatYouGet from '@/components/lp/WhatYouGet';
import Benefits from '@/components/lp/Benefits';
import WasteExamples from '@/components/lp/WasteExamples';
import BottomCTA from '@/components/lp/BottomCTA';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <WhatYouGet />
      <WasteExamples />
      <Benefits />
      <BottomCTA />
      <footer className="bg-slate-900 text-slate-500 text-xs text-center py-6 px-4">
        <p>© 2025 WorkTrim. All rights reserved.</p>
        <p className="mt-1">本サービスは中小企業・小規模事業者向けの業務削減診断ツールです。</p>
      </footer>
    </main>
  );
}
