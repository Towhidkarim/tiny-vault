import React from 'react';

import {
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { routes } from '@/lib/constants';
// import {
//   ChevronsUpDown,
//   Home,
//   Search,
//   Settings,
//   User,
//   ChartNoAxesCombined,
//   Heart,
//   Shield,
// } from 'lucide-react';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import MainLogo from '@/components/main-logo';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import DashboardSidebar from '@/components/layout/dashboard/sidebar';
import DashboardNav from '@/components/layout/dashboard/dashboard-nav';
import { redirect } from 'next/navigation';
import { IconName } from '@/lib/utils';

const items: { title: string; url: string; icon: IconName }[] = [
  {
    title: 'Home',
    url: routes.admin,
    icon: 'Shield',
  },

  {
    title: 'Manage Vaults',
    url: routes.adminManageVaults,
    icon: 'ChartNoAxesGantt',
  },
  {
    title: 'Stats',
    url: routes.adminActivities,
    icon: 'ChartColumnBig',
  },
  {
    title: 'Reviews',
    url: routes.adminReviews,
    icon: 'Star',
  },
  {
    title: 'Mailbox',
    url: routes.adminMailbox,
    icon: 'Mail',
  },
  {
    title: 'Profile',
    url: routes.adminProfile,
    icon: 'User',
  },
  {
    title: 'Settings',
    url: routes.adminSettings,
    icon: 'Settings',
  },
];

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.role !== 'admin') redirect('/');
  return (
    <main>
      <DashboardSidebar
        items={items}
        email={session.user.email}
        userName={session.user.name}
      >
        <DashboardNav />
        {children}
      </DashboardSidebar>
    </main>
  );
}
