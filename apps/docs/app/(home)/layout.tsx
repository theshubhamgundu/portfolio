import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions, linkItems } from '@/components/layouts/shared';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <HomeLayout
      {...baseOptions()}
      links={linkItems}
      nav={{ enabled: false }}
      className="[--color-fd-primary:var(--color-brand)]"
    >
      {children}
    </HomeLayout>
  );
}
