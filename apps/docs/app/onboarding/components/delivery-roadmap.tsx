'use client';

import { useState, type FormEvent } from 'react';
import { db, type Agreement, type RoadmapPhase, type DemoCheckpoint, type ClientDelay, type ChangeRequest, type Ticket } from '../../db';

interface DeliveryRoadmapProps {
  agreement: Agreement;
  phases: RoadmapPhase[];
  setPhases: React.Dispatch<React.SetStateAction<RoadmapPhase[]>>;
  checkpoints: DemoCheckpoint[];
  setCheckpoints: React.Dispatch<React.SetStateAction<DemoCheckpoint[]>>;
  delays: ClientDelay[];
  changeRequests: ChangeRequest[];
  setChangeRequests: React.Dispatch<React.SetStateAction<ChangeRequest[]>>;
  tickets: Ticket[];
  freezeInfo: { showAlert: boolean; text: string; alertLevel: string };
  triggerToast: (msg: string) => void;
}

export default function DeliveryRoadmap({ agreement, phases, setPhases, checkpoints, setCheckpoints, delays, changeRequests, setChangeRequests, tickets, freezeInfo, triggerToast }: DeliveryRoadmapProps) {
  const [crDesc, setCrDesc] = useState('');

  const handleConfirmCheckpoint = (checkpointId: string) => {
    const allCheckpoints = db.getCheckpoints();
    const updated = allCheckpoints.map(c => {
      if (c.id === checkpointId) return { ...c, confirmedAt: new Date().toISOString() };
      return c;
    });
    db.saveCheckpoints(updated);
    
    db.triggerNotification(
      agreement.id,
      'Developer',
      '🚀 Demo Checkpoint Confirmed!',
      `Client confirmed receipt of checkpoint: "${allCheckpoints.find(x => x.id === checkpointId)?.title}".`,
      'agreement',
      'Informational',
      'delivery'
    );

    setCheckpoints(updated.filter(c => c.agreementId === agreement.id));
    triggerToast('Delivery receipt confirmed!');
  };

  const handleCreateChangeRequest = (e: FormEvent) => {
    e.preventDefault();
    if (!crDesc) return;

    const allChanges = db.getChangeRequests();
    const newCR: ChangeRequest = {
      id: 'cr-' + Date.now(),
      agreementId: agreement.id,
      description: crDesc,
      initiatedBy: 'Client',
      quotedPrice: 'Pending Review',
      timelineImpactDays: 0,
      status: 'Pending Review',
      created_at: new Date().toISOString()
    };

    allChanges.push(newCR);
    db.saveChangeRequests(allChanges);
    
    db.triggerNotification(
      agreement.id,
      'Developer',
      '⚡ Client Change Request Raised',
      `Client proposed change: "${crDesc}"`,
      'ticket',
      'Action-Required',
      'delivery'
    );

    setChangeRequests(prev => [...prev, newCR]);
    setCrDesc('');
    triggerToast('Change request submitted.');
  };

  const handleApproveChangeRequest = (crId: string) => {
    const allChanges = db.getChangeRequests();
    const updated = allChanges.map(cr => {
      if (cr.id === crId) return { ...cr, status: 'Approved' as const };
      return cr;
    });
    db.saveChangeRequests(updated);

    db.triggerNotification(
      agreement.id,
      'Developer',
      '⚡ CR Quote Approved by Client',
      `Client approved quote for: "${allChanges.find(c => c.id === crId)?.description}"`,
      'ticket',
      'Critical',
      'delivery'
    );

    setChangeRequests(updated.filter(cr => cr.agreementId === agreement.id));
    triggerToast('Change request approved!');
  };

  const handleRejectChangeRequest = (crId: string) => {
    const allChanges = db.getChangeRequests();
    const updated = allChanges.map(cr => {
      if (cr.id === crId) return { ...cr, status: 'Rejected' as const };
      return cr;
    });
    db.saveChangeRequests(updated);

    db.triggerNotification(
      agreement.id,
      'Developer',
      '⚡ CR Quote Rejected by Client',
      `Client rejected quote for: "${allChanges.find(c => c.id === crId)?.description}"`,
      'ticket',
      'Informational',
      'delivery'
    );

    setChangeRequests(updated.filter(cr => cr.agreementId === agreement.id));
    triggerToast('Change request rejected.');
  };

  return (
    <div className="client-detail-pane">
      {freezeInfo.showAlert && (
        <div style={{ padding: '1rem', borderRadius: '8px', marginBottom: '1rem', fontWeight: 'bold', fontSize: '0.86rem', background: freezeInfo.alertLevel === 'danger' ? '#fef2f2' : freezeInfo.alertLevel === 'warning' ? '#fffbeb' : '#eff6ff', border: '1px solid', borderColor: freezeInfo.alertLevel === 'danger' ? '#fecaca' : freezeInfo.alertLevel === 'warning' ? '#fde68a' : '#bfdbfe', color: freezeInfo.alertLevel === 'danger' ? '#dc2626' : freezeInfo.alertLevel === 'warning' ? '#d97706' : '#2563eb' }}>
          <span>{freezeInfo.text}</span>
        </div>
      )}

      <div className="admin-detail-grid">
        
        {/* Phases list */}
        <div className="detail-section-card">
          <h4>📅 Roadmap &amp; Phases</h4>
          <div className="client-list" style={{ maxHeight: '350px' }}>
            {phases.map(p => {
              const isExpired = p.status === 'In Progress' && new Date(p.plannedEndDate).getTime() < new Date().getTime();
              let slipDays = 0;
              if (isExpired) {
                slipDays = Math.ceil((new Date().getTime() - new Date(p.plannedEndDate).getTime()) / (1000 * 3600 * 24));
              } else if (p.actualEndDate && new Date(p.actualEndDate).getTime() > new Date(p.plannedEndDate).getTime()) {
                slipDays = Math.ceil((new Date(p.actualEndDate).getTime() - new Date(p.plannedEndDate).getTime()) / (1000 * 3600 * 24));
              }

              return (
                <div key={p.id} style={{ padding: '0.75rem', background: '#fafbfc', border: '1px solid #eef0f4', borderRadius: '8px', fontSize: '0.8rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong>{p.title}</strong>
                    <span>{p.status}</span>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'gray' }}>Planned: {new Date(p.plannedStartDate).toLocaleDateString()} - {new Date(p.plannedEndDate).toLocaleDateString()}</div>
                  {p.actualEndDate && <div style={{ fontSize: '0.72rem', color: 'green' }}>Completed: {new Date(p.actualEndDate).toLocaleDateString()}</div>}
                  {slipDays > 0 && <div style={{ color: 'red', fontSize: '0.75rem', fontWeight: 'bold' }}>🚨 Slipping! ({slipDays} days behind)</div>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Demo Checkpoints */}
        <div className="detail-section-card">
          <h4>🚀 Demo Deliveries Sign-Offs</h4>
          <div className="client-list" style={{ maxHeight: '350px' }}>
            {checkpoints.map(cp => (
              <div key={cp.id} style={{ padding: '0.75rem', background: '#fafbfc', border: '1px solid #eef0f4', borderRadius: '8px', fontSize: '0.8rem' }}>
                <strong>{cp.title}</strong>
                {cp.deliveredAt ? (
                  <div style={{ marginTop: '6px' }}>
                    <div>Delivered: {new Date(cp.deliveredAt).toLocaleDateString()}</div>
                    {cp.stagingLink && <a href={cp.stagingLink} target="_blank" rel="noopener noreferrer">🔗 Open Staging Build</a>}
                    {cp.confirmedAt ? (
                      <div style={{ color: 'green', fontWeight: 'bold' }}>✓ Confirmed: {new Date(cp.confirmedAt).toLocaleDateString()}</div>
                    ) : (
                      <button className="btn btn-primary btn-sm" onClick={() => handleConfirmCheckpoint(cp.id)} style={{ marginTop: '4px' }}>Confirm Receipt</button>
                    )}
                  </div>
                ) : <div>Pending Delivery</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Delay logs */}
        {delays.length > 0 && (
          <div className="detail-section-card full-width-card">
            <h4>🏢 Delay Logs</h4>
            <div className="client-list">
              {delays.map(d => (
                <div key={d.id} style={{ padding: '0.5rem', background: '#fafbfc', border: '1px solid #eef0f4', borderRadius: '8px', fontSize: '0.78rem' }}>
                  <strong>Blocker: {d.category.replace('_', ' ').toUpperCase()}</strong>
                  <p>{d.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Change requests */}
        <div className="detail-section-card full-width-card">
          <h4>⚡ Change Requests Flow</h4>
          <div className="admin-detail-grid">
            <form onSubmit={handleCreateChangeRequest}>
              <textarea value={crDesc} onChange={(e) => setCrDesc(e.target.value)} placeholder="Describe your request..." rows={3} required />
              <button type="submit" className="btn btn-primary btn-sm" style={{ width: '100%', marginTop: '6px' }}>Request Change</button>
            </form>

            <div className="client-list">
              {changeRequests.map(cr => (
                <div key={cr.id} style={{ padding: '0.5rem', background: '#fafbfc', border: '1px solid #eef0f4', borderRadius: '8px', fontSize: '0.78rem' }}>
                  <p>{cr.description}</p>
                  <span>Quote: {cr.quotedPrice} ({cr.timelineImpactDays} days) | Status: {cr.status}</span>
                  {cr.status === 'Pending Review' && cr.quotedPrice !== 'Pending Review' && (
                    <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
                      <button type="button" className="btn btn-primary btn-sm" onClick={() => handleApproveChangeRequest(cr.id)}>Approve</button>
                      <button type="button" className="btn btn-secondary btn-sm" onClick={() => handleRejectChangeRequest(cr.id)}>Reject</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
