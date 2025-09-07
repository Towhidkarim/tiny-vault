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
import {
  ChevronsUpDown,
  Home,
  Search,
  Settings,
  User,
  ChartNoAxesCombined,
  Heart,
} from 'lucide-react';
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
    url: routes.dashboard,
    icon: 'Home',
  },

  {
    title: 'User Stats',
    url: routes.userStats,
    icon: 'ChartNoAxesCombined',
  },
  {
    title: 'Support',
    url: routes.userSupport,
    icon: 'Heart',
  },
  {
    title: 'Settings',
    url: routes.userSettings,
    icon: 'Settings',
  },
];

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect('/');
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
