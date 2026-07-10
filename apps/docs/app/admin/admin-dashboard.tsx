'use client';

import { useState, useEffect } from 'react';
import { db, type Lead, type Clause, type Agreement, type VersionHistory, type Ticket, type TicketLog, type RoadmapPhase, type DemoCheckpoint, type ClientDelay, type ChangeRequest, type QuickNote } from '../db';
import AdminAnalytics from './components/admin-analytics';
import AgreementGenerator from './components/agreement-generator';
import ClauseLibrary from './components/clause-library';
import SignaturesPanel from './components/signatures-panel';
import TicketingHub from './components/ticketing-hub';
import DeliveryManager from './components/delivery-manager';
import OversightDashboard from './components/oversight-dashboard';
import WhiteboardManager from './components/whiteboard-manager';
import NotificationBell from '../onboarding/components/notification-bell';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(false);

  // Tab Manager
  const [activeTab, setActiveTab] = useState<'pipeline' | 'generator' | 'clauses' | 'signatures' | 'tickets' | 'delivery' | 'oversight' | 'whiteboard'>('pipeline');

  // Database states
  const [leads, setLeads] = useState<Lead[]>([]);
  const [clauses, setClauses] = useState<Clause[]>([]);
  const [agreements, setAgreements] = useState<Agreement[]>([]);
  const [versions, setVersions] = useState<VersionHistory[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [ticketLogs, setTicketLogs] = useState<TicketLog[]>([]);
  const [phases, setPhases] = useState<RoadmapPhase[]>([]);
  const [checkpoints, setCheckpoints] = useState<DemoCheckpoint[]>([]);
  const [delays, setDelays] = useState<ClientDelay[]>([]);
  const [changeRequests, setChangeRequests] = useState<ChangeRequest[]>([]);
  const [quickNotes, setQuickNotes] = useState<QuickNote[]>([]);

  // Toast states
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('Console updated!');

  // Check login
  useEffect(() => {
    const session = localStorage.getItem('admin_session');
    if (session === 'active') {
      setIsAuthenticated(true);
      loadDB();
    }
  }, []);

  const loadDB = () => {
    setLeads(db.getLeads());
    setClauses(db.getClauses());
    setAgreements(db.getAgreements());
    setVersions(db.getVersions());
    setTickets(db.getTickets());
    setTicketLogs(db.getTicketLogs());
    setPhases(db.getRoadmap());
    setCheckpoints(db.getCheckpoints());
    setDelays(db.getDelays());
    setChangeRequests(db.getChangeRequests());
    setQuickNotes(db.getQuickNotes());
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correctKey = process.env.NEXT_PUBLIC_ADMIN_ACCESS_KEY || 'shubham29';
    if (password === correctKey) {
      setIsAuthenticated(true);
      setAuthError(false);
      localStorage.setItem('admin_session', 'active');
      loadDB();
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_session');
    setPassword('');
  };

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  // Pipeline Analytics Calculators
  const getPipelineStats = () => {
    const totalLeads = leads.length;
    const signedCount = agreements.filter(a => a.clientSignature && a.adminSignature).length;
    const conversion = totalLeads > 0 ? Math.round((signedCount / totalLeads) * 100) : 0;
    
    let pipelineTotal = 0;
    leads.forEach(l => {
      const match = l.budget.match(/₹([0-9,]+)/);
      if (match) {
        pipelineTotal += parseInt(match[1].replace(/,/g, ''));
      }
    });

    const sources: Record<string, number> = { Organic: 0, LinkedIn: 0, Twitter: 0, Referral: 0, Other: 0 };
    leads.forEach(l => {
      const src = l.referralSource || 'Organic';
      if (sources[src] !== undefined) sources[src]++;
    });

    return { totalLeads, signedCount, conversion, pipelineTotal, sources };
  };

  const stats = getPipelineStats();

  return (
    <div className="admin-app">
      {/* Auth Lock overlay */}
      {!isAuthenticated && (
        <div className="auth-overlay">
          <div className="auth-card">
            <div className="logo-icon">🔒</div>
            <h2>shubsss.dev Console</h2>
            <p>Enter access key to manage onboarding database.</p>
            <form onSubmit={handleLoginSubmit}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Access Key..."
                required
              />
              <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>Verify</button>
            </form>
            {authError && <p className="error-msg">Access denied.</p>}
          </div>
        </div>
      )}

      {/* Main Panel */}
      {isAuthenticated && (
        <div className="app-container">
          
          {/* Sidebar */}
          <aside className="sidebar">
            <div className="sidebar-header-wrapper">
              <div className="brand-header">
                <div className="logo-icon">📊</div>
                <div className="brand-title-group">
                  <span className="brand-title">shubsss.dev</span>
                  <span className="brand-subtitle">Console Hub</span>
                </div>
              </div>
            </div>

            <nav className="step-nav" style={{ padding: '1rem' }}>
              <button className={`nav-item ${activeTab === 'pipeline' ? 'active' : ''}`} onClick={() => setActiveTab('pipeline')}>
                <span className="step-icon-box">📈</span>
                <span className="step-label">Pipeline &amp; Analytics</span>
              </button>
              <button className={`nav-item ${activeTab === 'generator' ? 'active' : ''}`} onClick={() => setActiveTab('generator')}>
                <span className="step-icon-box">📝</span>
                <span className="step-label">Agreement Generator</span>
              </button>
              <button className={`nav-item ${activeTab === 'clauses' ? 'active' : ''}`} onClick={() => setActiveTab('clauses')}>
                <span className="step-icon-box">📚</span>
                <span className="step-label">Clause Library</span>
              </button>
              <button className={`nav-item ${activeTab === 'signatures' ? 'active' : ''}`} onClick={() => setActiveTab('signatures')}>
                <span className="step-icon-box">✍️</span>
                <span className="step-label">Signatures &amp; Lock</span>
              </button>
              <button className={`nav-item ${activeTab === 'tickets' ? 'active' : ''}`} onClick={() => setActiveTab('tickets')}>
                <span className="step-icon-box">🎫</span>
                <span className="step-label">Ticketing Hub</span>
              </button>
              <button className={`nav-item ${activeTab === 'delivery' ? 'active' : ''}`} onClick={() => setActiveTab('delivery')}>
                <span className="step-icon-box">🚚</span>
                <span className="step-label">Delivery Manager</span>
              </button>
              <button className={`nav-item ${activeTab === 'oversight' ? 'active' : ''}`} onClick={() => setActiveTab('oversight')}>
                <span className="step-icon-box">🖥️</span>
                <span className="step-label">Oversight Dashboard</span>
              </button>
              <button className={`nav-item ${activeTab === 'whiteboard' ? 'active' : ''}`} onClick={() => setActiveTab('whiteboard')}>
                <span className="step-icon-box">🎨</span>
                <span className="step-label">Whiteboard Space</span>
              </button>
            </nav>

            <div className="sidebar-footer">
              <button className="btn btn-secondary btn-sm" onClick={handleLogout} style={{ width: '100%' }}>Lock Console</button>
            </div>
          </aside>

          {/* Main Container */}
          <main className="main-content">
            <header className="top-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="step-meta">
                <span className="pill-category">Admin Management</span>
                <h2>{activeTab.toUpperCase()} Console</h2>
              </div>
              <NotificationBell
                recipient="Developer"
                onJumpToTab={(tab) => setActiveTab(tab as any)}
              />
            </header>

            <div className="admin-detail-wrapper">
              {activeTab === 'pipeline' && (
                <AdminAnalytics leads={leads} stats={stats} />
              )}
              {activeTab === 'generator' && (
                <AgreementGenerator leads={leads} clauses={clauses} loadDB={loadDB} triggerToast={triggerToast} />
              )}
              {activeTab === 'clauses' && (
                <ClauseLibrary clauses={clauses} loadDB={loadDB} triggerToast={triggerToast} />
              )}
              {activeTab === 'signatures' && (
                <SignaturesPanel agreements={agreements} versions={versions} triggerToast={triggerToast} />
              )}
              {activeTab === 'tickets' && (
                <TicketingHub agreements={agreements} tickets={tickets} ticketLogs={ticketLogs} loadDB={loadDB} triggerToast={triggerToast} />
              )}
              {activeTab === 'delivery' && (
                <DeliveryManager agreements={agreements} phases={phases} checkpoints={checkpoints} delays={delays} changeRequests={changeRequests} loadDB={loadDB} triggerToast={triggerToast} />
              )}
              {activeTab === 'oversight' && (
                <OversightDashboard leads={leads} agreements={agreements} tickets={tickets} checkpoints={checkpoints} delays={delays} changeRequests={changeRequests} quickNotes={quickNotes} loadDB={loadDB} triggerToast={triggerToast} />
              )}
              {activeTab === 'whiteboard' && (
                <WhiteboardManager agreements={agreements} triggerToast={triggerToast} />
              )}
            </div>
          </main>
        </div>
      )}

      {/* Toast */}
      {showToast && <div className="toast show">{toastMsg}</div>}
    </div>
  );
}
