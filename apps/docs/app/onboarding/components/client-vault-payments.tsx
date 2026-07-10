'use client';

import { useState } from 'react';
import { type Agreement, type VersionHistory } from '../../db';

interface ClientVaultPaymentsProps {
  agreement: Agreement;
  versions: VersionHistory[];
  triggerToast: (msg: string) => void;
}

export default function ClientVaultPayments({
  agreement,
  versions,
  triggerToast,
}: ClientVaultPaymentsProps) {
  const [selectedReceipt, setSelectedReceipt] = useState<string | null>(null);
  const [payUpiMilestone, setPayUpiMilestone] = useState<{ milestone: string; amount: string } | null>(null);

  // Filter version history for this specific agreement
  const agreementRevisions = versions.filter(v => v.agreementId === agreement.id);

  const simulatePdfDownload = () => {
    triggerToast('Downloading final signed Agreement PDF brief...');
    // Create mock download anchor
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(agreement, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href",     dataStr);
    downloadAnchor.setAttribute("download", `Agreement_${agreement.brandName.replace(/\s+/g, '_')}_v${agreement.version}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="client-detail-pane">
      
      {/* ─── Column layout ─── */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '1.5rem' }}>
        
        {/* Left Side: Agreements and Versions */}
        <div>
          
          {/* Agreement Vault */}
          <div className="detail-header-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Contract Vault</h3>
              <button className="btn btn-primary btn-sm" onClick={simulatePdfDownload}>
                📥 Download Signed PDF
              </button>
            </div>
            
            <div style={{ background: '#fafafa', border: '1px solid var(--ob-border)', padding: '1rem', borderRadius: '8px', fontSize: '0.85rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginBottom: '1rem' }}>
                <div>
                  <span style={{ color: 'gray', fontSize: '0.75rem', display: 'block' }}>CLIENT SIGNATURE</span>
                  <strong>{agreement.clientName}</strong>
                  {agreement.clientSignature ? (
                    <img src={agreement.clientSignature} alt="Client Sign" style={{ display: 'block', height: '30px', marginTop: '0.2rem' }} />
                  ) : <span style={{ color: 'red' }}>Pending Sign</span>}
                  <span style={{ fontSize: '0.7rem', color: 'gray', display: 'block' }}>Signed: {agreement.clientSignedAt ? new Date(agreement.clientSignedAt).toLocaleString() : 'N/A'}</span>
                </div>
                <div>
                  <span style={{ color: 'gray', fontSize: '0.75rem', display: 'block' }}>DEVELOPER SIGNATURE</span>
                  <strong>Shubham Gundu</strong>
                  {agreement.adminSignature ? (
                    <img src={agreement.adminSignature} alt="Admin Sign" style={{ display: 'block', height: '30px', marginTop: '0.2rem' }} />
                  ) : <span style={{ color: 'red' }}>Pending Sign</span>}
                  <span style={{ fontSize: '0.7rem', color: 'gray', display: 'block' }}>Signed: {agreement.adminSignedAt ? new Date(agreement.adminSignedAt).toLocaleString() : 'N/A'}</span>
                </div>
              </div>
              <div style={{ borderTop: '1px dashed #eee', paddingTop: '0.8rem', fontSize: '0.75rem', color: 'gray' }}>
                <div><strong>Vault Audit Logs:</strong></div>
                <div>Client IP: <code>{agreement.clientIp || '127.0.0.1'}</code></div>
                <div>Device Fingerprint: <code>{agreement.clientDevice || 'Chrome Browser'}</code></div>
              </div>
            </div>
          </div>

          {/* Revision Version History */}
          <div className="detail-header-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem' }}>Contract Revisions &amp; Versions</h3>
            {agreementRevisions.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {agreementRevisions.map(rev => (
                  <div key={rev.id} style={{ border: '1px solid var(--ob-border)', borderRadius: '6px', padding: '0.8rem', background: '#fafafa' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem', fontSize: '0.85rem' }}>
                      <strong>v{rev.version} — {rev.changeSummary}</strong>
                      <span style={{ fontSize: '0.75rem', color: 'gray' }}>{new Date(rev.created_at).toLocaleDateString()}</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'gray' }}>Author: {rev.author}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ fontSize: '0.85rem', color: 'gray', textAlign: 'center', padding: '1rem', border: '1px dashed #ccc', borderRadius: '6px' }}>
                No historic revisions. Active contract is at initial release (v1.0).
              </div>
            )}
          </div>

        </div>

        {/* Right Side: Invoice & Payments List */}
        <div>
          
          <div className="detail-header-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem' }}>Payments Ledger</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {agreement.paymentSchedule.map((milestone, idx) => (
                <div key={idx} style={{ padding: '0.8rem', border: '1px solid var(--ob-border)', borderRadius: '8px', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ fontSize: '0.9rem', display: 'block' }}>{milestone.milestone} Milestone</strong>
                    <span style={{ fontSize: '0.8rem', color: 'gray' }}>{agreement.currency}{milestone.amount}</span>
                  </div>
                  <div>
                    {milestone.status === 'Paid' ? (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.2rem' }}>
                        <span style={{ background: '#d4edda', color: '#155724', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold' }}>Paid ✓</span>
                        <button className="btn btn-secondary btn-sm" onClick={() => setSelectedReceipt(milestone.milestone)} style={{ fontSize: '0.65rem', padding: '0.1rem 0.3rem' }}>
                          🧾 Receipt
                        </button>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.2rem' }}>
                        <span style={{ background: '#fff3cd', color: '#856404', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold' }}>Pending</span>
                        <button className="btn btn-primary btn-sm" onClick={() => setPayUpiMilestone({ milestone: milestone.milestone, amount: milestone.amount })} style={{ fontSize: '0.65rem', padding: '0.1rem 0.3rem' }}>
                          💳 Pay Now
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* ─── Receipt Modal ─── */}
      {selectedReceipt && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', width: '380px', border: '1px solid #ddd', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <div style={{ textAlign: 'center', borderBottom: '2px solid #eee', paddingBottom: '1rem', marginBottom: '1rem' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--ob-primary)' }}>shubsss.dev</div>
              <div style={{ fontSize: '0.8rem', color: 'gray' }}>Milestone Payment Receipt</div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'gray' }}>Receipt No:</span>
                <strong>REC-2026-{(selectedReceipt.charCodeAt(0) * 11).toString().slice(0, 4)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'gray' }}>Client Name:</span>
                <strong>{agreement.clientName}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'gray' }}>Brand/Company:</span>
                <strong>{agreement.brandName}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'gray' }}>Milestone Phase:</span>
                <strong>{selectedReceipt}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'gray' }}>Payment Mode:</span>
                <strong>{agreement.paymentMode}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #eee', paddingTop: '0.8rem', fontSize: '1rem' }}>
                <strong>Amount Paid:</strong>
                <strong style={{ color: 'green' }}>
                  {agreement.currency}{agreement.paymentSchedule.find(m => m.milestone === selectedReceipt)?.amount}
                </strong>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button className="btn btn-secondary" onClick={() => { triggerToast('Receipt printed!'); setSelectedReceipt(null); }} style={{ flex: 1 }}>
                🖨️ Print
              </button>
              <button className="btn btn-secondary" onClick={() => setSelectedReceipt(null)} style={{ flex: 1, borderColor: '#bbb' }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Pay Now UPI QR Modal ─── */}
      {payUpiMilestone && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', width: '320px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <h4 style={{ margin: '0 0 0.5rem 0' }}>Milestone Billing Payment</h4>
            <div style={{ fontSize: '0.85rem', color: 'gray', marginBottom: '1rem' }}>
              Scan the UPI QR Code below to transfer <strong>{agreement.currency}{payUpiMilestone.amount}</strong> for the <strong>{payUpiMilestone.milestone}</strong> milestone.
            </div>

            {/* UPI QR Code Simulator */}
            <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '8px', display: 'inline-block', marginBottom: '1rem', border: '1px solid #ddd' }}>
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(`upi://pay?pa=${agreement.upiId || '8698846796@axl'}&pn=ShubhamGundu&am=${payUpiMilestone.amount}&cu=INR`)}`}
                alt="UPI QR Code"
                style={{ display: 'block', width: '150px', height: '150px' }}
              />
              <div style={{ fontSize: '0.7rem', color: 'gray', marginTop: '0.4rem' }}>
                UPI ID: <code>{agreement.upiId || '8698846796@axl'}</code>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button className="btn btn-primary" onClick={() => {
                const allAgreements = db.getAgreements();
                const updated = allAgreements.map(a => {
                  if (a.id === agreement.id) {
                    return {
                      ...a,
                      paymentSchedule: a.paymentSchedule.map(m => m.milestone === payUpiMilestone?.milestone ? { ...m, status: 'Paid' as const } : m)
                    };
                  }
                  return a;
                });
                db.saveAgreements(updated);
                
                db.triggerNotification(
                  agreement.id,
                  'Developer',
                  '💳 Payment Received!',
                  `Client ${agreement.clientName} paid ₹${payUpiMilestone?.amount} for ${payUpiMilestone?.milestone} milestone.`,
                  'payment',
                  'Critical',
                  'oversight'
                );

                db.triggerNotification(
                  agreement.id,
                  'Client',
                  '🧾 Payment Confirmation',
                  `Receipt generated for ₹${payUpiMilestone?.amount} Milestone payment.`,
                  'payment',
                  'Informational',
                  'vault'
                );

                triggerToast('UPI payment detected & confirmed successfully!');
                setPayUpiMilestone(null);
                window.location.reload();
              }} style={{ width: '100%' }}>
                Confirm Payment ✓
              </button>
              <button className="btn btn-secondary" onClick={() => setPayUpiMilestone(null)} style={{ width: '100%', borderColor: '#bbb' }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
