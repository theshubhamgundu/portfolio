'use client';

import { useState, type FormEvent } from 'react';
import { db, type Agreement, type Ticket, type TicketLog } from '../../db';

interface TicketingHubProps {
  agreements: Agreement[];
  tickets: Ticket[];
  ticketLogs: TicketLog[];
  loadDB: () => void;
  triggerToast: (msg: string) => void;
}

export default function TicketingHub({ agreements, tickets, ticketLogs, loadDB, triggerToast }: TicketingHubProps) {
  const [activeTicketAgreementId, setActiveTicketAgreementId] = useState(agreements[0]?.id || '');
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

  // Form states
  const [internalTaskTitle, setInternalTaskTitle] = useState('');
  const [internalTaskDesc, setInternalTaskDesc] = useState('');
  const [internalTaskCategory, setInternalTaskCategory] = useState<'Bug' | 'Change Request' | 'Question'>('Bug');
  const [internalTaskPriority, setInternalTaskPriority] = useState<'Low' | 'Medium' | 'High' | 'Critical'>('Medium');
  const [internalLinkedClauses, setInternalLinkedClauses] = useState<string[]>([]);
  const [statusComment, setStatusComment] = useState('');
  const [quoteInput, setQuoteInput] = useState('');
  const [overrideReasonInput, setOverrideReasonInput] = useState('');

  const activeTicketAgreement = agreements.find(a => a.id === activeTicketAgreementId);
  const activeAgreementTickets = tickets.filter(t => t.agreementId === activeTicketAgreementId);
  const clientTickets = activeAgreementTickets.filter(t => !t.isInternalOnly);
  const internalTasks = activeAgreementTickets.filter(t => t.isInternalOnly);
  const selectedTicket = tickets.find(t => t.id === selectedTicketId);
  const selectedTicketLogs = ticketLogs.filter(l => l.ticketId === selectedTicketId);

  const handleCreateInternalTask = (e: FormEvent) => {
    e.preventDefault();
    if (!activeTicketAgreementId || !internalTaskTitle || !internalTaskDesc) return;

    const allTickets = db.getTickets();
    const newTask: Ticket = {
      id: 't-' + Date.now(),
      agreementId: activeTicketAgreementId,
      title: internalTaskTitle,
      description: internalTaskDesc,
      category: internalTaskCategory,
      priority: internalTaskPriority,
      status: 'To Do',
      isInternalOnly: true,
      scopeStatus: 'In-Scope',
      isBillable: false,
      linkedClauseTitles: internalLinkedClauses,
      created_at: new Date().toISOString()
    };

    allTickets.push(newTask);
    db.saveTickets(allTickets);

    const logs = db.getTicketLogs();
    logs.push({
      id: 'log-' + Date.now(),
      ticketId: newTask.id,
      fromStatus: 'None',
      toStatus: 'To Do',
      changedBy: 'Developer',
      comment: 'Internal developer checklist item created.',
      created_at: new Date().toISOString()
    });
    db.saveTicketLogs(logs);

    setInternalTaskTitle('');
    setInternalTaskDesc('');
    setInternalLinkedClauses([]);
    loadDB();
    triggerToast('Internal task created.');
  };

  const handleUpdateTicketStatus = (ticketId: string, nextStatus: Ticket['status']) => {
    const allTickets = db.getTickets();
    const ticket = allTickets.find(t => t.id === ticketId);
    if (!ticket) return;

    const prevStatus = ticket.status;
    const updated = allTickets.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          status: nextStatus,
          resolved_at: nextStatus === 'Resolved' ? new Date().toISOString() : undefined
        };
      }
      return t;
    });
    db.saveTickets(updated);

    const logs = db.getTicketLogs();
    logs.push({
      id: 'log-' + Date.now(),
      ticketId,
      fromStatus: prevStatus,
      toStatus: nextStatus,
      changedBy: 'Developer',
      comment: statusComment || `Status transition by Developer.`,
      created_at: new Date().toISOString()
    });
    db.saveTicketLogs(logs);

    if (!ticket.isInternalOnly) {
      db.triggerNotification(
        ticket.agreementId,
        'Client',
        `🎫 Ticket Status Updated: ${nextStatus}`,
        `Your ticket "${ticket.title}" has transitioned from ${prevStatus} to ${nextStatus}.`,
        'ticket',
        'Informational',
        'tickets'
      );
    }

    setStatusComment('');
    loadDB();
    triggerToast(`Ticket status updated to ${nextStatus}.`);
  };

  const handleScopeEvaluation = (ticketId: string, scope: Ticket['scopeStatus']) => {
    const allTickets = db.getTickets();
    const updated = allTickets.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          scopeStatus: scope,
          quotedPrice: scope === 'Out-of-Scope' ? quoteInput || undefined : undefined,
          isBillable: scope === 'Out-of-Scope' ? true : t.isBillable,
          scopeOverrideReason: overrideReasonInput || undefined
        };
      }
      return t;
    });
    db.saveTickets(updated);

    const logs = db.getTicketLogs();
    logs.push({
      id: 'log-' + Date.now(),
      ticketId,
      fromStatus: 'Scope Assessment',
      toStatus: scope,
      changedBy: 'Developer',
      comment: `Scope evaluated as ${scope}. ${overrideReasonInput ? `Override reason: ${overrideReasonInput}` : ''}`,
      created_at: new Date().toISOString()
    });
    db.saveTicketLogs(logs);

    const origTicket = allTickets.find(t => t.id === ticketId);
    if (origTicket && !origTicket.isInternalOnly) {
      db.triggerNotification(
        origTicket.agreementId,
        'Client',
        `🎫 Scope Assessment: ${scope}`,
        scope === 'Out-of-Scope'
          ? `Ticket "${origTicket.title}" was assessed as Out-of-Scope (Quote: ${quoteInput || 'Pending'}).`
          : `Ticket "${origTicket.title}" was assessed as In-Scope (covered under active agreement).`,
        'ticket',
        scope === 'Out-of-Scope' ? 'Action-Required' : 'Informational',
        'tickets'
      );
    }

    setQuoteInput('');
    setOverrideReasonInput('');
    loadDB();
    triggerToast('Scope evaluations recorded.');
  };

  const convertToClientVisible = (ticketId: string) => {
    const allTickets = db.getTickets();
    const updated = allTickets.map(t => {
      if (t.id === ticketId) return { ...t, isInternalOnly: false };
      return t;
    });
    db.saveTickets(updated);

    const logs = db.getTicketLogs();
    logs.push({
      id: 'log-' + Date.now(),
      ticketId,
      fromStatus: 'Internal Only',
      toStatus: 'Client Visible',
      changedBy: 'Developer',
      comment: 'Converted to client-visible ticket.',
      created_at: new Date().toISOString()
    });
    db.saveTicketLogs(logs);

    loadDB();
    triggerToast('Task is now client-visible.');
  };

  return (
    <div className="client-detail-pane">
      <div className="detail-header-card" style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
          <strong>Active Agreement:</strong>
          <select value={activeTicketAgreementId} onChange={(e) => setActiveTicketAgreementId(e.target.value)}>
            {agreements.map(a => (
              <option key={a.id} value={a.id}>{a.brandName} — {a.title} ({a.projectType})</option>
            ))}
          </select>
        </div>
      </div>

      <div className="admin-detail-grid" style={{ marginTop: '1.5rem' }}>
        <div className="detail-section-card">
          <h4>🎫 Client Tickets ({clientTickets.length})</h4>
          <div className="client-list" style={{ maxHeight: '220px' }}>
            {clientTickets.map(t => (
              <button key={t.id} className={`client-item ${selectedTicketId === t.id ? 'active' : ''}`} onClick={() => setSelectedTicketId(t.id)} style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong>{t.title}</strong>
                  <span>{t.status}</span>
                </div>
              </button>
            ))}
          </div>

          <h4 style={{ marginTop: '1.5rem' }}>🛠️ Internal Developer Checklist ({internalTasks.length})</h4>
          <div className="client-list" style={{ maxHeight: '220px' }}>
            {internalTasks.map(t => (
              <button key={t.id} className={`client-item ${selectedTicketId === t.id ? 'active' : ''}`} onClick={() => setSelectedTicketId(t.id)} style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong>{t.title}</strong>
                  <span>{t.status}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="detail-section-card">
          {selectedTicket ? (
            <div>
              <h3>{selectedTicket.title}</h3>
              <p>{selectedTicket.description}</p>
              <div style={{ marginTop: '1rem' }}>
                <label>Transition Status</label>
                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '4px' }}>
                  {(['To Do', 'In Progress', 'Blocked', 'In Review', 'Resolved'] as const).map(st => (
                    <button key={st} className="btn btn-secondary btn-sm" disabled={selectedTicket.status === st} onClick={() => handleUpdateTicketStatus(selectedTicket.id, st)}>{st}</button>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: '1rem', borderTop: '1px dashed #e2e5ea', paddingTop: '0.75rem' }}>
                <label>Scope Evaluation &amp; Out-of-Scope Quote</label>
                <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
                  <button className="btn btn-secondary btn-sm" onClick={() => handleScopeEvaluation(selectedTicket.id, 'In-Scope')}>Mark In-Scope</button>
                  <button className="btn btn-secondary btn-sm" onClick={() => handleScopeEvaluation(selectedTicket.id, 'Out-of-Scope')}>Mark Out-of-Scope</button>
                </div>
                <input type="text" value={quoteInput} onChange={(e) => setQuoteInput(e.target.value)} placeholder="Quote fee (e.g. ₹1,500)" style={{ width: '100%', fontSize: '0.75rem', marginTop: '6px', padding: '4px' }} />
                <input type="text" value={overrideReasonInput} onChange={(e) => setOverrideReasonInput(e.target.value)} placeholder="Override reason..." style={{ width: '100%', fontSize: '0.75rem', marginTop: '6px', padding: '4px' }} />
              </div>

              {selectedTicket.isInternalOnly && (
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => convertToClientVisible(selectedTicket.id)} style={{ marginTop: '10px' }}>
                  🌐 Convert to Client-Visible
                </button>
              )}
            </div>
          ) : (
            <form onSubmit={handleCreateInternalTask}>
              <h4>➕ Create Internal Developer Task</h4>
              <div className="form-group"><label>Title</label><input type="text" value={internalTaskTitle} onChange={(e) => setInternalTaskTitle(e.target.value)} required /></div>
              <div className="form-group"><label>Description</label><textarea value={internalTaskDesc} onChange={(e) => setInternalTaskDesc(e.target.value)} required rows={3} /></div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>Save Internal Task</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
