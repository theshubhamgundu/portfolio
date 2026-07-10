'use client';

import { useState } from 'react';
import { type Agreement } from '../../db';

interface WhiteboardManagerProps {
  agreements: Agreement[];
  triggerToast: (msg: string) => void;
}

export default function WhiteboardManager({ agreements, triggerToast }: WhiteboardManagerProps) {
  const [activeWhiteboardAgreementId, setActiveWhiteboardAgreementId] = useState(agreements[0]?.id || '');

  return (
    <div className="client-detail-pane">
      
      {/* Selector Header */}
      <div className="detail-header-card" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <strong>Active Workspace:</strong>
          <select value={activeWhiteboardAgreementId} onChange={(e) => {
            setActiveWhiteboardAgreementId(e.target.value);
            triggerToast('Switched whiteboard workspace!');
          }} style={{ padding: '0.4rem', borderRadius: '6px', border: '1px solid var(--adm-border)' }}>
            {agreements.map(a => (
              <option key={a.id} value={a.id}>{a.brandName} — {a.title}</option>
            ))}
          </select>
        </div>
        <div style={{ fontSize: '0.8rem', color: 'gray' }}>
          Sketches are auto-saved to isolated browser cache key: <code>excalidraw-{activeWhiteboardAgreementId}</code>
        </div>
      </div>

      {/* Excalidraw Embed Space */}
      <div style={{ height: 'calc(100vh - 220px)', background: '#fff', borderRadius: '12px', padding: '0.5rem', border: '1px solid var(--adm-border)' }}>
        {activeWhiteboardAgreementId ? (
          <iframe
            src={`/whiteboard/index.html?projectId=${activeWhiteboardAgreementId}`}
            style={{ width: '100%', height: '100%', border: 'none', borderRadius: '8px' }}
          />
        ) : (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'gray' }}>
            No active agreements. Create and sign an agreement to open whiteboard workspace.
          </div>
        )}
      </div>

    </div>
  );
}
