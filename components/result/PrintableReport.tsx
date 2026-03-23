import type { DiagnosisResult } from '@/types';

interface PrintableReportProps {
  result: DiagnosisResult;
  email: string;
}

function formatCost(yen: number): string {
  if (yen >= 1_000_000) {
    return `${(yen / 1_000_000).toFixed(1)}百万円`;
  }
  return `${Math.round(yen / 10000)}万円`;
}

export default function PrintableReport({ result, email }: PrintableReportProps) {
  const today = new Date().toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const sorted = [...result.breakdown].sort((a, b) => b.annualCost - a.annualCost);

  return (
    <div
      id="printable-report"
      className="hidden print:block bg-white text-black p-0"
      style={{ fontFamily: 'Hiragino Kaku Gothic ProN, Meiryo, sans-serif' }}
    >
      {/* === Page 1: Cover === */}
      <div
        style={{
          minHeight: '267mm',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderBottom: '2px solid #e2e8f0',
          paddingBottom: '20mm',
          marginBottom: '15mm',
        }}
      >
        <div>
          <div
            style={{
              background: '#1e293b',
              color: 'white',
              padding: '8mm 10mm',
              borderRadius: '4px',
              display: 'inline-block',
              fontSize: '10pt',
              marginBottom: '10mm',
            }}
          >
            WorkTrim 業務削減診断レポート
          </div>
          <h1
            style={{
              fontSize: '24pt',
              fontWeight: 'bold',
              color: '#1e293b',
              lineHeight: '1.4',
              marginBottom: '6mm',
            }}
          >
            あなたの会社で削減できる
            <br />
            業務時間・コストの診断結果
          </h1>
          <p style={{ fontSize: '10pt', color: '#64748b' }}>
            診断日: {today}　　診断メール: {email}
          </p>
        </div>

        {/* Summary numbers */}
        <div
          style={{
            display: 'flex',
            gap: '8mm',
            marginTop: '10mm',
          }}
        >
          <div
            style={{
              flex: 1,
              background: '#fffbeb',
              border: '2px solid #fcd34d',
              borderRadius: '8px',
              padding: '6mm',
              textAlign: 'center',
            }}
          >
            <p style={{ fontSize: '9pt', color: '#92400e', marginBottom: '2mm' }}>月間削減時間</p>
            <p style={{ fontSize: '22pt', fontWeight: 'bold', color: '#d97706' }}>
              {result.monthlyHours}時間
            </p>
          </div>
          <div
            style={{
              flex: 1,
              background: '#1e293b',
              borderRadius: '8px',
              padding: '6mm',
              textAlign: 'center',
            }}
          >
            <p style={{ fontSize: '9pt', color: '#94a3b8', marginBottom: '2mm' }}>年間削減時間</p>
            <p style={{ fontSize: '22pt', fontWeight: 'bold', color: 'white' }}>
              {result.annualHours}時間
            </p>
          </div>
          <div
            style={{
              flex: 1,
              background: '#f0fdf4',
              border: '2px solid #86efac',
              borderRadius: '8px',
              padding: '6mm',
              textAlign: 'center',
            }}
          >
            <p style={{ fontSize: '9pt', color: '#166534', marginBottom: '2mm' }}>年間コスト削減</p>
            <p style={{ fontSize: '22pt', fontWeight: 'bold', color: '#16a34a' }}>
              {formatCost(result.annualCost)}
            </p>
          </div>
        </div>

        <div
          style={{
            background: '#eff6ff',
            border: '1px solid #bfdbfe',
            borderRadius: '6px',
            padding: '4mm 6mm',
            marginTop: '6mm',
            fontSize: '10pt',
            color: '#1e40af',
          }}
        >
          💡 この中の1つでも実行すれば、診断にかけた時間は必ず回収できます。
          まずは最も取り組みやすい施策から始めてみてください。
        </div>
      </div>

      {/* === Page 2: Breakdown === */}
      <div
        style={{
          borderBottom: '2px solid #e2e8f0',
          paddingBottom: '15mm',
          marginBottom: '15mm',
          breakBefore: 'page',
        }}
      >
        <h2
          style={{
            fontSize: '16pt',
            fontWeight: 'bold',
            color: '#1e293b',
            borderLeft: '4px solid #fbbf24',
            paddingLeft: '4mm',
            marginBottom: '8mm',
          }}
        >
          業務別・削減時間の内訳
        </h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10pt' }}>
          <thead>
            <tr style={{ background: '#f1f5f9', color: '#475569' }}>
              <th style={{ textAlign: 'left', padding: '3mm 4mm', fontWeight: '600' }}>
                業務カテゴリ
              </th>
              <th style={{ textAlign: 'right', padding: '3mm 4mm', fontWeight: '600' }}>
                月間削減
              </th>
              <th style={{ textAlign: 'right', padding: '3mm 4mm', fontWeight: '600' }}>
                年間削減
              </th>
              <th style={{ textAlign: 'right', padding: '3mm 4mm', fontWeight: '600' }}>
                削減コスト
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((item, i) => (
              <tr
                key={item.label}
                style={{ background: i % 2 === 0 ? 'white' : '#f8fafc' }}
              >
                <td style={{ padding: '3mm 4mm', color: '#334155' }}>{item.label}</td>
                <td style={{ padding: '3mm 4mm', textAlign: 'right', color: '#475569' }}>
                  {item.monthlyHours}h
                </td>
                <td style={{ padding: '3mm 4mm', textAlign: 'right', color: '#475569' }}>
                  {item.annualHours}h
                </td>
                <td style={{ padding: '3mm 4mm', textAlign: 'right', color: '#166534', fontWeight: '600' }}>
                  {item.annualCost.toLocaleString()}円
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr style={{ background: '#1e293b', color: 'white' }}>
              <td style={{ padding: '3mm 4mm', fontWeight: 'bold' }}>合計</td>
              <td style={{ padding: '3mm 4mm', textAlign: 'right', fontWeight: 'bold' }}>
                {sorted.reduce((s, i) => s + i.monthlyHours, 0).toFixed(1)}h
              </td>
              <td style={{ padding: '3mm 4mm', textAlign: 'right', fontWeight: 'bold' }}>
                {sorted.reduce((s, i) => s + i.annualHours, 0).toFixed(1)}h
              </td>
              <td style={{ padding: '3mm 4mm', textAlign: 'right', fontWeight: 'bold', color: '#fbbf24' }}>
                {sorted.reduce((s, i) => s + i.annualCost, 0).toLocaleString()}円
              </td>
            </tr>
          </tfoot>
        </table>
        <p style={{ fontSize: '8pt', color: '#94a3b8', marginTop: '3mm' }}>
          ※ 時給3,000円換算。実際の削減効果は業務内容・取り組み度合いにより異なります。
        </p>
      </div>

      {/* === Page 3: Actions === */}
      <div style={{ breakBefore: 'page' }}>
        <h2
          style={{
            fontSize: '16pt',
            fontWeight: 'bold',
            color: '#1e293b',
            borderLeft: '4px solid #fbbf24',
            paddingLeft: '4mm',
            marginBottom: '8mm',
          }}
        >
          今すぐできる改善施策 トップ3
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6mm' }}>
          {result.topActions.map((action, i) => {
            const labels = ['最優先で取り組む', '次に取り組む', '余裕があれば取り組む'];
            const colors = ['#fef3c7', '#eff6ff', '#f8fafc'];
            const borderColors = ['#fbbf24', '#93c5fd', '#cbd5e1'];
            return (
              <div
                key={i}
                style={{
                  background: colors[i],
                  border: `2px solid ${borderColors[i]}`,
                  borderRadius: '8px',
                  padding: '5mm 6mm',
                }}
              >
                <p
                  style={{
                    fontSize: '9pt',
                    fontWeight: 'bold',
                    color: '#64748b',
                    marginBottom: '2mm',
                  }}
                >
                  施策 {i + 1}：{labels[i]}
                </p>
                <p style={{ fontSize: '10pt', color: '#1e293b', lineHeight: '1.7' }}>
                  {action}
                </p>
              </div>
            );
          })}
        </div>

        {/* Next steps */}
        <div
          style={{
            marginTop: '10mm',
            background: '#1e293b',
            color: 'white',
            borderRadius: '8px',
            padding: '6mm',
          }}
        >
          <h3 style={{ fontSize: '12pt', fontWeight: 'bold', marginBottom: '4mm' }}>
            次のステップ
          </h3>
          <ul style={{ fontSize: '10pt', color: '#cbd5e1', lineHeight: '2', paddingLeft: '5mm' }}>
            <li>① まず「最優先」の施策を今週中に1つ試してみる</li>
            <li>② 2週間後に時間がどう変わったか振り返る</li>
            <li>③ 効果があれば「次に取り組む」施策に着手する</li>
          </ul>
          <p
            style={{
              marginTop: '4mm',
              fontSize: '9pt',
              color: '#94a3b8',
              borderTop: '1px solid #334155',
              paddingTop: '3mm',
            }}
          >
            本レポートは WorkTrim（worktrim.jp）が提供する無料診断の結果です。
            詳細な業務改善のご支援は、有料の詳細診断・無料相談でお気軽にご相談ください。
          </p>
        </div>
      </div>
    </div>
  );
}
