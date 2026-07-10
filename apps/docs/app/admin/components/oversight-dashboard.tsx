'use client';

import { useState, useEffect, type FormEvent } from 'react';
import { db, type Lead, type Agreement, type Ticket, type TicketLog, type RoadmapPhase, type DemoCheckpoint, type ClientDelay, type ChangeRequest, type QuickNote } from '../../db';

interface OversightDashboardProps {
  leads: Lead[];
  agreements: Agreement[];
  tickets: Ticket[];
  checkpoints: DemoCheckpoint[];
  delays: ClientDelay[];
  changeRequests: ChangeRequest[];
  quickNotes: QuickNote[];
  loadDB: () => void;
  triggerToast: (msg: string) => void;
}

type PipelineStage = 'Lead Captured' | 'Discussed' | 'Agreement Sent' | 'Signed' | 'Active Development' | 'Post-Launch Support' | 'Completed';

const PIPELINE_STAGES: PipelineStage[] = [
  'Lead Captured',
  'Discussed',
  'Agreement Sent',
  'Signed',
  'Active Development',
  'Post-Launch Support',
  'Completed'
];

export default function OversightDashboard({ leads, agreements, tickets, checkpoints, delays, changeRequests, quickNotes, loadDB, triggerToast }: OversightDashboardProps) {
  // Tab controller for oversight dashboard sub-views
  const [oversightTab, setOversightTab] = useState<'pipeline' | 'blockers' | 'calendar' | 'tickets' | 'timeline' | 'notes'>('pipeline');
  
  // Cross-Client Ticket Board filters
  const [ticketProjectFilter, setTicketProjectFilter] = useState<string>('all');
  
  // Timeline Filter & Search
  const [timelineProjectFilter, setTimelineProjectFilter] = useState<string>('all');
  const [timelineSearch, setTimelineSearch] = useState('');

  // Quick Notes per client
  const [noteProjectFilter, setNoteProjectFilter] = useState<string>(agreements[0]?.id || '');
  const [newNoteContent, setNewNoteContent] = useState('');

  // Unified stage mapper
  const getLeadStage = (lead: Lead): PipelineStage => {
    if (lead.status === 'new') return 'Lead Captured';
    if (lead.status === 'agreement_draft') return 'Discussed';
    if (lead.status === 'agreement_published') return 'Agreement Sent';
    if (lead.status === 'signed') return 'Signed';
    
    // Look up associated agreement for locked states
    const ag = agreements.find(a => a.leadId === lead.id);
    if (!ag) return 'Lead Captured';

    if (ag.isLocked) {
      const now = new Date().getTime();
      const freeze = ag.devFreezeDate ? new Date(ag.devFreezeDate).getTime() : 0;
      const supportEnd = ag.supportEndDate ? new Date(ag.supportEndDate).getTime() : 0;

      if (now < freeze) return 'Active Development';
      if (now < supportEnd) return 'Post-Launch Support';
      return 'Completed';
    }

    return 'Lead Captured';
  };

  const handleUpdateLeadStage = (leadId: string, newStage: PipelineStage) => {
    const allLeads = db.getLeads();
    const updated = allLeads.map(l => {
      if (l.id === leadId) {
        let status: Lead['status'] = 'new';
        if (newStage === 'Lead Captured') status = 'new';
        else if (newStage === 'Discussed') status = 'agreement_draft';
        else if (newStage === 'Agreement Sent') status = 'agreement_published';
        else if (newStage === 'Signed') status = 'signed';
        else status = 'locked';

        return { ...l, status };
      }
      return l;
    });

    db.saveLeads(updated);
    loadDB();
    triggerToast('Lead pipeline stage updated.');
  };

  // ─── Active Blockers stopwatch resolver ───
  const activeBlockers = delays
    .filter(d => !d.resolvedAt)
    .map(d => {
      const start = new Date(d.startedAt).getTime();
      const now = new Date().getTime(); // Simulated is 10 July 2026
      const durationHours = Math.ceil((now - start) / 3600000);
      return { ...d, durationHours };
    })
    .sort((a, b) => b.durationHours - a.durationHours);

  const handleResolveBlocker = (blockerId: string) => {
    const allDelays = db.getDelays();
    const updated = allDelays.map(d => {
      if (d.id === blockerId) return { ...d, resolvedAt: new Date().toISOString() };
      return d;
    });
    db.saveDelays(updated);
    loadDB();
    triggerToast('Active blocker resolved successfully.');
  };

  // ─── Calendar Conflict Aggregator ───
  const getCalendarEvents = () => {
    const events: Array<{ date: string; type: string; title: string; clientName: string; color: string }> = [];

    agreements.forEach(ag => {
      const clientColor = ag.id === 'ag-1' ? '#2563eb' : '#9333ea'; // Blue vs Purple
      
      // Dev Freeze
      if (ag.devFreezeDate) {
        events.push({
          date: new Date(ag.devFreezeDate).toDateString(),
          type: 'Freeze Deadline',
          title: `Dev Freeze: ${ag.brandName}`,
          clientName: ag.clientName,
          color: clientColor
        });
      }
      // Support End
      if (ag.supportEndDate) {
        events.push({
          date: new Date(ag.supportEndDate).toDateString(),
          type: 'Support Close',
          title: `Support Ends: ${ag.brandName}`,
          clientName: ag.clientName,
          color: clientColor
        });
      }

      // Payment schedule
      ag.paymentSchedule.forEach(m => {
        events.push({
          date: new Date(ag.created_at).toDateString(), // Mock due date based on created date
          type: 'Payment Due',
          title: `${m.milestone} due: ${ag.currency}${m.amount} (${m.status})`,
          clientName: ag.clientName,
          color: clientColor
        });
      });
    });

    // Checkpoint deliveries
    checkpoints.forEach(cp => {
      const ag = agreements.find(a => a.id === cp.agreementId);
      const clientColor = cp.agreementId === 'ag-1' ? '#2563eb' : '#9333ea';
      events.push({
        date: cp.deliveredAt ? new Date(cp.deliveredAt).toDateString() : new Date().toDateString(),
        type: 'Demo Checkpoint',
        title: `${cp.title} (${cp.confirmedAt ? 'Confirmed' : 'Pending Client Confirmation'})`,
        clientName: ag?.clientName || 'Client',
        color: clientColor
      });
    });

    return events;
  };

  const calendarEvents = getCalendarEvents();
  
  // Group events by date
  const eventsByDate: Record<string, typeof calendarEvents> = {};
  calendarEvents.forEach(ev => {
    if (!eventsByDate[ev.date]) eventsByDate[ev.date] = [];
    eventsByDate[ev.date].push(ev);
  });

  // ─── Cross-Client Ticket board ───
  const openCrossTickets = tickets.filter(t => t.status !== 'Resolved');
  const filteredCrossTickets = ticketProjectFilter === 'all'
    ? openCrossTickets
    : openCrossTickets.filter(t => t.agreementId === ticketProjectFilter);

  // Group by Kanban status columns
  const ticketColumns: Record<Ticket['status'], Ticket[]> = {
    'To Do': [],
    'In Progress': [],
    'Blocked': [],
    'In Review': [],
    'Resolved': [] // We filtered out Resolved from openCrossTickets, but type checks need it
  };

  filteredCrossTickets.forEach(t => {
    if (ticketColumns[t.status]) {
      ticketColumns[t.status].push(t);
    }
  });

  // Sort columns by priority (Critical -> High -> Medium -> Low)
  const priorityOrder = { 'Critical': 0, 'High': 1, 'Medium': 2, 'Low': 3 };
  Object.keys(ticketColumns).forEach(col => {
    const key = col as Ticket['status'];
    ticketColumns[key].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  });

  // ─── timeline Feed builder ───
  const getTimelineFeed = () => {
    const items: Array<{ id: string; agreementId: string; date: string; type: string; title: string; content: string; icon: string }> = [];

    // Agreements Signature logging
    agreements.forEach(ag => {
      if (ag.clientSignedAt) {
        items.push({
          id: 'sig-' + ag.id,
          agreementId: ag.id,
          date: ag.clientSignedAt,
          type: 'Signature',
          title: `Contract Signed by ${ag.clientName}`,
          content: `IP Address: ${ag.clientIp} | Device: ${ag.clientDevice}`,
          icon: '✍️'
        });
      }
    });

    // Support Tickets
    tickets.forEach(t => {
      items.push({
        id: 'tick-' + t.id,
        agreementId: t.agreementId,
        date: t.created_at,
        type: 'Ticket Open',
        title: `Ticket Raised: "${t.title}"`,
        content: `Priority: ${t.priority} | Category: ${t.category} | Scope: ${t.scopeStatus}`,
        icon: '🎫'
      });
    });

    // Delays Blocker stopwatch events
    delays.forEach(d => {
      items.push({
        id: 'delay-' + d.id,
        agreementId: d.agreementId,
        date: d.startedAt,
        type: 'Delay Blocker',
        title: `Client blocker clock started: ${d.category.replace('_', ' ').toUpperCase()}`,
        content: d.description,
        icon: '⏳'
      });

      if (d.resolvedAt) {
        items.push({
          id: 'delay-resolve-' + d.id,
          agreementId: d.agreementId,
          date: d.resolvedAt,
          type: 'Delay Resolve',
          title: `Client blocker resolved`,
          content: `Stopped blocker stopwatch for ${d.description}`,
          icon: '✓'
        });
      }
    });

    // Change Requests
    changeRequests.forEach(cr => {
      items.push({
        id: 'cr-' + cr.id,
        agreementId: cr.agreementId,
        date: cr.created_at,
        type: 'Change Request',
        title: `Change Request initiated by ${cr.initiatedBy}`,
        content: `${cr.description} | Quote: ${cr.quotedPrice} | Status: ${cr.status}`,
        icon: '⚡'
      });
    });

    return items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const rawTimeline = getTimelineFeed();
  const filteredTimeline = rawTimeline.filter(item => {
    const matchProject = timelineProjectFilter === 'all' || item.agreementId === timelineProjectFilter;
    const matchSearch = item.title.toLowerCase().includes(timelineSearch.toLowerCase()) || item.content.toLowerCase().includes(timelineSearch.toLowerCase());
    return matchProject && matchSearch;
  });

  // ─── Quick Notes controller ───
  const activeClientNotes = quickNotes.filter(n => n.agreementId === noteProjectFilter);
  const pinnedNotes = activeClientNotes.filter(n => n.isPinned);
  const unpinnedNotes = activeClientNotes.filter(n => !n.isPinned);

  const handleSaveNote = (e: FormEvent) => {
    e.preventDefault();
    if (!noteProjectFilter || !newNoteContent) return;

    const allNotes = db.getQuickNotes();
    const newNote: QuickNote = {
      id: 'n-' + Date.now(),
      agreementId: noteProjectFilter,
      content: newNoteContent,
      isPinned: false,
      created_at: new Date().toISOString()
    };

    allNotes.unshift(newNote);
    db.saveQuickNotes(allNotes);
    setNewNoteContent('');
    loadDB();
    triggerToast('Quick note saved.');
  };

  const handleTogglePinNote = (noteId: string) => {
    const allNotes = db.getQuickNotes();
    const updated = allNotes.map(n => {
      if (n.id === noteId) return { ...n, isPinned: !n.isPinned };
      return n;
    });
    db.saveQuickNotes(updated);
    loadDB();
    triggerToast('Note pin status toggled.');
  };

  const handleDeleteNote = (noteId: string) => {
    const allNotes = db.getQuickNotes().filter(n => n.id !== noteId);
    db.saveQuickNotes(allNotes);
    loadDB();
    triggerToast('Note deleted.');
  };

  const handleConvertToTicket = (note: QuickNote) => {
    if (!noteProjectFilter) return;

    const allTickets = db.getTickets();
    const newTicket: Ticket = {
      id: 't-' + Date.now(),
      agreementId: noteProjectFilter,
      title: note.content.slice(0, 45) + (note.content.length > 45 ? '...' : ''),
      description: note.content,
      category: 'Change Request',
      priority: 'Medium',
      status: 'To Do',
      isInternalOnly: true,
      scopeStatus: 'Pending Review',
      isBillable: false,
      linkedClauseTitles: [],
      created_at: new Date().toISOString()
    };

    allTickets.push(newTicket);
    db.saveTickets(allTickets);

    const logs = db.getTicketLogs();
    logs.push({
      id: 'log-' + Date.now(),
      ticketId: newTicket.id,
      fromStatus: 'None',
      toStatus: 'To Do',
      changedBy: 'Developer',
      comment: 'Converted from Quick Note context.',
      created_at: new Date().toISOString()
    });
    db.saveTicketLogs(logs);

    // Delete the note after conversion
    const allNotes = db.getQuickNotes().filter(n => n.id !== note.id);
    db.saveQuickNotes(allNotes);

    loadDB();
    triggerToast('Note converted to developer ticket!');
  };

  return (
    <div className="client-detail-pane">
      
      {/* Sub tabs navigation */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--adm-border)', paddingBottom: '0.75rem', marginBottom: '1.25rem', overflowX: 'auto' }}>
        <button className={`btn ${oversightTab === 'pipeline' ? 'btn-primary' : 'btn-secondary'} btn-sm`} onClick={() => setOversightTab('pipeline')}>Unified Pipeline</button>
        <button className={`btn ${oversightTab === 'blockers' ? 'btn-primary' : 'btn-secondary'} btn-sm`} onClick={() => setOversightTab('blockers')}>Active Blockers ({activeBlockers.length})</button>
        <button className={`btn ${oversightTab === 'calendar' ? 'btn-primary' : 'btn-secondary'} btn-sm`} onClick={() => setOversightTab('calendar')}>Workload Calendar</button>
        <button className={`btn ${oversightTab === 'tickets' ? 'btn-primary' : 'btn-secondary'} btn-sm`} onClick={() => setOversightTab('tickets')}>Cross-Client Tickets</button>
        <button className={`btn ${oversightTab === 'timeline' ? 'btn-primary' : 'btn-secondary'} btn-sm`} onClick={() => setOversightTab('timeline')}>Timeline Feed</button>
        <button className={`btn ${oversightTab === 'notes' ? 'btn-primary' : 'btn-secondary'} btn-sm`} onClick={() => setOversightTab('notes')}>Quick Notes</button>
      </div>

      {/* ═══ SUB TAB 1: UNIFIED PIPELINE ═══ */}
      {oversightTab === 'pipeline' && (
        <div style={{ overflowX: 'auto' }}>
          <div style={{ display: 'flex', gap: '1rem', minWidth: '1100px' }}>
            {PIPELINE_STAGES.map(stage => {
              const stageLeads = leads.filter(l => getLeadStage(l) === stage);
              return (
                <div key={stage} style={{ flex: 1, minWidth: '150px', background: 'var(--adm-surface-2)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--adm-border)' }}>
                  <h5 style={{ fontSize: '0.78rem', fontWeight: 'bold', color: 'var(--adm-text-secondary)', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                    {stage} ({stageLeads.length})
                  </h5>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {stageLeads.map(lead => (
                      <div key={lead.id} style={{ background: '#fff', padding: '0.5rem', borderRadius: '6px', border: '1px solid #e2e5ea', fontSize: '0.76rem' }}>
                        <strong>{lead.clientName}</strong>
                        <div style={{ color: 'gray', fontSize: '0.7rem' }}>{lead.brandName}</div>
                        <div style={{ color: 'var(--adm-accent)', fontSize: '0.7rem', marginTop: '2px' }}>{lead.projectType}</div>
                        
                        <div style={{ marginTop: '6px' }}>
                          <select
                            value={stage}
                            onChange={(e) => handleUpdateLeadStage(lead.id, e.target.value as PipelineStage)}
                            style={{ fontSize: '0.66rem', padding: '2px', border: '1px solid #ccd1d9', borderRadius: '4px', width: '100%' }}
                          >
                            {PIPELINE_STAGES.map(st => (
                              <option key={st} value={st}>{st}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ═══ SUB TAB 2: ACTIVE BLOCKERS ═══ */}
      {oversightTab === 'blockers' && (
        <div>
          <h4>⚠️ Consolidated Active Blockers</h4>
          {activeBlockers.length > 0 ? (
            <div className="client-list" style={{ marginTop: '1rem' }}>
              {activeBlockers.map(blocker => {
                const ag = agreements.find(a => a.id === blocker.agreementId);
                return (
                  <div key={blocker.id} style={{ padding: '1rem', background: '#fafbfc', border: '1px solid #eef0f4', borderRadius: '8px', fontSize: '0.8rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <div>
                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        <strong style={{ fontSize: '0.86rem' }}>{ag?.brandName || 'Client'}</strong>
                        <span style={{ fontSize: '0.68rem', background: '#fee2e2', color: '#dc2626', padding: '2px 6px', borderRadius: '4px' }}>
                          {blocker.category.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      <p style={{ marginTop: '4px', color: 'gray' }}>{blocker.description}</p>
                      <div style={{ fontSize: '0.7rem', color: 'red', marginTop: '2px' }}>
                        🕒 Open for {blocker.durationHours} hours
                      </div>
                    </div>
                    <button type="button" className="btn btn-primary btn-sm" onClick={() => handleResolveBlocker(blocker.id)}>
                      ✓ Resolve Blocker
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <p style={{ color: 'gray', marginTop: '1rem' }}>No active blockers logged across projects. Everything is green!</p>
          )}
        </div>
      )}

      {/* ═══ SUB TAB 3: WORKLOAD CALENDAR ═══ */}
      {oversightTab === 'calendar' && (
        <div>
          <h4>📅 Workload Deadlines Calendar</h4>
          <div className="admin-detail-grid" style={{ marginTop: '1rem' }}>
            {Object.entries(eventsByDate).map(([dateStr, items]) => {
              const isConflict = items.length > 1;
              return (
                <div key={dateStr} style={{ padding: '0.75rem', background: isConflict ? '#fffbeb' : '#fafbfc', border: '1px solid', borderColor: isConflict ? '#fde68a' : '#eef0f4', borderRadius: '8px', fontSize: '0.8rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed #ccd1d9', paddingBottom: '4px', marginBottom: '6px' }}>
                    <strong>{dateStr}</strong>
                    {isConflict && (
                      <span style={{ fontSize: '0.68rem', background: '#dc2626', color: '#fff', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>
                        ⚠️ Workload Conflict ({items.length} deadlines)
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {items.map((ev, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: ev.color }} />
                        <span><strong>[{ev.type}]</strong> {ev.title} (client: {ev.clientName})</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ═══ SUB TAB 4: CROSS-CLIENT TICKETS ═══ */}
      {oversightTab === 'tickets' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h4>🎫 Cross-Client Ticket Board</h4>
            <select value={ticketProjectFilter} onChange={(e) => setTicketProjectFilter(e.target.value)} style={{ padding: '0.4rem', borderRadius: '6px', border: '1px solid var(--adm-border)' }}>
              <option value="all">All Projects</option>
              {agreements.map(a => (
                <option key={a.id} value={a.id}>{a.brandName}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
            {(['To Do', 'In Progress', 'Blocked', 'In Review'] as const).map(col => {
              const colTickets = ticketColumns[col] || [];
              return (
                <div key={col} style={{ background: 'var(--adm-surface-2)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--adm-border)' }}>
                  <h5 style={{ fontSize: '0.78rem', textTransform: 'uppercase', marginBottom: '0.75rem', color: 'gray' }}>{col} ({colTickets.length})</h5>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {colTickets.map(t => {
                      const ag = agreements.find(a => a.id === t.agreementId);
                      return (
                        <div key={t.id} style={{ background: '#fff', padding: '0.6rem', borderRadius: '6px', border: '1px solid #e2e5ea', fontSize: '0.76rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <strong>{t.title}</strong>
                            <span style={{ fontSize: '0.66rem', color: t.priority === 'Critical' ? 'red' : 'orange' }}>{t.priority}</span>
                          </div>
                          <div style={{ color: 'gray', fontSize: '0.7rem', marginTop: '2px' }}>Project: {ag?.brandName}</div>
                          
                          <div style={{ display: 'flex', gap: '4px', marginTop: '6px' }}>
                            <span style={{ fontSize: '0.62rem', background: '#eff6ff', color: '#2563eb', padding: '1px 4px', borderRadius: '2px' }}>{t.scopeStatus}</span>
                            <span style={{ fontSize: '0.62rem', background: t.isBillable ? '#fef2f2' : '#f0fdf4', color: t.isBillable ? '#dc2626' : '#16a34a', padding: '1px 4px', borderRadius: '2px' }}>
                              {t.isBillable ? '💸 Billable' : '✓ Covered'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ═══ SUB TAB 5: TIMELINE FEED ═══ */}
      {oversightTab === 'timeline' && (
        <div>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem' }}>
            <input
              type="text"
              value={timelineSearch}
              onChange={(e) => setTimelineSearch(e.target.value)}
              placeholder="Search timeline events..."
              style={{ flex: 1, padding: '0.4rem', border: '1px solid var(--adm-border)', borderRadius: '6px' }}
            />
            <select value={timelineProjectFilter} onChange={(e) => setTimelineProjectFilter(e.target.value)} style={{ padding: '0.4rem', borderRadius: '6px', border: '1px solid var(--adm-border)' }}>
              <option value="all">All Projects</option>
              {agreements.map(a => (
                <option key={a.id} value={a.id}>{a.brandName}</option>
              ))}
            </select>
          </div>

          <div className="client-list" style={{ maxHeight: '400px' }}>
            {filteredTimeline.map((item, idx) => {
              const ag = agreements.find(a => a.id === item.agreementId);
              return (
                <div key={idx} style={{ display: 'flex', gap: '1rem', padding: '0.75rem', borderBottom: '1px solid #eef0f4', fontSize: '0.8rem' }}>
                  <div style={{ fontSize: '1.25rem' }}>{item.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <strong>{item.title}</strong>
                      <span style={{ fontSize: '0.72rem', color: 'gray' }}>{new Date(item.date).toLocaleString()}</span>
                    </div>
                    <p style={{ color: 'var(--adm-text-secondary)', marginTop: '2px' }}>{item.content}</p>
                    <span style={{ fontSize: '0.68rem', color: 'var(--adm-accent)' }}>Brand: {ag?.brandName}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ═══ SUB TAB 6: QUICK NOTES ═══ */}
      {oversightTab === 'notes' && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid var(--adm-border)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
            <strong>Select Client Notes:</strong>
            <select value={noteProjectFilter} onChange={(e) => setNoteProjectFilter(e.target.value)}>
              {agreements.map(a => (
                <option key={a.id} value={a.id}>{a.brandName}</option>
              ))}
            </select>
          </div>

          <div className="admin-detail-grid">
            
            {/* Create note */}
            <div className="detail-section-card">
              <h4>Create Note</h4>
              <form onSubmit={handleSaveNote} style={{ marginTop: '0.75rem' }}>
                <textarea
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  placeholder="Type informal note context (e.g. client requested specific header colors)..."
                  rows={4}
                  required
                />
                <button type="submit" className="btn btn-primary btn-sm" style={{ width: '100%', marginTop: '8px' }}>Save Note</button>
              </form>
            </div>

            {/* List notes */}
            <div className="detail-section-card">
              <h4>Saved Client Notes</h4>
              
              {/* Pinned Section */}
              {pinnedNotes.length > 0 && (
                <div style={{ marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.72rem', color: 'gray', fontWeight: 'bold' }}>📌 PINNED NOTES</span>
                  {pinnedNotes.map(note => (
                    <div key={note.id} style={{ padding: '0.5rem', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '6px', fontSize: '0.78rem', marginTop: '4px' }}>
                      <p>{note.content}</p>
                      <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
                        <button type="button" className="btn btn-secondary btn-sm" onClick={() => handleTogglePinNote(note.id)} style={{ padding: '1px 6px', fontSize: '0.66rem' }}>Unpin</button>
                        <button type="button" className="btn btn-secondary btn-sm" onClick={() => handleConvertToTicket(note)} style={{ padding: '1px 6px', fontSize: '0.66rem' }}>⚡ Convert to Ticket</button>
                        <button type="button" className="btn btn-secondary btn-sm" onClick={() => handleDeleteNote(note.id)} style={{ padding: '1px 6px', fontSize: '0.66rem', color: 'red' }}>Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Unpinned Section */}
              <div>
                <span style={{ fontSize: '0.72rem', color: 'gray', fontWeight: 'bold' }}>ALL NOTES</span>
                {unpinnedNotes.map(note => (
                  <div key={note.id} style={{ padding: '0.5rem', background: '#fafbfc', border: '1px solid #eef0f4', borderRadius: '6px', fontSize: '0.78rem', marginTop: '4px' }}>
                    <p>{note.content}</p>
                    <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
                      <button type="button" className="btn btn-secondary btn-sm" onClick={() => handleTogglePinNote(note.id)} style={{ padding: '1px 6px', fontSize: '0.66rem' }}>Pin</button>
                      <button type="button" className="btn btn-secondary btn-sm" onClick={() => handleConvertToTicket(note)} style={{ padding: '1px 6px', fontSize: '0.66rem' }}>⚡ Convert to Ticket</button>
                      <button type="button" className="btn btn-secondary btn-sm" onClick={() => handleDeleteNote(note.id)} style={{ padding: '1px 6px', fontSize: '0.66rem', color: 'red' }}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
