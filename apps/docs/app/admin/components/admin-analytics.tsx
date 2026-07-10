'use client';

import { type Lead } from '../../db';

interface AdminAnalyticsProps {
  leads: Lead[];
  stats: {
    totalLeads: number;
    pipelineTotal: number;
    signedCount: number;
    conversion: number;
    sources: Record<string, number>;
  };
}

export default function AdminAnalytics({ leads, stats }: AdminAnalyticsProps) {
  return (
    <div className="client-detail-pane">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        <div className="detail-section-card" style={{ textAlign: 'center' }}>
          <span className="field-label">Total Leads</span>
          <h2 style={{ fontSize: '2rem', color: 'var(--adm-accent)' }}>{stats.totalLeads}</h2>
        </div>
        <div className="detail-section-card" style={{ textAlign: 'center' }}>
          <span className="field-label">Pipeline Value</span>
          <h2 style={{ fontSize: '2rem', color: 'var(--adm-accent)' }}>₹{stats.pipelineTotal.toLocaleString()}</h2>
        </div>
        <div className="detail-section-card" style={{ textAlign: 'center' }}>
          <span className="field-label">Signed Contracts</span>
          <h2 style={{ fontSize: '2rem', color: 'var(--adm-accent)' }}>{stats.signedCount}</h2>
        </div>
        <div className="detail-section-card" style={{ textAlign: 'center' }}>
          <span className="field-label">Conversion Rate</span>
          <h2 style={{ fontSize: '2rem', color: 'var(--adm-accent)' }}>{stats.conversion}%</h2>
        </div>
      </div>

      <div className="admin-detail-grid" style={{ marginTop: '1.5rem' }}>
        <div className="detail-section-card">
          <h4>📈 Referral Tracking</h4>
          {Object.entries(stats.sources).map(([src, count]) => {
            const pct = stats.totalLeads > 0 ? (count / stats.totalLeads) * 100 : 0;
            return (
              <div key={src} style={{ marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '4px' }}>
                  <span>{src}</span>
                  <strong>{count} ({Math.round(pct)}%)</strong>
                </div>
                <div style={{ height: '8px', background: 'var(--adm-surface-2)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: 'var(--adm-accent)' }} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="detail-section-card">
          <h4>📊 Leads Registry</h4>
          <div className="client-list" style={{ maxHeight: '220px' }}>
            {leads.map(l => (
              <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', background: '#fafbfc', border: '1px solid #eef0f4', borderRadius: '8px', fontSize: '0.8rem' }}>
                <div>
                  <strong>{l.clientName}</strong> ({l.brandName})
                  <div style={{ fontSize: '0.7rem', color: 'gray' }}>Budget: {l.budget}</div>
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--adm-accent)' }}>{l.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
