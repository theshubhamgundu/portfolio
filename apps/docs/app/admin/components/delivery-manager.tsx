'use client';

import { useState, type FormEvent, useEffect } from 'react';
import { db, type Agreement, type RoadmapPhase, type DemoCheckpoint, type ClientDelay, type ChangeRequest } from '../../db';

interface DeliveryManagerProps {
  agreements: Agreement[];
  phases: RoadmapPhase[];
  checkpoints: DemoCheckpoint[];
  delays: ClientDelay[];
  changeRequests: ChangeRequest[];
  loadDB: () => void;
  triggerToast: (msg: string) => void;
}

export default function DeliveryManager({ agreements, phases, checkpoints, delays, changeRequests, loadDB, triggerToast }: DeliveryManagerProps) {
  const [activeDeliveryAgreementId, setActiveDeliveryAgreementId] = useState(agreements[0]?.id || '');
  
  // Deliverables & Access States
  const [collabEnabled, setCollabEnabled] = useState(false);
  const [packagedUrl, setPackagedUrl] = useState('');
  const [finalFilesUrl, setFinalFilesUrl] = useState('');
  const [docUrl, setDocUrl] = useState('');

  // Phase Planner States
  const [newPhaseTitle, setNewPhaseTitle] = useState('');
  const [newPhaseStart, setNewPhaseStart] = useState('');
  const [newPhaseEnd, setNewPhaseEnd] = useState('');

  // Demo Checkpoint States
  const [deliveryCheckpointId, setDeliveryCheckpointId] = useState('');
  const [deliveryStagingLink, setDeliveryStagingLink] = useState('');

  // Delay Log States
  const [delayCategory, setDelayCategory] = useState<'missing_credentials' | 'no_response' | 'slow_approval' | 'missing_assets'>('missing_credentials');
  const [delayPhaseId, setDelayPhaseId] = useState('');
  const [delayDesc, setDelayDesc] = useState('');
  const [delayClientVisible, setDelayClientVisible] = useState(true);

  // Change Request States
  const [activeCRId, setActiveCRId] = useState('');
  const [crQuotePrice, setCrQuotePrice] = useState('');
  const [crImpactDays, setCrImpactDays] = useState(0);

  const activeDeliveryAgreement = agreements.find(a => a.id === activeDeliveryAgreementId);
  const agreementPhases = phases.filter(p => p.agreementId === activeDeliveryAgreementId);
  const agreementCheckpoints = checkpoints.filter(c => c.agreementId === activeDeliveryAgreementId);
  const agreementDelays = delays.filter(d => d.agreementId === activeDeliveryAgreementId);
  const agreementChanges = changeRequests.filter(cr => cr.agreementId === activeDeliveryAgreementId);

  useEffect(() => {
    if (activeDeliveryAgreement) {
      setCollabEnabled(activeDeliveryAgreement.isWhiteboardCollabEnabled || false);
      setPackagedUrl(activeDeliveryAgreement.packagedBuildUrl || '');
      setFinalFilesUrl(activeDeliveryAgreement.finalFilesUrl || '');
      setDocUrl(activeDeliveryAgreement.documentationUrl || '');
    }
  }, [activeDeliveryAgreementId, activeDeliveryAgreement]);

  const handleUpdateDeliverables = (e: FormEvent) => {
    e.preventDefault();
    if (!activeDeliveryAgreementId) return;

    const allAgreements = db.getAgreements();
    const updated = allAgreements.map(a => {
      if (a.id === activeDeliveryAgreementId) {
        return {
          ...a,
          isWhiteboardCollabEnabled: collabEnabled,
          packagedBuildUrl: packagedUrl,
          finalFilesUrl: finalFilesUrl,
          documentationUrl: docUrl,
          deliveryTimestamp: a.deliveryTimestamp || new Date().toISOString()
        };
      }
      return a;
    });

    db.saveAgreements(updated);
    loadDB();
    triggerToast('Deliverables & Access settings updated!');
  };

  const handleCreatePhase = (e: FormEvent) => {
    e.preventDefault();
    if (!activeDeliveryAgreementId || !newPhaseTitle || !newPhaseStart || !newPhaseEnd) return;

    const allPhases = db.getRoadmap();
    const newPhase: RoadmapPhase = {
      id: 'ph-' + Date.now(),
      agreementId: activeDeliveryAgreementId,
      title: newPhaseTitle,
      plannedStartDate: new Date(newPhaseStart).toISOString(),
      plannedEndDate: new Date(newPhaseEnd).toISOString(),
      actualEndDate: null,
      status: 'Pending'
    };

    allPhases.push(newPhase);
    db.saveRoadmap(allPhases);
    setNewPhaseTitle('');
    setNewPhaseStart('');
    setNewPhaseEnd('');
    loadDB();
    triggerToast('Roadmap phase added.');
  };

  const handleCompletePhase = (phaseId: string) => {
    const allPhases = db.getRoadmap();
    const updated = allPhases.map(p => {
      if (p.id === phaseId) {
        return { ...p, status: 'Completed' as const, actualEndDate: new Date().toISOString() };
      }
      return p;
    });
    db.saveRoadmap(updated);
    loadDB();
    triggerToast('Phase marked completed.');
  };

  const handleDeliverDemo = (e: FormEvent) => {
    e.preventDefault();
    if (!deliveryCheckpointId || !deliveryStagingLink) return;

    const allCheckpoints = db.getCheckpoints();
    const updated = allCheckpoints.map(cp => {
      if (cp.id === deliveryCheckpointId) {
        return { ...cp, deliveredAt: new Date().toISOString(), stagingLink: deliveryStagingLink };
      }
      return cp;
    });
    db.saveCheckpoints(updated);
    setDeliveryStagingLink('');
    loadDB();
    triggerToast('Demo build delivered to client!');
  };

  const handleLogDelay = (e: FormEvent) => {
    e.preventDefault();
    if (!activeDeliveryAgreementId || !delayDesc || !delayPhaseId) return;

    const allDelays = db.getDelays();
    const newDelay: ClientDelay = {
      id: 'dl-' + Date.now(),
      agreementId: activeDeliveryAgreementId,
      category: delayCategory,
      phaseId: delayPhaseId,
      description: delayDesc,
      startedAt: new Date().toISOString(),
      resolvedAt: null,
      isClientVisible: delayClientVisible
    };

    allDelays.push(newDelay);
    db.saveDelays(allDelays);
    setDelayDesc('');
    loadDB();
    triggerToast('Blocker delay stopwatch started!');
  };

  const handleResolveDelay = (delayId: string) => {
    const allDelays = db.getDelays();
    const updated = allDelays.map(d => {
      if (d.id === delayId) return { ...d, resolvedAt: new Date().toISOString() };
      return d;
    });
    db.saveDelays(updated);
    loadDB();
    triggerToast('Blocker resolved.');
  };

  const handleExportDelayReport = () => {
    let reportText = `──── CLIENT DELAYS EVIDENCE REPORT ────\n`;
    agreementDelays.forEach((d, i) => {
      const elapsed = d.resolvedAt 
        ? Math.ceil((new Date(d.resolvedAt).getTime() - new Date(d.startedAt).getTime()) / 3600000)
        : Math.ceil((new Date().getTime() - new Date(d.startedAt).getTime()) / 3600000);
      reportText += `${i+1}. Block category: ${d.category.replace('_', ' ')}\n`;
      reportText += `   Description: ${d.description}\n`;
      reportText += `   Timeline impact: ${elapsed} hours\n`;
      reportText += `   Status: ${d.resolvedAt ? `Resolved on ${new Date(d.resolvedAt).toLocaleDateString()}` : 'ACTIVE Blocker'}\n\n`;
    });
    reportText += `──────────────────────────────────────`;
    
    navigator.clipboard.writeText(reportText).then(() => {
      triggerToast('Evidence Report copied to clipboard!');
    });
  };

  const handleQuoteChangeRequest = (e: FormEvent) => {
    e.preventDefault();
    if (!activeCRId || !crQuotePrice) return;

    const allChanges = db.getChangeRequests();
    const updated = allChanges.map(cr => {
      if (cr.id === activeCRId) {
        return { ...cr, status: 'Quoted' as const, quotedPrice: crQuotePrice, timelineImpactDays: crImpactDays };
      }
      return cr;
    });
    db.saveChangeRequests(updated);

    const crObj = allChanges.find(c => c.id === activeCRId);
    if (crObj) {
      db.triggerNotification(
        crObj.agreementId,
        'Client',
        '⚡ Change Request Quoted',
        `A quote of ${crQuotePrice} and +${crImpactDays} days timeline has been proposed.`,
        'ticket',
        'Action-Required',
        'overview'
      );
    }

    setCrQuotePrice('');
    setCrImpactDays(0);
    setActiveCRId('');
    loadDB();
    triggerToast('Change request quote sent.');
  };

  return (
    <div className="client-detail-pane">
      <div className="detail-header-card" style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
          <strong>Active Project:</strong>
          <select value={activeDeliveryAgreementId} onChange={(e) => setActiveDeliveryAgreementId(e.target.value)}>
            {agreements.map(a => (
              <option key={a.id} value={a.id}>{a.brandName} — {a.title} ({a.projectType})</option>
            ))}
          </select>
        </div>
      </div>

      <div className="admin-detail-grid" style={{ marginTop: '1.5rem' }}>
        
        {/* Roadmap Phase Config */}
        <div className="detail-section-card">
          <h4>📅 Roadmap Phase Planner</h4>
          <div className="client-list" style={{ maxHeight: '250px' }}>
            {agreementPhases.map(p => (
              <div key={p.id} style={{ padding: '0.5rem', background: '#fafbfc', border: '1px solid #eef0f4', borderRadius: '8px', fontSize: '0.78rem', marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong>{p.title}</strong>
                  <span>{p.status}</span>
                </div>
                <div style={{ fontSize: '0.7rem', color: 'gray' }}>Planned End: {new Date(p.plannedEndDate).toLocaleDateString()}</div>
                {p.status !== 'Completed' && (
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => handleCompletePhase(p.id)} style={{ padding: '2px 8px', fontSize: '0.68rem', marginTop: '4px' }}>
                    Complete Phase
                  </button>
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleCreatePhase} style={{ borderTop: '1px dashed #e2e5ea', paddingTop: '0.75rem', marginTop: '0.75rem' }}>
            <h5>Add New Phase</h5>
            <div className="form-group"><input type="text" value={newPhaseTitle} onChange={(e) => setNewPhaseTitle(e.target.value)} placeholder="Phase Title" required style={{ fontSize: '0.75rem', padding: '4px' }} /></div>
            <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
              <input type="date" value={newPhaseStart} onChange={(e) => setNewPhaseStart(e.target.value)} required style={{ fontSize: '0.75rem', padding: '4px' }} />
              <input type="date" value={newPhaseEnd} onChange={(e) => setNewPhaseEnd(e.target.value)} required style={{ fontSize: '0.75rem', padding: '4px' }} />
            </div>
            <button type="submit" className="btn btn-primary btn-sm" style={{ width: '100%', marginTop: '6px' }}>Save Phase</button>
          </form>
        </div>

        {/* Demo Checkpoints */}
        <div className="detail-section-card">
          <h4>🚀 Demo Checkpoints Sign-Offs</h4>
          <div className="client-list" style={{ maxHeight: '200px' }}>
            {agreementCheckpoints.map(cp => (
              <div key={cp.id} style={{ padding: '0.5rem', background: '#fafbfc', border: '1px solid #eef0f4', borderRadius: '8px', fontSize: '0.78rem', marginBottom: '0.5rem' }}>
                <strong>{cp.title}</strong>
                <div style={{ fontSize: '0.7rem', color: 'gray' }}>
                  Status: {cp.confirmedAt ? 'Confirmed' : cp.deliveredAt ? 'Delivered' : 'Not Delivered'}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleDeliverDemo} style={{ borderTop: '1px dashed #e2e5ea', paddingTop: '0.75rem', marginTop: '0.75rem' }}>
            <h5>Deliver Staging Build</h5>
            <select value={deliveryCheckpointId} onChange={(e) => setDeliveryCheckpointId(e.target.value)} required style={{ fontSize: '0.75rem', padding: '4px' }}>
              <option value="">Select Milestone...</option>
              {agreementCheckpoints.filter(cp => !cp.deliveredAt).map(cp => (
                <option key={cp.id} value={cp.id}>{cp.title}</option>
              ))}
            </select>
            <input type="text" value={deliveryStagingLink} onChange={(e) => setDeliveryStagingLink(e.target.value)} placeholder="Staging Link" required style={{ fontSize: '0.75rem', padding: '4px', marginTop: '4px' }} />
            <button type="submit" className="btn btn-primary btn-sm" style={{ width: '100%', marginTop: '6px' }}>Deliver Demo Build</button>
          </form>
        </div>

        {/* Delay logs */}
        <div className="detail-section-card">
          <h4>🏢 Blocker Delay Logs (Stopwatch)</h4>
          <div className="client-list" style={{ maxHeight: '200px' }}>
            {agreementDelays.map(d => (
              <div key={d.id} style={{ padding: '0.5rem', background: '#fafbfc', border: '1px solid #eef0f4', borderRadius: '8px', fontSize: '0.78rem', marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong>{d.category.replace('_', ' ').toUpperCase()}</strong>
                  {!d.resolvedAt ? (
                    <button type="button" className="btn btn-primary btn-sm" onClick={() => handleResolveDelay(d.id)} style={{ padding: '2px 6px', fontSize: '0.62rem' }}>Resolve</button>
                  ) : <span style={{ color: 'green' }}>Resolved</span>}
                </div>
                <p style={{ fontSize: '0.72rem', color: 'gray' }}>{d.description}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleLogDelay} style={{ borderTop: '1px dashed #e2e5ea', paddingTop: '0.75rem', marginTop: '0.75rem' }}>
            <h5>Start Blocker Blocker</h5>
            <div style={{ display: 'flex', gap: '4px' }}>
              <select value={delayCategory} onChange={(e) => setDelayCategory(e.target.value as any)} style={{ fontSize: '0.75rem', padding: '4px' }}>
                <option value="missing_credentials">Credentials</option>
                <option value="no_response">No Response</option>
                <option value="slow_approval">Slow Approval</option>
                <option value="missing_assets">Missing Assets</option>
              </select>
              <select value={delayPhaseId} onChange={(e) => setDelayPhaseId(e.target.value)} required style={{ fontSize: '0.75rem', padding: '4px' }}>
                <option value="">Select Phase...</option>
                {agreementPhases.map(p => (
                  <option key={p.id} value={p.id}>{p.title}</option>
                ))}
              </select>
            </div>
            <input type="text" value={delayDesc} onChange={(e) => setDelayDesc(e.target.value)} placeholder="Description..." required style={{ fontSize: '0.75rem', padding: '4px', marginTop: '4px' }} />
            <button type="submit" className="btn btn-primary btn-sm" style={{ width: '100%', marginTop: '6px' }}>Start stopwatch</button>
          </form>
          <button type="button" className="btn btn-secondary btn-sm" onClick={handleExportDelayReport} style={{ marginTop: '6px', width: '100%' }}>Copy Delay Evidence Report</button>
        </div>

        {/* Change Request console */}
        <div className="detail-section-card">
          <h4>⚡ Change Request Dashboard</h4>
          <div className="client-list" style={{ maxHeight: '200px' }}>
            {agreementChanges.map(cr => (
              <div key={cr.id} style={{ padding: '0.5rem', background: '#fafbfc', border: '1px solid #eef0f4', borderRadius: '8px', fontSize: '0.78rem', marginBottom: '0.5rem' }}>
                <p>{cr.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem' }}>
                  <span>Status: <strong>{cr.status}</strong></span>
                  <span>Quote: {cr.quotedPrice}</span>
                </div>
                {cr.status === 'Pending Review' && (
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => setActiveCRId(cr.id)} style={{ padding: '2px 8px', fontSize: '0.68rem', marginTop: '4px' }}>Quote / Impact CR</button>
                )}
              </div>
            ))}
          </div>

          {activeCRId && (
            <form onSubmit={handleQuoteChangeRequest} style={{ borderTop: '1px dashed #e2e5ea', paddingTop: '0.75rem', marginTop: '0.75rem' }}>
              <h5>Quote Change Request</h5>
              <div style={{ display: 'flex', gap: '4px' }}>
                <input type="text" value={crQuotePrice} onChange={(e) => setCrQuotePrice(e.target.value)} placeholder="Price (e.g. ₹2,000)" required style={{ fontSize: '0.75rem', padding: '4px' }} />
                <input type="number" value={crImpactDays} onChange={(e) => setCrImpactDays(parseInt(e.target.value) || 0)} placeholder="Days delay" required style={{ fontSize: '0.75rem', padding: '4px' }} />
              </div>
              <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
                <button type="submit" className="btn btn-primary btn-sm" style={{ flex: 1 }}>Submit Quote</button>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setActiveCRId('')}>Cancel</button>
              </div>
            </form>
          )}
        </div>

        {/* Deliverables & Access settings */}
        <div className="detail-section-card">
          <h4>🎨 Deliverables &amp; Access Settings</h4>
          <form onSubmit={handleUpdateDeliverables} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem' }}>
              <input
                type="checkbox"
                checked={collabEnabled}
                onChange={(e) => setCollabEnabled(e.target.checked)}
              />
              Enable Client Whiteboard Collaboration
            </label>
            
            <div className="form-group">
              <label style={{ fontSize: '0.7rem', color: 'gray', display: 'block' }}>Packaged Build Link:</label>
              <input
                type="text"
                value={packagedUrl}
                onChange={(e) => setPackagedUrl(e.target.value)}
                placeholder="e.g. Github Releases / Vercel link"
                style={{ fontSize: '0.75rem', padding: '4px', width: '100%' }}
              />
            </div>

            <div className="form-group">
              <label style={{ fontSize: '0.7rem', color: 'gray', display: 'block' }}>Final Assets / Files Drive:</label>
              <input
                type="text"
                value={finalFilesUrl}
                onChange={(e) => setFinalFilesUrl(e.target.value)}
                placeholder="e.g. Google Drive Link"
                style={{ fontSize: '0.75rem', padding: '4px', width: '100%' }}
              />
            </div>

            <div className="form-group">
              <label style={{ fontSize: '0.7rem', color: 'gray', display: 'block' }}>Documentation URL:</label>
              <input
                type="text"
                value={docUrl}
                onChange={(e) => setDocUrl(e.target.value)}
                placeholder="e.g. Wiki / Admin Manual path"
                style={{ fontSize: '0.75rem', padding: '4px', width: '100%' }}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-sm" style={{ width: '100%', marginTop: '4px' }}>
              Save Settings
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
