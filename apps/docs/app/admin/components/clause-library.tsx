'use client';

import { useState } from 'react';
import { db, type Clause } from '../../db';

interface ClauseLibraryProps {
  clauses: Clause[];
  loadDB: () => void;
  triggerToast: (msg: string) => void;
}

export default function ClauseLibrary({ clauses, loadDB, triggerToast }: ClauseLibraryProps) {
  const [clauseTitle, setClauseTitle] = useState('');
  const [clauseContent, setClauseContent] = useState('');
  const [clauseTypes, setClauseTypes] = useState<string[]>(['Simple Static']);
  const [editingClauseId, setEditingClauseId] = useState<string | null>(null);

  const handleSaveClause = () => {
    if (!clauseTitle || !clauseContent) return;
    const allClauses = db.getClauses();

    if (editingClauseId) {
      const updated = allClauses.map(c => 
        c.id === editingClauseId ? { ...c, title: clauseTitle, content: clauseContent, projectTypes: clauseTypes } : c
      );
      db.saveClauses(updated);
      setEditingClauseId(null);
    } else {
      const newClause: Clause = {
        id: 'c-' + Date.now(),
        title: clauseTitle,
        content: clauseContent,
        projectTypes: clauseTypes
      };
      allClauses.push(newClause);
      db.saveClauses(allClauses);
    }

    setClauseTitle('');
    setClauseContent('');
    setClauseTypes(['Simple Static']);
    loadDB();
    triggerToast('Clause saved!');
  };

  const handleEditClause = (c: Clause) => {
    setEditingClauseId(c.id);
    setClauseTitle(c.title);
    setClauseContent(c.content);
    setClauseTypes(c.projectTypes);
  };

  const handleDeleteClause = (id: string) => {
    const allClauses = db.getClauses().filter(c => c.id !== id);
    db.saveClauses(allClauses);
    loadDB();
    triggerToast('Clause deleted.');
  };

  return (
    <div className="client-detail-pane">
      <div className="admin-detail-grid">
        <div className="detail-section-card">
          <h4>Saved Reusable Clauses</h4>
          <div className="client-list" style={{ maxHeight: '400px' }}>
            {clauses.map(c => (
              <div key={c.id} style={{ padding: '0.75rem', background: '#fafbfc', border: '1px solid #eef0f4', borderRadius: '8px', fontSize: '0.8rem', display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <div>
                  <strong>{c.title}</strong>
                  <p style={{ fontSize: '0.74rem', color: 'gray' }}>{c.content}</p>
                </div>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => handleEditClause(c)}>Edit</button>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => handleDeleteClause(c.id)} style={{ color: 'red' }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="detail-section-card">
          <h4>{editingClauseId ? '✏️ Edit Clause' : '➕ Add Clause'}</h4>
          <div className="form-group"><label>Title</label><input type="text" value={clauseTitle} onChange={(e) => setClauseTitle(e.target.value)} /></div>
          <div className="form-group"><label>Content</label><textarea value={clauseContent} onChange={(e) => setClauseContent(e.target.value)} rows={6} /></div>
          <button type="button" className="btn btn-primary" onClick={handleSaveClause}>Save Clause</button>
        </div>
      </div>
    </div>
  );
}
