'use client';

import { useState, type FormEvent, type ChangeEvent } from 'react';
import { db, type Lead, type Clause, type Agreement, type PaymentMilestone } from '../../db';

interface AgreementGeneratorProps {
  leads: Lead[];
  clauses: Clause[];
  loadDB: () => void;
  triggerToast: (msg: string) => void;
}

const PACKAGE_PRESETS = [
  { name: 'Standard E-commerce (UnifyLabs)', price: '3000', currency: '₹', taxRate: '0', paymentMode: 'UPI', upiId: '8698846796@axl', milestones: [{ milestone: 'Advance Payment (50%)', amount: '1500', status: 'Pending' }, { milestone: 'Balance on Delivery (50%)', amount: '1500', status: 'Pending' }] },
  { name: 'Freelance White-Label (Siyantra)', price: '10000', currency: '₹', taxRate: '18', paymentMode: 'Bank Transfer', upiId: '', milestones: [{ milestone: 'Advance Payment', amount: '5000', status: 'Pending' }, { milestone: 'Final Payment on Delivery', amount: '5000', status: 'Pending' }] },
  { name: 'Strategic Referral Partnership (Vyuham Media)', price: '0', currency: '₹', taxRate: '0', paymentMode: 'Non-Monetary Partner', upiId: '', milestones: [{ milestone: 'Option 1: Direct Lead Referral', amount: 'Value-in-kind', status: 'Pending' }, { milestone: 'Option 2: White-Label Client Referral', amount: 'Value-in-kind', status: 'Pending' }] }
];

