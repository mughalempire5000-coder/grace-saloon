import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Home,
  Users,
  UsersRound,
  Star,
  Settings,
  Scissors,
  Sparkles,
} from 'lucide-react';

const menuItems = [
  {
    title: 'Home',
    url: '/dashboard',
    icon: Home,
  },
  {
    title: 'Vendors',
    url: '/dashboard/vendors',
    icon: Users,
  },
  {
    title: 'Team',
    url: '/dashboard/team',
    icon: UsersRound,
  },
  {
    title: 'Reviews',
    url: '/dashboard/reviews',
    icon: Star,
  },
  {
    title: 'Settings',
    url: '/dashboard/settings',
    icon: Settings,
  },
];

export function DashboardSidebar() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  const getNavClasses = (path: string) => {
    const active = isActive(path);
    return active
      ? 'bg-primary text-primary-foreground shadow-soft hover:bg-primary-hover'
      : 'hover:bg-accent hover:text-accent-foreground transition-all duration-200';
  };

  return (
    <Sidebar className="transition-all duration-300 w-64 border-r bg-card">
      <SidebarContent>
        {/* Brand Section */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Scissors className="h-8 w-8 text-primary" />
              <Sparkles className="h-3 w-3 text-accent absolute -top-1 -right-1" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-foreground">Saloon</h2>
              <p className="text-xs text-muted-foreground">Marketplace</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <SidebarGroup>
          <SidebarGroupLabel>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === '/dashboard'}
                      className={getNavClasses(item.url)}
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      <span className="ml-3">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}