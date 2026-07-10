'use client';

import { useState, type ChangeEvent } from 'react';
import { db, type Agreement } from '../../db';

interface ContractSignatureProps {
  agreement: Agreement;
  triggerToast: (msg: string) => void;
}

export default function ContractSignature({ agreement, triggerToast }: ContractSignatureProps) {
  const [clientSigFile, setClientSigFile] = useState<string | null>(null);
  const [isSigningLoading, setIsSigningLoading] = useState(false);

  const handleSignatureUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) setClientSigFile(event.target.result.toString());
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignAgreement = async () => {
    if (!clientSigFile) return;
    setIsSigningLoading(true);

    const agreements = db.getAgreements();
    const updated = agreements.map(a => {
      if (a.id === agreement.id) {
        return {
          ...a,
          clientSignature: clientSigFile,
          clientSignedAt: new Date().toISOString(),
          clientIp: '192.168.1.99',
          clientDevice: 'Chrome Web Browser',
          isLocked: a.adminSignature ? true : false,
          devFreezeDate: new Date(Date.now() + 5 * 86400000).toISOString(),
          supportStartDate: new Date(Date.now() + 5 * 86400000).toISOString(),
          supportEndDate: new Date(Date.now() + 12 * 86400000).toISOString()
        };
      }
      return a;
    });
    db.saveAgreements(updated);

    const leads = db.getLeads();
    const updatedLeads = leads.map(l => {
      if (l.id === agreement.leadId) {
        return { ...l, status: (agreement.adminSignature ? 'locked' : 'signed') as 'locked' | 'signed' };
      }
      return l;
    });
    db.saveLeads(updatedLeads);

    setTimeout(() => {
      setIsSigningLoading(false);
      db.triggerNotification(
        agreement.id,
        'Developer',
        '📄 Agreement Signed & Locked!',
        `Client ${agreement.clientName} has signed the service agreement.`,
        'agreement',
        'Critical',
        'signatures'
      );
      triggerToast('Agreement Signed Successfully!');
      window.location.reload();
    }, 800);
  };

  return (
    <div className="client-detail-pane" style={{ background: '#fff', padding: '2rem', borderRadius: '12px', border: '1px solid var(--ob-border)' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem', borderBottom: '1px solid var(--ob-border)', paddingBottom: '1.5rem' }}>
        <h2>{agreement.title}</h2>
        <p>Ref: {agreement.id} | Budget: {agreement.price} {agreement.currency}</p>
      </div>

      <div style={{ background: '#fafbfc', border: '1px solid #eef0f4', padding: '1rem', borderRadius: '8px', maxHeight: '350px', overflowY: 'auto', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
        <p>Agreement details between Developer and Client.</p>
        <ul>
          {agreement.clauses.map((c, idx) => (
            <li key={idx} style={{ marginTop: '0.5rem' }}><strong>{c.title}</strong>: {c.content}</li>
          ))}
        </ul>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', borderTop: '1px solid var(--ob-border)', paddingTop: '1rem' }}>
        <div>
          <span className="field-label">Developer Signature</span>
          {agreement.adminSignature ? <img src={agreement.adminSignature} alt="Admin Sig" style={{ maxHeight: '55px' }} /> : 'Pending'}
        </div>
        <div>
          <span className="field-label">Client Signature</span>
          {agreement.clientSignature ? <img src={agreement.clientSignature} alt="Client Sig" style={{ maxHeight: '55px' }} /> : clientSigFile ? <img src={clientSigFile} alt="Preview" style={{ maxHeight: '55px' }} /> : <input type="file" accept="image/*" onChange={handleSignatureUpload} />}
        </div>
      </div>

      {!agreement.clientSignature && (
        <div style={{ textAlign: 'right', marginTop: '1rem' }}>
          <button className="btn btn-primary" onClick={handleSignAgreement} disabled={!clientSigFile}>Apply Signature</button>
        </div>
      )}
    </div>
  );
}
