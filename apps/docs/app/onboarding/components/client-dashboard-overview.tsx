'use client';

import { type Agreement, type RoadmapPhase, type DemoCheckpoint, type ClientDelay } from '../../db';

interface ClientDashboardOverviewProps {
  agreement: Agreement;
  phases: RoadmapPhase[];
  checkpoints: DemoCheckpoint[];
  delays: ClientDelay[];
}

export default function ClientDashboardOverview({
  agreement,
  phases,
  checkpoints,
  delays,
}: ClientDashboardOverviewProps) {
  // Simulated current time: 10 July 2026
  const SIMULATED_TODAY = new Date('2026-07-10T12:00:00Z');

  // 1. Completion Percentage
  const completedPhases = phases.filter(p => p.status === 'Completed').length;
  const totalPhases = phases.length || 1;
  const completionPercentage = Math.round((completedPhases / totalPhases) * 100);

  // 2. Project Health Flag
  const hasActiveDelay = delays.some(d => d.resolvedAt === null);
  const isDelayed = hasActiveDelay || phases.some(p => p.status !== 'Completed' && new Date(p.plannedEndDate) < SIMULATED_TODAY);
  const healthStatus = isDelayed ? 'Delayed' : 'On Track';

  // 3. Next Milestone Preview
  const nextMilestone = phases.find(p => p.status !== 'Completed');

  // 4. Timeline calculations
  const startDate = new Date(agreement.clientSignedAt || agreement.created_at);
  const freezeDate = agreement.devFreezeDate ? new Date(agreement.devFreezeDate) : null;
  const supportEndDate = agreement.supportEndDate ? new Date(agreement.supportEndDate) : null;

  // Visual Progress percentage
  let progressPct = 0;
  if (freezeDate && supportEndDate) {
    const totalDuration = supportEndDate.getTime() - startDate.getTime();
    const currentElapsed = SIMULATED_TODAY.getTime() - startDate.getTime();
    progressPct = Math.min(100, Math.max(0, Math.round((currentElapsed / totalDuration) * 100)));
  }

  // Countdowns
  const getFreezeCountdownText = () => {
    if (!freezeDate) return 'No freeze date defined.';
    const diffTime = freezeDate.getTime() - SIMULATED_TODAY.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return 'Development freeze passed.';
    if (diffDays === 0) return 'Development freeze is TODAY!';
    return `${diffDays} days remaining until development freeze.`;
  };

  const getSupportCountdownText = () => {
    if (!supportEndDate) return 'No support window defined.';
    const diffTime = supportEndDate.getTime() - SIMULATED_TODAY.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return 'Post-launch support window expired.';
    if (diffDays === 0) return 'Post-launch support ends TODAY!';
    return `${diffDays} days remaining in support window.`;
  };

  return (
    <div className="client-detail-pane">
      
      {/* ─── Row 1: KPI Overview Cards ─── */}
      <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        
        <div className="analytics-card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <span className="card-label" style={{ color: 'gray', fontSize: '0.85rem' }}>Overall Progress</span>
          <span className="card-value" style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--ob-primary)' }}>{completionPercentage}%</span>
          <div className="progress-bar-bg" style={{ width: '100%', height: '8px', background: '#eee', borderRadius: '4px', overflow: 'hidden', marginTop: '0.5rem' }}>
            <div className="progress-bar-fill" style={{ width: `${completionPercentage}%`, height: '100%', background: 'var(--ob-primary)' }} />
          </div>
        </div>

        <div className="analytics-card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <span className="card-label" style={{ color: 'gray', fontSize: '0.85rem' }}>Project Health</span>
          <span className={`card-value`} style={{ fontSize: '1.8rem', fontWeight: 'bold', color: healthStatus === 'On Track' ? 'green' : '#d9534f' }}>
            {healthStatus} {healthStatus === 'On Track' ? '🟢' : '🔴'}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'gray' }}>
            {hasActiveDelay ? 'Active developer delay stopwatch running.' : 'No active blockages.'}
          </span>
        </div>

        <div className="analytics-card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <span className="card-label" style={{ color: 'gray', fontSize: '0.85rem' }}>Next Milestone Preview</span>
          <span className="card-value" style={{ fontSize: '1.1rem', fontWeight: 'bold', marginTop: '0.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {nextMilestone ? nextMilestone.title : 'All Milestones Completed!'}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'gray' }}>
            {nextMilestone ? `Target End: ${new Date(nextMilestone.plannedEndDate).toLocaleDateString()}` : 'Project delivery finalized.'}
          </span>
        </div>

      </div>

      {/* ─── Row 2: Timeline Visibility Progress ─── */}
      <div className="detail-header-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem' }}>Timeline Progress</h3>
        
        {/* Visual Timeline Bar */}
        <div style={{ position: 'relative', height: '24px', background: '#e9ecef', borderRadius: '12px', overflow: 'hidden', marginBottom: '1.5rem' }}>
          <div style={{ width: `${progressPct}%`, height: '100%', background: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)', transition: 'width 0.4s ease' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.75rem', fontWeight: 'bold', color: progressPct > 50 ? '#fff' : '#000' }}>
            Today sits at {progressPct}% of overall schedule
          </div>
        </div>

        {/* Milestone Marker Pins */}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'gray', borderBottom: '1px dashed #eee', paddingBottom: '1rem', marginBottom: '1rem' }}>
          <div>
            <strong>Signed Start:</strong>
            <div>{startDate.toLocaleDateString()}</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <strong>Dev Freeze:</strong>
            <div>{freezeDate ? freezeDate.toLocaleDateString() : 'N/A'}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <strong>Support Window End:</strong>
            <div>{supportEndDate ? supportEndDate.toLocaleDateString() : 'N/A'}</div>
          </div>
        </div>

        {/* Plain Language countdown alerts */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ background: '#fcf8e3', borderLeft: '4px solid #f0ad4e', padding: '0.8rem', borderRadius: '4px', fontSize: '0.85rem' }}>
            <strong>⏳ Dev Freeze Countdown</strong>
            <div style={{ marginTop: '0.2rem', color: '#8a6d3b' }}>{getFreezeCountdownText()}</div>
          </div>
          <div style={{ background: '#d9edf7', borderLeft: '4px solid #31708f', padding: '0.8rem', borderRadius: '4px', fontSize: '0.85rem' }}>
            <strong>🛡️ Post-Launch Support</strong>
            <div style={{ marginTop: '0.2rem', color: '#31708f' }}>{getSupportCountdownText()}</div>
          </div>
        </div>

      </div>

      {/* ─── Row 3: Deliverables Access Panel ─── */}
      <div className="detail-header-card" style={{ padding: '1.5rem' }}>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem' }}>Deliverables &amp; Access Consoles</h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          
          {/* Staging link preview */}
          <div style={{ padding: '1rem', border: '1px solid var(--ob-border)', borderRadius: '8px', background: '#fafafa' }}>
            <span style={{ fontSize: '0.75rem', color: 'gray', display: 'block', marginBottom: '0.3rem' }}>STAGING PREVIEWS</span>
            <strong style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Active Build Previews</strong>
            {checkpoints.filter(c => c.stagingLink).length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {checkpoints.filter(c => c.stagingLink).map(c => (
                  <a key={c.id} href={c.stagingLink!} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm" style={{ display: 'inline-block', textDecoration: 'none', textAlign: 'center', fontSize: '0.75rem' }}>
                    🔗 Launch {c.title}
                  </a>
                ))}
              </div>
            ) : (
              <div style={{ fontSize: '0.8rem', color: 'gray' }}>No staging links live yet.</div>
            )}
          </div>

          {/* Packaged build downloads */}
          <div style={{ padding: '1rem', border: '1px solid var(--ob-border)', borderRadius: '8px', background: '#fafafa' }}>
            <span style={{ fontSize: '0.75rem', color: 'gray', display: 'block', marginBottom: '0.3rem' }}>PACKAGED BUILDS</span>
            <strong style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Production Packaged Repository</strong>
            {agreement.packagedBuildUrl ? (
              <a href={agreement.packagedBuildUrl} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm" style={{ textDecoration: 'none', display: 'block', textAlign: 'center', fontSize: '0.75rem' }}>
                📦 Download Packaged Code / Build
              </a>
            ) : (
              <div style={{ fontSize: '0.8rem', color: 'gray' }}>Packaged repository not ready yet.</div>
            )}
            {agreement.deliveryTimestamp && (
              <span style={{ fontSize: '0.7rem', color: 'gray', display: 'block', marginTop: '0.5rem' }}>
                Delivered: {new Date(agreement.deliveryTimestamp).toLocaleString()}
              </span>
            )}
          </div>

          {/* Source/Final files zip */}
          <div style={{ padding: '1rem', border: '1px solid var(--ob-border)', borderRadius: '8px', background: '#fafafa' }}>
            <span style={{ fontSize: '0.75rem', color: 'gray', display: 'block', marginBottom: '0.3rem' }}>FINAL ASSETS &amp; GRAPHICS</span>
            <strong style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Source Assets Folder</strong>
            {agreement.finalFilesUrl ? (
              <a href={agreement.finalFilesUrl} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm" style={{ textDecoration: 'none', display: 'block', textAlign: 'center', fontSize: '0.75rem', borderColor: '#bbb' }}>
                📂 Access Final Files Drive
              </a>
            ) : (
              <div style={{ fontSize: '0.8rem', color: 'gray' }}>Final source files folder not deployed yet.</div>
            )}
          </div>

          {/* Guides / Operations docs */}
          <div style={{ padding: '1rem', border: '1px solid var(--ob-border)', borderRadius: '8px', background: '#fafafa' }}>
            <span style={{ fontSize: '0.75rem', color: 'gray', display: 'block', marginBottom: '0.3rem' }}>ADMIN GUIDES &amp; DOCS</span>
            <strong style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Documentation Manual</strong>
            {agreement.documentationUrl ? (
              <a href={agreement.documentationUrl} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm" style={{ textDecoration: 'none', display: 'block', textAlign: 'center', fontSize: '0.75rem', borderColor: '#bbb' }}>
                📖 Read Project Guides &amp; Wiki
              </a>
            ) : (
              <div style={{ fontSize: '0.8rem', color: 'gray' }}>Documentation wiki not published yet.</div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
