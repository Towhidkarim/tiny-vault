'use client';
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
  ChartNoAxesCombined,
  ChevronsUpDown,
  Heart,
  Home,
  Search,
  Settings,
  User,
} from 'lucide-react';
import MainLogo from '@/components/main-logo';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useSession } from '@/lib/auth-client';
import { Skeleton } from '@/components/ui/skeleton';
import { usePathname } from 'next/navigation';
import { getLucideIcon, IconName } from '@/lib/utils';

export default function DashboardSidebar({
  children,
  userName,
  email,
  items,
}: {
  userName: string;
  email: string;
  children: React.ReactNode;
  items: { title: string; url: string; icon: IconName }[];
}) {
  //   return <main>{children}</main>;
  const pathName = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>
              <MainLogo />
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className='my-10'>
                {items.map((item) => {
                  const Icon = getLucideIcon(item.icon);
                  return (
                    <SidebarMenuItem key={item.title} className=''>
                      <SidebarMenuButton asChild tooltip={item.title}>
                        <Button
                          variant={
                            pathName.endsWith(item.url) ? 'default' : 'ghost'
                          }
                          asChild
                          className='hover:bg-primary/60 my-2 hover:text-background text-left transition'
                        >
                          <Link
                            href={item.url}
                            className='flex flex-row justify-start'
                          >
                            <Icon />
                            <span>{item.title}</span>
                          </Link>
                        </Button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className='w-[15rem]'>
          <SidebarGroup>
            <SidebarMenuButton className='justify-between gap-3 h-12'>
              <div className='flex items-center gap-2'>
                <User className='rounded-md w-5 h-5' />
                <div className='flex flex-col items-start'>
                  <span className='font-medium text-sm'>{userName}</span>
                  <span className='text-muted-foreground text-xs'>{email}</span>
                </div>
              </div>
              <ChevronsUpDown className='rounded-md w-5 h-5' />
            </SidebarMenuButton>
          </SidebarGroup>
        </SidebarFooter>
      </Sidebar>

      <main className='flex-1 md:ml-[15rem]'>
        <div className='top-0 left-3 sticky bg-background px-4 py-2'>
          <SidebarTrigger className='md:hidden block top-3 left-3 z-30 mt-2 w-4 h-4' />
        </div>
        <div className='p-6 w-full'>
          {/* <h1 className="font-bold text-2xl">Main Content</h1>
          <p className="mt-2">This is the main content area of the page.</p> */}
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
