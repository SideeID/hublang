'use client';

import * as React from 'react';
import {
  IconDashboard,
  IconInnerShadowTop,
  IconListDetails,
} from '@tabler/icons-react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const data = {
  navMain: [
    {
      title: 'Penerimaan',
      url: '/penerimaan',
      icon: IconDashboard,
    },
    {
      title: 'DRD',
      url: '/drd',
      icon: IconListDetails,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = React.useState<{
    name: string;
    email: string;
    avatar: string;
  }>({
    name: '',
    email: '',
    avatar: '/avatars/shadcn.jpg',
  });

  React.useEffect(() => {
    try {
      const stored =
        typeof window !== 'undefined'
          ? localStorage.getItem('hublang_user')
          : null;
      if (stored) {
        const parsed = JSON.parse(stored) as {
          id: number;
          email: string;
          nama?: string;
        };
        const name = parsed.nama || parsed.email || 'User';
        setUser({ name, email: parsed.email, avatar: '/avatars/shadcn.jpg' });
      }
    } catch {
    }
  }, []);

  return (
    <Sidebar collapsible='offcanvas' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className='data-[slot=sidebar-menu-button]:!p-1.5'
            >
              <a href='/dashboard'>
                <IconInnerShadowTop className='!size-5' />
                <span className='text-base font-semibold'>Hublang</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: user.name || 'User',
            email: user.email || '—',
            avatar: user.avatar,
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
