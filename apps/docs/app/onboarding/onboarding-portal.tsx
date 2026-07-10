'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { db, type Lead, type Agreement, type Ticket, type RoadmapPhase, type DemoCheckpoint, type ClientDelay, type ChangeRequest, type VersionHistory } from '../db';
import IntakeForm from './components/intake-form';
import ContractSignature from './components/contract-signature';
import SupportTickets from './components/support-tickets';
import DeliveryRoadmap from './components/delivery-roadmap';
import ClientDashboardOverview from './components/client-dashboard-overview';
import ClientVaultPayments from './components/client-vault-payments';
import NotificationBell from './components/notification-bell';

export default function OnboardingPortal() {
  const [showSplash, setShowSplash] = useState(true);
  const [appVisible, setAppVisible] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  
  // Dashboard & Tab states
  const [agreementToSign, setAgreementToSign] = useState<Agreement | null>(null);
  const [portalTab, setPortalTab] = useState<'agreement' | 'overview' | 'vault' | 'tickets' | 'whiteboard'>('agreement');
  
  // Delivery & Ticketing States
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [phases, setPhases] = useState<RoadmapPhase[]>([]);
  const [checkpoints, setCheckpoints] = useState<DemoCheckpoint[]>([]);
  const [delays, setDelays] = useState<ClientDelay[]>([]);
  const [changeRequests, setChangeRequests] = useState<ChangeRequest[]>([]);
  const [versions, setVersions] = useState<VersionHistory[]>([]);

  // Load context
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const leadId = params.get('leadId');
      const email = params.get('email');
      
      if (leadId || email) {
        const agreements = db.getAgreements();
        const activeAg = agreements.find(
          a => a.leadId === leadId || a.clientName.toLowerCase() === email?.toLowerCase()
        );
        if (activeAg) {
          setAgreementToSign(activeAg);
          setShowSplash(false);
          setAppVisible(true);
          
          if (activeAg.clientSignature) {
            setPortalTab('overview');
          }

          // Fetch Delivery Modules Data
          setTickets(db.getTickets().filter(t => t.agreementId === activeAg.id && !t.isInternalOnly));
          setPhases(db.getRoadmap().filter(p => p.agreementId === activeAg.id));
          setCheckpoints(db.getCheckpoints().filter(c => c.agreementId === activeAg.id));
          setDelays(db.getDelays().filter(d => d.agreementId === activeAg.id && d.isClientVisible));
          setChangeRequests(db.getChangeRequests().filter(cr => cr.agreementId === activeAg.id));
          setVersions(db.getVersions());
        }
      }
    }
  }, []);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  // Development Freeze Countdown and Banners
  const getFreezeCountdown = () => {
    if (!agreementToSign || !agreementToSign.devFreezeDate) return { status: 'Inactive', text: '', isFrozen: false, showAlert: false, alertLevel: '' };
    
    const end = new Date(agreementToSign.devFreezeDate).getTime();
    const now = new Date().getTime(); // Simulated current time is 10 July 2026
    const diff = end - now;

    if (diff <= 0) {
      return {
        status: 'Frozen',
        text: 'Development Freeze Active! No further feature requests can be added to the queue.',
        isFrozen: true,
        showAlert: true,
        alertLevel: 'danger'
      };
    }

    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    
    let showAlert = false;
    let alertLevel = '';
    let text = `Development Freeze: ${days} days remaining.`;

    if (days <= 1) {
      showAlert = true;
      alertLevel = 'danger';
      text = `🚨 Freeze Alert: Less than 24 hours left! Lock in final features now.`;
    } else if (days <= 2) {
      showAlert = true;
      alertLevel = 'warning';
      text = `⚠️ Freeze Alert: 2 Days remaining before code freeze!`;
    } else if (days <= 5) {
      showAlert = true;
      alertLevel = 'info';
      text = `⚠️ Freeze Alert: 5 Days remaining before code freeze.`;
    }

    return { status: 'Active', text, isFrozen: false, showAlert, alertLevel, days };
  };

  const freezeInfo = getFreezeCountdown();

  // Support Window Countdown
  const getSupportCountdown = () => {
    if (!agreementToSign || !agreementToSign.supportEndDate) return { status: 'Inactive', text: 'No support window configured.' };
    
    const end = new Date(agreementToSign.supportEndDate).getTime();
    const now = new Date().getTime();
    const diff = end - now;

    if (diff <= 0) {
      return { status: 'Expired', text: `Support window expired on ${new Date(agreementToSign.supportEndDate).toLocaleDateString()}` };
    }
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return { status: 'Active', text: `Support window active. Ends in ${days} days.` };
  };

  const supportInfo = getSupportCountdown();

  const handleIntakeSuccess = () => {
    setShowSuccess(true);
  };

  return (
    <div className="onboarding-app">
      {/* Splash Screen */}
      <div className={`splash-screen ${showSplash ? '' : 'hidden'}`}>
        <div className="splash-content">
          <h1 className="splash-title">
            <span>Welcome to</span><br />
            <span className="gradient-text">shubsss.dev</span><br />
            <span>Onboarding Portal</span>
          </h1>
          <p className="splash-subtitle">Configure your website parameters, layouts, and feature checklists.</p>
          <button type="button" className="btn btn-primary btn-lg" onClick={() => { setShowSplash(false); setAppVisible(true); }}>
            Get Started
          </button>
        </div>
      </div>

      {/* App Space */}
      <div className={`app-container ${appVisible ? 'visible' : ''}`}>
        
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-header-wrapper">
            <div className="brand-header">
              <div className="logo-icon">✨</div>
              <div className="brand-title-group">
                <span className="brand-title">shubsss.dev</span>
                <span className="brand-subtitle">{agreementToSign ? 'Portal Client' : 'Onboard Workspace'}</span>
              </div>
            </div>
          </div>

          <nav className="step-nav" style={{ padding: '1rem' }}>
            {agreementToSign ? (
              <>
                <button className={`nav-item ${portalTab === 'agreement' ? 'active' : ''}`} onClick={() => setPortalTab('agreement')}>
                  <span className="step-icon-box">📄</span>
                  <span className="step-label">Agreement Specifications</span>
                </button>
                {agreementToSign.isLocked && (
                  <>
                    <button className={`nav-item ${portalTab === 'overview' ? 'active' : ''}`} onClick={() => setPortalTab('overview')}>
                      <span className="step-icon-box">📊</span>
                      <span className="step-label">Overview &amp; Deliverables</span>
                    </button>
                    <button className={`nav-item ${portalTab === 'vault' ? 'active' : ''}`} onClick={() => setPortalTab('vault')}>
                      <span className="step-icon-box">🏦</span>
                      <span className="step-label">Vault &amp; Invoices</span>
                    </button>
                    <button className={`nav-item ${portalTab === 'tickets' ? 'active' : ''}`} onClick={() => setPortalTab('tickets')}>
                      <span className="step-icon-box">🎫</span>
                      <span className="step-label">Support Tickets</span>
                    </button>
                    {agreementToSign.isWhiteboardCollabEnabled && (
                      <button className={`nav-item ${portalTab === 'whiteboard' ? 'active' : ''}`} onClick={() => setPortalTab('whiteboard')}>
                        <span className="step-icon-box">🎨</span>
                        <span className="step-label">Whiteboard</span>
                      </button>
                    )}
                  </>
                )}
              </>
            ) : (
              <button className="nav-item active">
                <span className="step-icon-box">📝</span>
                <span className="step-label">Business Intake</span>
              </button>
            )}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <header className="top-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="step-meta">
              <span className="pill-category">{agreementToSign ? 'Contract Space' : 'Client Onboarding'}</span>
              <h2>{agreementToSign ? (portalTab === 'agreement' ? 'Agreement Brief' : portalTab === 'overview' ? 'Dashboard Overview' : portalTab === 'vault' ? 'Documents & Payments' : portalTab === 'tickets' ? 'Support Tickets' : 'Whiteboard Workspace') : 'Onboarding Setup'}</h2>
            </div>
            {agreementToSign && (
              <NotificationBell
                recipient="Client"
                agreementId={agreementToSign.id}
                onJumpToTab={(tab) => setPortalTab(tab as any)}
              />
            )}
          </header>

          <div className="form-wrapper">
            {agreementToSign ? (
              <>
                {portalTab === 'agreement' && (
                  <ContractSignature agreement={agreementToSign} triggerToast={triggerToast} />
                )}
                {portalTab === 'overview' && (
                  <ClientDashboardOverview
                    agreement={agreementToSign}
                    phases={phases}
                    checkpoints={checkpoints}
                    delays={delays}
                  />
                )}
                {portalTab === 'vault' && (
                  <ClientVaultPayments
                    agreement={agreementToSign}
                    versions={versions}
                    triggerToast={triggerToast}
                  />
                )}
                {portalTab === 'tickets' && (
                  <SupportTickets
                    agreement={agreementToSign}
                    tickets={tickets}
                    setTickets={setTickets}
                    freezeInfo={freezeInfo}
                    supportInfo={supportInfo}
                    triggerToast={triggerToast}
                    onGoToChangeRequests={() => setPortalTab('overview')}
                  />
                )}
                {portalTab === 'whiteboard' && agreementToSign.isWhiteboardCollabEnabled && (
                  <div className="client-detail-pane" style={{ height: 'calc(100vh - 160px)', background: '#fff', borderRadius: '12px', padding: '1rem', border: '1px solid var(--ob-border)' }}>
                    <iframe
                      src={`/whiteboard/index.html?projectId=${agreementToSign.id}`}
                      style={{ width: '100%', height: '100%', border: 'none', borderRadius: '8px' }}
                    />
                  </div>
                )}
              </>
            ) : (
              <IntakeForm onSuccess={handleIntakeSuccess} triggerToast={triggerToast} />
            )}
          </div>
        </main>
      </div>

      {/* Success Modal */}
      <div className={`success-screen ${showSuccess ? '' : 'hidden'}`}>
        <div className="success-content">
          <h2>Submission Successful! ✨</h2>
          <button type="button" className="btn btn-primary" onClick={() => setShowSuccess(false)}>Close</button>
        </div>
      </div>

      {/* Toast */}
      {showToast && <div className="toast show">{toastMsg}</div>}
    </div>
  );
}
