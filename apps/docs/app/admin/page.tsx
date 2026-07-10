import type { Metadata } from 'next';
import './admin.css';
import AdminDashboard from './admin-dashboard';

export const metadata: Metadata = {
  title: 'Admin Console — shubsss.dev',
  description: 'Manage onboarding briefs and project configuration requests securely.',
};

export default function AdminPage() {
  return <AdminDashboard />;
}
