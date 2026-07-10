'use client';

import { useState, type FormEvent } from 'react';
import { db, type Agreement, type Ticket } from '../../db';

interface SupportTicketsProps {
  agreement: Agreement;
  tickets: Ticket[];
  setTickets: React.Dispatch<React.SetStateAction<Ticket[]>>;
  freezeInfo: { isFrozen: boolean; text: string };
  supportInfo: { status: string; text: string };
  triggerToast: (msg: string) => void;
  onGoToChangeRequests: () => void;
}

export default function SupportTickets({ agreement, tickets, setTickets, freezeInfo, supportInfo, triggerToast, onGoToChangeRequests }: SupportTicketsProps) {
  const [newTicketTitle, setNewTicketTitle] = useState('');
  const [newTicketDesc, setNewTicketDesc] = useState('');
  const [newTicketCategory, setNewTicketCategory] = useState<'Bug' | 'Change Request' | 'Question'>('Bug');
  const [newTicketPriority, setNewTicketPriority] = useState<'Low' | 'Medium' | 'High' | 'Critical'>('Medium');
  const [selectedClauses, setSelectedClauses] = useState<string[]>([]);
  const [reopenReason, setReopenReason] = useState('');
  const [reopeningTicketId, setReopeningTicketId] = useState<string | null>(null);

  const handleCreateTicket = (e: FormEvent) => {
    e.preventDefault();
    if (freezeInfo.isFrozen) return;

    const allTickets = db.getTickets();
    const newTicket: Ticket = {
      id: 't-' + Date.now(),
      agreementId: agreement.id,
      title: newTicketTitle,
      description: newTicketDesc,
      category: newTicketCategory,
      priority: newTicketPriority,
      status: 'To Do',
      isInternalOnly: false,
      scopeStatus: 'Pending Review',
      isBillable: supportInfo.status === 'Expired',
      linkedClauseTitles: selectedClauses,
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
      changedBy: 'Client',
      comment: 'Ticket opened by Client.',
      created_at: new Date().toISOString()
    });
    db.saveTicketLogs(logs);

    setTickets(prev => [...prev, newTicket]);
    
    db.triggerNotification(
      agreement.id,
      'Developer',
      `🎫 New Support Ticket Raised`,
      `Client raised ticket: "${newTicket.title}" (${newTicket.priority})`,
      'ticket',
      'Action-Required',
      'tickets'
    );

    setNewTicketTitle('');
    setNewTicketDesc('');
    setSelectedClauses([]);
    triggerToast('Ticket submitted successfully!');
  };

  const handleReopenTicket = (ticketId: string) => {
    if (!reopenReason) return;
    const allTickets = db.getTickets();
    const updated = allTickets.map(t => {
      if (t.id === ticketId) return { ...t, status: 'To Do' as const };
      return t;
    });
    db.saveTickets(updated);

    const logs = db.getTicketLogs();
    logs.push({
      id: 'log-' + Date.now(),
      ticketId,
      fromStatus: 'Resolved',
      toStatus: 'To Do',
      changedBy: 'Client',
      comment: `Reopened: ${reopenReason}`,
      created_at: new Date().toISOString()
    });
    db.saveTicketLogs(logs);

    setTickets(updated.filter(t => t.agreementId === agreement.id && !t.isInternalOnly));
    
    db.triggerNotification(
      agreement.id,
      'Developer',
      `🎫 Ticket Reopened by Client`,
      `Ticket "${updated.find(t => t.id === ticketId)?.title}" reopened. Reason: ${reopenReason}`,
      'ticket',
      'Action-Required',
      'tickets'
    );

    setReopenReason('');
    setReopeningTicketId(null);
    triggerToast('Ticket reopened.');
  };

  return (
    <div className="client-detail-pane">
      <div style={{ padding: '1rem', background: supportInfo.status === 'Active' ? '#f0fdf4' : '#fef2f2', border: '1px solid', borderColor: supportInfo.status === 'Active' ? '#bbf7d0' : '#fecaca', borderRadius: '8px', color: supportInfo.status === 'Active' ? '#16a34a' : '#dc2626', fontWeight: 'bold', fontSize: '0.85rem' }}>
        <span>⏳ Support: {supportInfo.text}</span>
      </div>

      {freezeInfo.isFrozen && (
        <div style={{ padding: '1rem', background: '#fff8f2', border: '1px solid #fde8e8', borderRadius: '8px', color: 'orange', fontSize: '0.82rem', marginTop: '1rem', fontWeight: 'bold' }}>
          {freezeInfo.text} <br />
          <button type="button" className="btn btn-primary btn-sm" onClick={onGoToChangeRequests} style={{ marginTop: '6px' }}>
            Go to Change Requests Approval Flow ⚡
          </button>
        </div>
      )}

      <div className="admin-detail-grid" style={{ marginTop: '1.5rem' }}>
        
        {/* Raise Ticket Form */}
        <div className="detail-section-card">
          <h4>Raise Support Ticket</h4>
          <form onSubmit={handleCreateTicket}>
            <fieldset disabled={freezeInfo.isFrozen} style={{ border: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div className="form-group">
                <label>Title</label>
                <input type="text" value={newTicketTitle} onChange={(e) => setNewTicketTitle(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea value={newTicketDesc} onChange={(e) => setNewTicketDesc(e.target.value)} required rows={3} />
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label>Category</label>
                  <select value={newTicketCategory} onChange={(e) => setNewTicketCategory(e.target.value as any)}>
                    <option value="Bug">Bug Report</option>
                    <option value="Change Request">Change Request</option>
                    <option value="Question">Question</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Priority</label>
                  <select value={newTicketPriority} onChange={(e) => setNewTicketPriority(e.target.value as any)}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Submit Ticket</button>
            </fieldset>
          </form>
        </div>

        {/* List Tickets */}
        <div className="detail-section-card">
          <h4>Support Queue</h4>
          <div className="client-list" style={{ maxHeight: '350px' }}>
            {tickets.map(t => (
              <div key={t.id} style={{ padding: '0.75rem', background: '#fafbfc', border: '1px solid #eef0f4', borderRadius: '8px', fontSize: '0.8rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong>{t.title}</strong>
                  <span style={{ fontSize: '0.72rem', background: '#eef2ff', padding: '2px 6px', borderRadius: '4px' }}>{t.status}</span>
                </div>
                <p style={{ color: 'gray', marginTop: '2px' }}>{t.description}</p>
                <div style={{ display: 'flex', gap: '8px', fontSize: '0.7rem', color: 'gray', marginTop: '6px' }}>
                  <span>Priority: <strong>{t.priority}</strong></span>
                  <span style={{ color: t.isBillable ? 'red' : 'green' }}><strong>{t.isBillable ? 'Billable' : 'Covered'}</strong></span>
                </div>
                {t.status === 'Resolved' && (
                  <div style={{ marginTop: '4px' }}>
                    {reopeningTicketId === t.id ? (
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <input type="text" value={reopenReason} onChange={(e) => setReopenReason(e.target.value)} placeholder="Reason..." style={{ fontSize: '0.72rem', flex: 1 }} />
                        <button type="button" className="btn btn-primary btn-sm" onClick={() => handleReopenTicket(t.id)}>Submit</button>
                      </div>
                    ) : (
                      <button type="button" className="btn btn-secondary btn-sm" onClick={() => setReopeningTicketId(t.id)}>Reopen</button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
