'use client';

// ─── Interfaces ───
export interface Lead {
  id: string;
  clientName: string;
  clientRole: string;
  clientEmail: string;
  clientPhone: string;
  brandName: string;
  projectType: string;
  scopeDescription: string;
  budget: string;
  timeline: string;
  referralSource: string;
  status: 'new' | 'agreement_draft' | 'agreement_published' | 'signed' | 'locked';
  created_at: string;
}

export interface Clause {
  id: string;
  title: string;
  content: string;
  projectTypes: string[]; // e.g. ["Simple Static", "E-commerce", "SaaS", "Storytelling", "Partnership"]
}

export interface PaymentMilestone {
  milestone: string;
  amount: string;
  status: 'Pending' | 'Paid';
}

export interface Agreement {
  id: string;
  leadId: string;
  title: string;
  clientName: string;
  brandName: string;
  projectType: string;
  price: string;
  currency: string;
  taxRate: string;
  paymentMode: string;
  upiId: string;
  paymentSchedule: PaymentMilestone[];
  clauses: { title: string; content: string }[];
  clientSignature: string; // Base64 image
  clientSignedAt: string;
  clientIp: string;
  clientDevice: string;
  adminSignature: string; // Base64 image
  adminSignedAt: string;
  isLocked: boolean;
  version: number;
  devFreezeDate?: string;     // ISO String (end of development phase)
  supportStartDate?: string; // ISO String (start of post-launch support window)
  supportEndDate?: string;   // ISO String (end of post-launch support window)
  isWhiteboardCollabEnabled?: boolean;
  packagedBuildUrl?: string;
  finalFilesUrl?: string;
  documentationUrl?: string;
  deliveryTimestamp?: string;
  created_at: string;
}

export interface VersionHistory {
  id: string;
  agreementId: string;
  version: number;
  content: string; // Full text brief
  changeSummary: string;
  author: string;
  created_at: string;
}

export interface Ticket {
  id: string;
  agreementId: string;
  title: string;
  description: string;
  category: 'Bug' | 'Change Request' | 'Question';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'To Do' | 'In Progress' | 'Blocked' | 'In Review' | 'Resolved';
  isInternalOnly: boolean;
  scopeStatus: 'In-Scope' | 'Out-of-Scope' | 'Pending Review';
  scopeOverrideReason?: string;
  quotedPrice?: string;
  isBillable: boolean;
  linkedClauseTitles: string[];
  created_at: string;
  resolved_at?: string;
}

export interface TicketLog {
  id: string;
  ticketId: string;
  fromStatus: string;
  toStatus: string;
  changedBy: 'Client' | 'Developer';
  comment: string;
  created_at: string;
}

// ─── Module 4 Project Management Models ───

export interface RoadmapPhase {
  id: string;
  agreementId: string;
  title: string;
  plannedStartDate: string;
  plannedEndDate: string;
  actualEndDate: string | null;
  status: 'Pending' | 'In Progress' | 'Completed';
}

export interface DemoCheckpoint {
  id: string;
  agreementId: string;
  title: string;
  deliveredAt: string | null;
  stagingLink: string | null;
  confirmedAt: string | null;
}

export interface ClientDelay {
  id: string;
  agreementId: string;
  category: 'missing_credentials' | 'no_response' | 'slow_approval' | 'missing_assets';
  phaseId: string;
  description: string;
  startedAt: string;
  resolvedAt: string | null;
  isClientVisible: boolean;
}

export interface ChangeRequest {
  id: string;
  agreementId: string;
  description: string;
  initiatedBy: 'Client' | 'Developer';
  quotedPrice: string;
  timelineImpactDays: number;
  status: 'Pending Review' | 'Approved' | 'Rejected' | 'Quoted';
  created_at: string;
}

export interface QuickNote {
  id: string;
  agreementId: string;
  content: string;
  isPinned: boolean;
  created_at: string;
}

export interface AppNotification {
  id: string;
  agreementId: string;
  recipient: 'Client' | 'Developer';
  title: string;
  message: string;
  type: 'payment' | 'ticket' | 'agreement' | 'vault';
  tier: 'Informational' | 'Action-Required' | 'Critical';
  channelsSent: ('Email' | 'WhatsApp')[];
  deliveryStatus: 'Delivered' | 'Failed';
  isRead: boolean;
  jumpToTab: string;
  created_at: string;
}

