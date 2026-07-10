'use client';

import { useState, useEffect, useRef } from 'react';
import { db, type AppNotification } from '../../db';

interface NotificationBellProps {
  recipient: 'Client' | 'Developer';
  agreementId?: string; // Optional filter for client side
  onJumpToTab: (tab: string) => void;
}

export default function NotificationBell({ recipient, agreementId, onJumpToTab }: NotificationBellProps) {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'payment' | 'ticket' | 'agreement' | 'vault'>('all');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const loadNotifications = () => {
    let all = db.getNotifications().filter(n => n.recipient === recipient);
    if (agreementId) {
      all = all.filter(n => n.agreementId === agreementId);
    }
    setNotifications(all);
  };

  useEffect(() => {
    loadNotifications();

    // Listen to custom notification trigger events for live fast refresh
    window.addEventListener('ob_notification_triggered', loadNotifications);
    
    // Close dropdown on click outside
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('ob_notification_triggered', loadNotifications);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [recipient, agreementId]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleMarkAllRead = () => {
    const all = db.getNotifications();
    const updated = all.map(n => {
      if (n.recipient === recipient && (!agreementId || n.agreementId === agreementId)) {
        return { ...n, isRead: true };
      }
      return n;
    });
    db.saveNotifications(updated);
    loadNotifications();
  };

  const handleToggleRead = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent trigger jump to source
    const all = db.getNotifications();
    const updated = all.map(n => (n.id === id ? { ...n, isRead: !n.isRead } : n));
    db.saveNotifications(updated);
    loadNotifications();
  };

  const handleNotifClick = (notif: AppNotification) => {
    // Mark as read
    const all = db.getNotifications();
    const updated = all.map(n => (n.id === notif.id ? { ...n, isRead: true } : n));
    db.saveNotifications(updated);
    loadNotifications();
    
    setIsOpen(false);
    
    // Jump to tab
    onJumpToTab(notif.jumpToTab);
  };

  // Filter list
  const filteredNotifs = notifications.filter(n => {
    if (filterType === 'all') return true;
    return n.type === filterType;
  });

  return (
    <div style={{ position: 'relative', display: 'inline-block' }} ref={dropdownRef}>
      
      {/* Bell Button Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '1.4rem',
          position: 'relative',
          padding: '0.4rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          transition: 'background 0.2s',
        }}
        className="nav-bell-btn"
      >
        🔔
        {unreadCount > 0 && (
          <span
            style={{
              position: 'absolute',
              top: '2px',
              right: '2px',
              background: '#d9534f',
              color: '#fff',
              borderRadius: '50%',
              padding: '0.1rem 0.35rem',
              fontSize: '0.65rem',
              fontWeight: 'bold',
              lineHeight: 1,
            }}
          >
            {unreadCount}
          </span>
        )}
      </button>

      {/* Popover Dropdown Card */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: '8px',
            width: '360px',
            background: '#fff',
            border: '1px solid #ddd',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '450px',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '0.8rem 1rem',
              borderBottom: '1px solid #eee',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <strong style={{ fontSize: '0.9rem' }}>Notifications Center</strong>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--ob-primary, #0070f3)',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  padding: 0,
                }}
              >
                Mark all read
              </button>
            )}
          </div>

          {/* Filters Row */}
          <div
            style={{
              padding: '0.4rem 0.8rem',
              borderBottom: '1px solid #f5f5f5',
              display: 'flex',
              gap: '0.4rem',
              overflowX: 'auto',
              whiteSpace: 'nowrap',
              fontSize: '0.7rem',
              background: '#fafafa',
            }}
            className="no-scrollbar"
          >
            {(['all', 'payment', 'ticket', 'agreement', 'vault'] as const).map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                style={{
                  padding: '0.2rem 0.5rem',
                  borderRadius: '12px',
                  border: '1px solid',
                  borderColor: filterType === type ? 'var(--ob-primary, #0070f3)' : '#ddd',
                  background: filterType === type ? 'var(--ob-primary, #0070f3)' : '#fff',
                  color: filterType === type ? '#fff' : '#555',
                  cursor: 'pointer',
                  fontSize: '0.7rem',
                  textTransform: 'capitalize',
                }}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Chronological List */}
          <div style={{ overflowY: 'auto', flex: 1 }}>
            {filteredNotifs.length > 0 ? (
              filteredNotifs.map(notif => {
                // Style indicators per tier
                let dotColor = '#999';
                let tierBg = '#fff';
                if (notif.tier === 'Critical') {
                  dotColor = '#d9534f';
                  tierBg = notif.isRead ? '#fff' : '#fdf7f7';
                } else if (notif.tier === 'Action-Required') {
                  dotColor = '#f0ad4e';
                  tierBg = notif.isRead ? '#fff' : '#fefbf5';
                } else if (notif.isRead === false) {
                  tierBg = '#f7faff';
                }

                return (
                  <div
                    key={notif.id}
                    onClick={() => handleNotifClick(notif)}
                    style={{
                      padding: '0.8rem 1rem',
                      borderBottom: '1px solid #f9f9f9',
                      background: tierBg,
                      cursor: 'pointer',
                      display: 'flex',
                      gap: '0.6rem',
                      position: 'relative',
                      transition: 'background 0.2s',
                    }}
                    className="notif-item"
                  >
                    {/* Priority Indicator dot */}
                    <span style={{ color: dotColor, fontSize: '0.8rem', marginTop: '0.1rem' }}>●</span>
                    
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <span style={{ fontWeight: notif.isRead ? 'normal' : 'bold', fontSize: '0.8rem', color: '#333' }}>
                          {notif.title}
                        </span>
                        <span style={{ fontSize: '0.65rem', color: 'gray' }}>
                          {new Date(notif.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      
                      <p style={{ margin: 0, fontSize: '0.78rem', color: '#555', lineHeight: 1.3 }}>
                        {notif.message}
                      </p>

                      {/* Delivery channels & confirmation details */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.3rem', fontSize: '0.65rem', color: 'gray' }}>
                        <span>
                          {notif.channelsSent.length > 0
                            ? `📱 Sent: ${notif.channelsSent.join(' & ')}`
                            : '✉️ Digest mode'}
                        </span>
                        <span style={{ color: notif.deliveryStatus === 'Delivered' ? 'green' : 'red' }}>
                          {notif.deliveryStatus} ✓
                        </span>
                      </div>
                    </div>

                    {/* Mark read toggle icon button */}
                    <button
                      onClick={(e) => handleToggleRead(notif.id, e)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0.2rem',
                        fontSize: '0.75rem',
                        opacity: 0.5,
                        display: 'flex',
                        alignSelf: 'center',
                      }}
                      title={notif.isRead ? "Mark as unread" : "Mark as read"}
                    >
                      {notif.isRead ? '⚪' : '🔵'}
                    </button>
                  </div>
                );
              })
            ) : (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'gray', fontSize: '0.8rem' }}>
                No notifications found.
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
