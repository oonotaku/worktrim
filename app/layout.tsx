import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'WorkTrim｜3分でわかる業務削減診断',
  description:
    '中小企業・小規模事業者向けの業務削減診断ツール。3分の診断で年間削減時間とコスト削減見込みを無料で確認できます。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">{children}</body>
    </html>
  );
}