// ─── Preloaded Mock Data ───
const MOCK_SIGNATURE = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="40"><path d="M 10 30 Q 30 10 50 30 T 90 10" fill="none" stroke="blue" stroke-width="2"/></svg>';

const DEFAULT_CLAUSES: Clause[] = [
  {
    id: 'c-1',
    title: 'Project Timeline & Delay Policy',
    content: 'Estimated delivery is within 10–15 business days from receipt of advance payment and all required content from the Client.',
    projectTypes: ['Simple Static', 'E-commerce', 'SaaS', 'Storytelling']
  },
  {
    id: 'c-2',
    title: 'Client Responsibilities & Assets',
    content: 'The Client shall supply all required content, text, high-res images, and product details within 5 business days of signing.',
    projectTypes: ['Simple Static', 'E-commerce', 'SaaS', 'Storytelling']
  },
  {
    id: 'c-3',
    title: 'Post-Launch Support & Exclusions',
    content: 'Developer provides 7 calendar days of post-launch support for bug fixes only. Support covers unintended errors or broken functionality.',
    projectTypes: ['Simple Static', 'E-commerce', 'SaaS', 'Storytelling']
  }
];

const DEFAULT_LEADS: Lead[] = [
  { id: 'lead-1', clientName: 'Suseela', clientRole: 'Owner', clientEmail: 'suseela@nutricrunch.com', clientPhone: '+91 90303 12267', brandName: 'Lil Leena\'s Nutricrunch', projectType: 'E-commerce Shop', scopeDescription: 'Healthy snack food landing page.', budget: '₹3,000 - ₹5,000', timeline: '10-15 business days', referralSource: 'Organic', status: 'locked', created_at: new Date(Date.now() - 3 * 86400000).toISOString() },
  { id: 'lead-2', clientName: 'Challa Hari Krishna', clientRole: 'Founder', clientEmail: 'harikrishna@siyantra.com', clientPhone: '+91 86988 46796', brandName: 'Siyantra AI Solutions', projectType: 'Storytelling', scopeDescription: 'White-label web portals.', budget: '₹10,000 - ₹15,000', timeline: '2 weeks', referralSource: 'Referral', status: 'locked', created_at: new Date(Date.now() - 86400000).toISOString() }
];

