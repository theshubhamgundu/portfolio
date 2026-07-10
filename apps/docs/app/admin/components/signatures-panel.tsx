'use client';

import { useState } from 'react';
import { db, type Agreement, type VersionHistory } from '../../db';

interface SignaturesPanelProps {
  agreements: Agreement[];
  versions: VersionHistory[];
  triggerToast: (msg: string) => void;
}

export default function SignaturesPanel({ agreements, versions, triggerToast }: SignaturesPanelProps) {
  const [selectedAgreementId, setSelectedAgreementId] = useState(agreements[0]?.id || '');
  const [viewingVersionText, setViewingVersionText] = useState<string | null>(null);

  const selectedAgreement = agreements.find(a => a.id === selectedAgreementId);
  const selectedVersions = versions.filter(v => v.agreementId === selectedAgreementId);

  return (
    <div className="client-detail-pane">
      <div className="admin-detail-grid">
        <div className="detail-section-card">
          <h4>Active Agreement Submissions</h4>
          <select value={selectedAgreementId} onChange={(e) => setSelectedAgreementId(e.target.value)}>
            {agreements.map(a => (
              <option key={a.id} value={a.id}>{a.brandName} — {a.title} (v{a.version})</option>
            ))}
          </select>

          {selectedAgreement && (
            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ padding: '0.75rem', background: selectedAgreement.isLocked ? '#f0fdf4' : '#fff8f2', borderRadius: '8px', border: '1px solid', borderColor: selectedAgreement.isLocked ? '#bbf7d0' : '#ffe4e6', fontSize: '0.8rem', textAlign: 'center', fontWeight: 'bold' }}>
                {selectedAgreement.isLocked ? '🔒 Agreement Locked (Immutable)' : '⚡ Active Draft (Signatures Pending)'}
              </div>
              <div style={{ fontSize: '0.8rem' }}>
                <strong>Client Signature Log:</strong>
                <div>Signed: {selectedAgreement.clientSignedAt ? new Date(selectedAgreement.clientSignedAt).toLocaleString() : 'Pending'}</div>
                <div>IP address: {selectedAgreement.clientIp || 'N/A'}</div>
                <div>Device: {selectedAgreement.clientDevice || 'N/A'}</div>
              </div>
            </div>
          )}
        </div>

        <div className="detail-section-card">
          <h4>📜 Version History &amp; Audit Trail</h4>
          <div className="client-list" style={{ maxHeight: '250px' }}>
            {selectedVersions.map(v => (
              <div key={v.id} style={{ padding: '0.5rem', background: '#fafbfc', border: '1px solid #eef0f4', borderRadius: '8px', fontSize: '0.78rem', display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <div>
                  <strong>Version {v.version}</strong> — {v.changeSummary}
                </div>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setViewingVersionText(v.content)}>View</button>
              </div>
            ))}
          </div>

          {viewingVersionText && (
            <div style={{ marginTop: '1rem', borderTop: '1px dashed #e2e5ea', paddingTop: '0.75rem' }}>
              <h5>Version Content Brief Preview</h5>
              <pre style={{ fontSize: '0.72rem', background: '#f4f5f7', padding: '0.5rem', borderRadius: '4px', maxHeight: '150px', overflowY: 'auto' }}>{viewingVersionText}</pre>
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => setViewingVersionText(null)} style={{ marginTop: '4px' }}>Close Preview</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