export default function AgreementGenerator({ leads, clauses, loadDB, triggerToast }: AgreementGeneratorProps) {
  const [selectedLeadId, setSelectedLeadId] = useState(leads[0]?.id || '');
  const [contractTitle, setContractTitle] = useState('Website Development Service Agreement');
  const [price, setPrice] = useState('3000');
  const [currency, setCurrency] = useState('₹');
  const [taxRate, setTaxRate] = useState('0');
  const [paymentMode, setPaymentMode] = useState('UPI');
  const [upiId, setUpiId] = useState('8698846796@axl');
  const [milestones, setMilestones] = useState<PaymentMilestone[]>([
    { milestone: 'Advance Payment (50%)', amount: '1500', status: 'Pending' },
    { milestone: 'Balance on Delivery (50%)', amount: '1500', status: 'Pending' }
  ]);
  const [selectedClauseIds, setSelectedClauseIds] = useState<string[]>([]);
  const [draftContent, setDraftContent] = useState('');
  const [isDrafting, setIsDrafting] = useState(false);
  const [adminSignature, setAdminSignature] = useState<string | null>(null);

  const loadPreset = (preset: typeof PACKAGE_PRESETS[0]) => {
    setPrice(preset.price);
    setCurrency(preset.currency);
    setTaxRate(preset.taxRate);
    setPaymentMode(preset.paymentMode);
    setUpiId(preset.upiId);
    setMilestones(preset.milestones.map(m => ({ ...m, status: m.status as 'Pending' | 'Paid' })));
  };

  const handleLeadSelect = (id: string) => {
    setSelectedLeadId(id);
    const lead = leads.find(l => l.id === id);
    if (lead) {
      const matchingClauses = clauses.filter(c => c.projectTypes.includes(lead.projectType)).map(c => c.id);
      setSelectedClauseIds(matchingClauses);
    }
  };

  const toggleClauseSelection = (id: string) => {
    setSelectedClauseIds(prev =>
      prev.includes(id) ? prev.filter(cid => cid !== id) : [...prev, id]
    );
  };

  const generateAgreementDraft = () => {
    const lead = leads.find(l => l.id === selectedLeadId);
    if (!lead) return;

    setIsDrafting(true);
    const selectedTextClauses = clauses.filter(c => selectedClauseIds.includes(c.id));
    
    const draftText = `WEBSITE DEVELOPMENT SERVICE AGREEMENT
--------------------------------------------------
Project Ref: OB-AG-${Date.now().toString().slice(-6)}

1. PARTIES TO AGREEMENT
Service Provider: Shubham Gundu (shubsss.dev)
Client: ${lead.clientName} (${lead.clientRole})
Brand / Company: ${lead.brandName}

2. OVERVIEW & SCOPE
Project Type: ${lead.projectType}
Timeline Expectation: ${lead.timeline}
Scope Details: ${lead.scopeDescription}

3. FINANCIAL TERMS
Total Price: ${price} ${currency} (Taxes: ${taxRate}%)
Payment Mode: ${paymentMode} ${upiId ? `(UPI: ${upiId})` : ''}

Milestone Schedules:
${milestones.map((m, i) => `${i + 1}. ${m.milestone}: ${m.amount} [${m.status}]`).join('\n')}

4. STANDARD CLAUSES
${selectedTextClauses.map((c, i) => `${i + 1}. ${c.title.toUpperCase()}\n${c.content}`).join('\n\n')}
`;

    setDraftContent(draftText);
  };

  const handleAdminSignatureUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) setAdminSignature(event.target.result.toString());
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePublishAgreement = () => {
    const lead = leads.find(l => l.id === selectedLeadId);
    if (!lead) return;

    const allAgreements = db.getAgreements();
    const newAg: Agreement = {
      id: 'ag-' + Date.now(),
      leadId: lead.id,
      title: contractTitle,
      clientName: lead.clientName,
      brandName: lead.brandName,
      projectType: lead.projectType,
      price,
      currency,
      taxRate,
      paymentMode,
      upiId,
      paymentSchedule: milestones,
      clauses: clauses.filter(c => selectedClauseIds.includes(c.id)).map(c => ({ title: c.title, content: c.content })),
      clientSignature: '',
      clientSignedAt: '',
      clientIp: '',
      clientDevice: '',
      adminSignature: adminSignature || '',
      adminSignedAt: adminSignature ? new Date().toISOString() : '',
      isLocked: false,
      version: 1,
      created_at: new Date().toISOString()
    };

    allAgreements.push(newAg);
    db.saveAgreements(allAgreements);

    const allVersions = db.getVersions();
    allVersions.push({
      id: 'v-' + Date.now(),
      agreementId: newAg.id,
      version: 1,
      content: draftContent,
      changeSummary: 'Initial Agreement Published',
      author: 'Admin',
      created_at: new Date().toISOString()
    });
    db.saveVersions(allVersions);

    const allLeads = db.getLeads().map(l => {
      if (l.id === lead.id) return { ...l, status: 'agreement_published' as const };
      return l;
    });
    db.saveLeads(allLeads);

    db.triggerNotification(
      newAg.id,
      'Client',
      '📄 New Agreement Draft Ready!',
      `A service agreement for ${newAg.brandName} has been drafted and requires your signature.`,
      'agreement',
      'Action-Required',
      'agreement'
    );

    loadDB();
    setIsDrafting(false);
    setAdminSignature(null);
    triggerToast('Agreement Published!');
  };

  return (
    <div className="client-detail-pane">
      <div className="admin-detail-grid">
        <div className="detail-section-card">
          <h4>🛠️ Select Lead &amp; Pricing Setup</h4>
          <div className="form-group">
            <label>Select Lead</label>
            <select value={selectedLeadId} onChange={(e) => handleLeadSelect(e.target.value)}>
              {leads.map(l => (
                <option key={l.id} value={l.id}>{l.clientName} — {l.brandName} ({l.projectType})</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Pricing Preset</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {PACKAGE_PRESETS.map((p, idx) => (
                <button key={idx} type="button" className="btn btn-secondary btn-sm" onClick={() => loadPreset(p)}>
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group"><label>Currency</label><input type="text" value={currency} onChange={(e) => setCurrency(e.target.value)} /></div>
            <div className="form-group"><label>Price</label><input type="text" value={price} onChange={(e) => setPrice(e.target.value)} /></div>
            <div className="form-group"><label>Tax Rate (%)</label><input type="text" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} /></div>
            <div className="form-group"><label>Payment Mode</label><input type="text" value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)} /></div>
          </div>
        </div>

        <div className="detail-section-card">
          <h4>📚 Choose Contract Clauses</h4>
          <div className="client-list" style={{ maxHeight: '300px' }}>
            {clauses.map(c => (
              <label key={c.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.8rem', cursor: 'pointer', padding: '0.5rem', background: '#fafbfc', border: '1px solid #eef0f4', borderRadius: '8px' }}>
                <input type="checkbox" checked={selectedClauseIds.includes(c.id)} onChange={() => toggleClauseSelection(c.id)} />
                <div>
                  <strong>{c.title}</strong>
                  <p style={{ fontSize: '0.72rem', color: 'gray' }}>{c.content.slice(0, 80)}...</p>
                </div>
              </label>
            ))}
          </div>
          <button type="button" className="btn btn-primary" onClick={generateAgreementDraft} style={{ marginTop: 'auto' }}>
            ⚡ Generate Draft Agreement
          </button>
        </div>
      </div>

      {isDrafting && (
        <div className="detail-section-card full-width-card" style={{ marginTop: '1.5rem' }}>
          <h4>📝 Agreement Editor (Draft State)</h4>
          <textarea value={draftContent} onChange={(e) => setDraftContent(e.target.value)} rows={16} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1rem' }}>
            <div className="form-group">
              <label>Apply Service Provider Signature</label>
              <input type="file" accept="image/*" onChange={handleAdminSignatureUpload} />
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
              <button type="button" className="btn btn-primary" onClick={handlePublishAgreement}>
                Publish Contract Brief
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