const DEFAULT_AGREEMENTS: Agreement[] = [
  {
    id: 'ag-1',
    leadId: 'lead-1',
    title: 'Website Development Service Agreement',
    clientName: 'Suseela',
    brandName: 'Lil Leena\'s Nutricrunch',
    projectType: 'E-commerce Shop',
    price: '3000',
    currency: '₹',
    taxRate: '0',
    paymentMode: 'UPI',
    upiId: '8698846796@axl',
    paymentSchedule: [{ milestone: 'Advance', amount: '1500', status: 'Paid' }, { milestone: 'Delivery', amount: '1500', status: 'Pending' }],
    clauses: [{ title: 'Timeline', content: 'Timeline spec...' }, { title: 'Support', content: 'Support spec...' }],
    clientSignature: MOCK_SIGNATURE,
    clientSignedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    clientIp: '192.168.1.101',
    clientDevice: 'Chrome Desktop',
    adminSignature: MOCK_SIGNATURE,
    adminSignedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    isLocked: true,
    version: 1,
    // Freeze countdown tests (freeze is in 2 days from now)
    devFreezeDate: new Date(Date.now() + 2 * 86400000).toISOString(),
    supportStartDate: new Date('2026-07-10T00:00:00Z').toISOString(),
    supportEndDate: new Date('2026-07-17T23:59:59Z').toISOString(),
    isWhiteboardCollabEnabled: true,
    packagedBuildUrl: 'https://github.com/shubsss/nutricrunch/releases/tag/v1.0.0-rc1',
    finalFilesUrl: 'https://drive.google.com/drive/folders/nutricrunch-assets',
    documentationUrl: '/docs/guides/nutricrunch-admin',
    deliveryTimestamp: new Date(Date.now() - 3600000).toISOString(),
    created_at: new Date(Date.now() - 3 * 86400000).toISOString()
  },
  {
    id: 'ag-2',
    leadId: 'lead-2',
    title: 'Freelance Project Agreement',
    clientName: 'Challa Hari Krishna',
    brandName: 'Siyantra AI Solutions',
    projectType: 'Storytelling',
    price: '10000',
    currency: '₹',
    taxRate: '18',
    paymentMode: 'Bank Transfer',
    upiId: '',
    paymentSchedule: [{ milestone: 'Advance', amount: '5000', status: 'Paid' }, { milestone: 'Delivery', amount: '5000', status: 'Paid' }],
    clauses: [{ title: 'Timeline', content: 'Timeline spec...' }, { title: 'Support', content: 'Support spec...' }],
    clientSignature: MOCK_SIGNATURE,
    clientSignedAt: new Date(Date.now() - 15 * 86400000).toISOString(),
    clientIp: '192.168.1.102',
    clientDevice: 'Safari Desktop',
    adminSignature: MOCK_SIGNATURE,
    adminSignedAt: new Date(Date.now() - 15 * 86400000).toISOString(),
    isLocked: true,
    version: 1,
    // Expired Dev Freeze & Support Window
    devFreezeDate: new Date('2026-06-20T00:00:00Z').toISOString(),
    supportStartDate: new Date('2026-06-21T00:00:00Z').toISOString(),
    supportEndDate: new Date('2026-06-28T23:59:59Z').toISOString(),
    isWhiteboardCollabEnabled: false,
    packagedBuildUrl: 'https://github.com/shubsss/siyantra/releases/tag/v2.1.0',
    finalFilesUrl: 'https://drive.google.com/drive/folders/siyantra-source-zip',
    documentationUrl: '/docs/guides/siyantra-ops',
    deliveryTimestamp: new Date('2026-06-20T17:30:00Z').toISOString(),
    created_at: new Date(Date.now() - 16 * 86400000).toISOString()
  }
];

const DEFAULT_TICKETS: Ticket[] = [
  { id: 't-1', agreementId: 'ag-1', title: 'WhatsApp widget overlap issue', description: 'Overlaps mobile buttons.', category: 'Bug', priority: 'High', status: 'In Progress', isInternalOnly: false, scopeStatus: 'In-Scope', isBillable: false, linkedClauseTitles: [], created_at: new Date().toISOString() },
  { id: 't-2', agreementId: 'ag-2', title: 'Add search box details', description: 'New feature request.', category: 'Change Request', priority: 'Medium', status: 'To Do', isInternalOnly: false, scopeStatus: 'Pending Review', isBillable: true, linkedClauseTitles: [], created_at: new Date().toISOString() }
];

const DEFAULT_PHASES: RoadmapPhase[] = [
  { id: 'ph-1', agreementId: 'ag-1', title: 'Phase 1: Database & Supabase Integration', plannedStartDate: new Date(Date.now() - 2 * 86400000).toISOString(), plannedEndDate: new Date(Date.now() - 86400000).toISOString(), actualEndDate: new Date(Date.now() - 86400000).toISOString(), status: 'Completed' },
  { id: 'ph-2', agreementId: 'ag-1', title: 'Phase 2: Checkout Cart Integration', plannedStartDate: new Date(Date.now() - 86400000).toISOString(), plannedEndDate: new Date(Date.now() + 86400000).toISOString(), actualEndDate: null, status: 'In Progress' },
  { id: 'ph-3', agreementId: 'ag-2', title: 'Phase 1: Landing Page Design', plannedStartDate: new Date('2026-06-01T00:00:00Z').toISOString(), plannedEndDate: new Date('2026-06-10T00:00:00Z').toISOString(), actualEndDate: new Date('2026-06-10T00:00:00Z').toISOString(), status: 'Completed' }
];

const DEFAULT_DEMOS: DemoCheckpoint[] = [
  { id: 'd-1', agreementId: 'ag-1', title: 'Checkpoint 1: Database setup live', deliveredAt: new Date(Date.now() - 86400000).toISOString(), stagingLink: 'https://staging1.shubsss.dev', confirmedAt: new Date(Date.now() - 86400000).toISOString() },
  { id: 'd-2', agreementId: 'ag-1', title: 'Checkpoint 2: Stripe checkout checkout functional', deliveredAt: new Date().toISOString(), stagingLink: 'https://staging-cart.shubsss.dev', confirmedAt: null }
];

const DEFAULT_DELAYS: ClientDelay[] = [
  { id: 'dl-1', agreementId: 'ag-1', category: 'missing_credentials', phaseId: 'ph-2', description: 'Waiting for Stripe API Live keys.', startedAt: new Date(Date.now() - 12 * 3600000).toISOString(), resolvedAt: null, isClientVisible: true }
];

const DEFAULT_CHANGES: ChangeRequest[] = [
  { id: 'cr-1', agreementId: 'ag-1', description: 'Add dark mode toggle on checkout pages.', initiatedBy: 'Client', quotedPrice: '₹1,500', timelineImpactDays: 1, status: 'Pending Review', created_at: new Date().toISOString() }
];

const DEFAULT_NOTES: QuickNote[] = [
  { id: 'n-1', agreementId: 'ag-1', content: 'Client requested Sage Green color theme variant for shop landing cards.', isPinned: true, created_at: new Date(Date.now() - 3600000).toISOString() },
  { id: 'n-2', agreementId: 'ag-2', content: 'Call Harry on Monday regarding CRM setup parameters.', isPinned: false, created_at: new Date(Date.now() - 7200000).toISOString() }
];

const DEFAULT_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    agreementId: 'ag-1',
    recipient: 'Client',
    title: '⚠️ Dev Freeze Approaching',
    message: 'Development freeze is in 2 days. Please lock in any pending scope changes.',
    type: 'agreement',
    tier: 'Critical',
    channelsSent: ['Email', 'WhatsApp'],
    deliveryStatus: 'Delivered',
    isRead: false,
    jumpToTab: 'overview',
    created_at: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: 'notif-2',
    agreementId: 'ag-1',
    recipient: 'Client',
    title: '💳 Payment Milestone Due',
    message: 'Milestone "Delivery" (₹1,500) is pending project handover.',
    type: 'payment',
    tier: 'Critical',
    channelsSent: ['Email', 'WhatsApp'],
    deliveryStatus: 'Delivered',
    isRead: false,
    jumpToTab: 'vault',
    created_at: new Date(Date.now() - 7200000).toISOString()
  },
  {
    id: 'notif-3',
    agreementId: 'ag-1',
    recipient: 'Developer',
    title: '🎫 New Client Support Ticket',
    message: 'Suseela raised ticket "WhatsApp widget overlap issue".',
    type: 'ticket',
    tier: 'Action-Required',
    channelsSent: ['Email'],
    deliveryStatus: 'Delivered',
    isRead: false,
    jumpToTab: 'tickets',
    created_at: new Date(Date.now() - 1800000).toISOString()
  }
];

// ─── Database Sync Helpers ───
export const db = {
  getLeads: (): Lead[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem('ob_leads');
    if (!data) {
      localStorage.setItem('ob_leads', JSON.stringify(DEFAULT_LEADS));
      return DEFAULT_LEADS;
    }
    return JSON.parse(data);
  },
  saveLeads: (leads: Lead[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('ob_leads', JSON.stringify(leads));
  },
  getClauses: (): Clause[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem('ob_clauses');
    if (!data) {
      localStorage.setItem('ob_clauses', JSON.stringify(DEFAULT_CLAUSES));
      return DEFAULT_CLAUSES;
    }
    return JSON.parse(data);
  },
  saveClauses: (clauses: Clause[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('ob_clauses', JSON.stringify(clauses));
  },
  getAgreements: (): Agreement[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem('ob_agreements');
    if (!data) {
      localStorage.setItem('ob_agreements', JSON.stringify(DEFAULT_AGREEMENTS));
      return DEFAULT_AGREEMENTS;
    }
    return JSON.parse(data);
  },
  saveAgreements: (agreements: Agreement[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('ob_agreements', JSON.stringify(agreements));
  },
  getVersions: (): VersionHistory[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem('ob_versions');
    return data ? JSON.parse(data) : [];
  },
  saveVersions: (versions: VersionHistory[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('ob_versions', JSON.stringify(versions));
  },
  getTickets: (): Ticket[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem('ob_tickets');
    if (!data) {
      localStorage.setItem('ob_tickets', JSON.stringify(DEFAULT_TICKETS));
      return DEFAULT_TICKETS;
    }
    return JSON.parse(data);
  },
  saveTickets: (tickets: Ticket[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('ob_tickets', JSON.stringify(tickets));
  },
  getTicketLogs: (): TicketLog[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem('ob_ticket_logs');
    return data ? JSON.parse(data) : [];
  },
  saveTicketLogs: (logs: TicketLog[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('ob_ticket_logs', JSON.stringify(logs));
  },

  // Roadmap CRUD
  getRoadmap: (): RoadmapPhase[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem('ob_roadmap');
    if (!data) {
      localStorage.setItem('ob_roadmap', JSON.stringify(DEFAULT_PHASES));
      return DEFAULT_PHASES;
    }
    return JSON.parse(data);
  },
  saveRoadmap: (phases: RoadmapPhase[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('ob_roadmap', JSON.stringify(phases));
  },

  // Checkpoints CRUD
  getCheckpoints: (): DemoCheckpoint[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem('ob_checkpoints');
    if (!data) {
      localStorage.setItem('ob_checkpoints', JSON.stringify(DEFAULT_DEMOS));
      return DEFAULT_DEMOS;
    }
    return JSON.parse(data);
  },
  saveCheckpoints: (checkpoints: DemoCheckpoint[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('ob_checkpoints', JSON.stringify(checkpoints));
  },

  // Delays CRUD
  getDelays: (): ClientDelay[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem('ob_delays');
    if (!data) {
      localStorage.setItem('ob_delays', JSON.stringify(DEFAULT_DELAYS));
      return DEFAULT_DELAYS;
    }
    return JSON.parse(data);
  },
  saveDelays: (delays: ClientDelay[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('ob_delays', JSON.stringify(delays));
  },

  // Change Requests CRUD
  getChangeRequests: (): ChangeRequest[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem('ob_changes');
    if (!data) {
      localStorage.setItem('ob_changes', JSON.stringify(DEFAULT_CHANGES));
      return DEFAULT_CHANGES;
    }
    return JSON.parse(data);
  },
  saveChangeRequests: (changes: ChangeRequest[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('ob_changes', JSON.stringify(changes));
  },

  // Quick Notes CRUD
  getQuickNotes: (): QuickNote[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem('ob_notes');
    if (!data) {
      localStorage.setItem('ob_notes', JSON.stringify(DEFAULT_NOTES));
      return DEFAULT_NOTES;
    }
    return JSON.parse(data);
  },
  saveQuickNotes: (notes: QuickNote[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('ob_notes', JSON.stringify(notes));
  },

  // Notifications CRUD
  getNotifications: (): AppNotification[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem('ob_notifications');
    if (!data) {
      localStorage.setItem('ob_notifications', JSON.stringify(DEFAULT_NOTIFICATIONS));
      return DEFAULT_NOTIFICATIONS;
    }
    return JSON.parse(data);
  },
  saveNotifications: (notifications: AppNotification[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('ob_notifications', JSON.stringify(notifications));
  },
  triggerNotification: (
    agreementId: string,
    recipient: 'Client' | 'Developer',
    title: string,
    message: string,
    type: 'payment' | 'ticket' | 'agreement' | 'vault',
    tier: 'Informational' | 'Action-Required' | 'Critical',
    jumpToTab: string
  ) => {
    if (typeof window === 'undefined') return;
    const all = db.getNotifications();
    
    const channelsSent: ('Email' | 'WhatsApp')[] = [];
    if (tier === 'Critical') {
      channelsSent.push('Email', 'WhatsApp');
    } else if (tier === 'Action-Required') {
      channelsSent.push('Email');
    }

    const newNotif: AppNotification = {
      id: 'notif-' + Date.now(),
      agreementId,
      recipient,
      title,
      message,
      type,
      tier,
      channelsSent,
      deliveryStatus: 'Delivered',
      isRead: false,
      jumpToTab,
      created_at: new Date().toISOString()
    };

    all.unshift(newNotif);
    db.saveNotifications(all);
    
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('ob_notification_triggered'));
    }
  }
};
