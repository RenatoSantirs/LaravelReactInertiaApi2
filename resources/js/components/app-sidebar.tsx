import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, ShoppingCart, TvIcon } from 'lucide-react';
import AppLogo from './app-logo';

interface User {
  id: number;
  name: string;
  email: string;
  roles: string[];
}

export function AppSidebar() {
  // 👇 Obtener datos de usuario desde Inertia
  const page = usePage<{ auth: { user: User } }>();
  const { auth } = page.props;
  
  // 👇 Chequear si el usuario es admin
  // const isAdmin = auth?.user?.roles?.includes('admin');

  // Chequear roles
  const roles = auth?.user?.roles || [];
  const isAdminOrGerente = roles.includes('admin') || roles.includes('gerente');

  const mainNavItems: NavItem[] = [
    {
      title: 'Dashboard',
      href: dashboard(),
      icon: LayoutGrid,
    },
    {
      title: 'Contactos',
      href: '/contacts',
      icon: Folder,
    },
    {
      title: 'Productos',
      href: '/products',
      icon: ShoppingCart,
    },
    {
      title: 'Alimentos',
      href: '/foods',
      icon: ShoppingCart,
    },

    {
      title: 'Streams',
      href: '/streams',
      icon: TvIcon,
    },

    // 👇 Solo agregar Usuarios si es admin
    ...(isAdminOrGerente
      ? [
          {
            title: 'Usuarios',
            href: '/users',
            icon: Folder,
          },
        ]
      : []),
  ];

  const footerNavItems: NavItem[] = [
    {
      title: 'Repository',
      href: 'https://github.com/laravel/react-starter-kit',
      icon: Folder,
    },
    {
      title: 'Documentation',
      href: 'https://laravel.com/docs/starter-kits#react',
      icon: BookOpen,
    },
  ];

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={dashboard()} prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={mainNavItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavFooter items={footerNavItems} className="mt-auto" />
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}

// NORMAL SIN CAMBIAR ROL
// import { NavFooter } from '@/components/nav-footer';
// import { NavMain } from '@/components/nav-main';
// import { NavUser } from '@/components/nav-user';
// import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
// import { dashboard } from '@/routes';
// import { type NavItem } from '@/types';
// import { Link } from '@inertiajs/react';
// import { BookOpen, Folder, LayoutGrid } from 'lucide-react';
// import AppLogo from './app-logo';

// const mainNavItems: NavItem[] = [
//     {
//         title: 'Dashboard',
//         href: dashboard(),
//         icon: LayoutGrid,
//     },
//     {
//         title: 'Contactos',
//         href: '/contacts',
//         icon: Folder
//     },
//     {
//         title: 'Usuarios',
//         href: '/users',
//         icon: Folder
//     },
// ];

// const footerNavItems: NavItem[] = [
//     {
//         title: 'Repository',
//         href: 'https://github.com/laravel/react-starter-kit',
//         icon: Folder,
//     },
//     {
//         title: 'Documentation',
//         href: 'https://laravel.com/docs/starter-kits#react',
//         icon: BookOpen,
//     },
// ];

// export function AppSidebar() {
//     return (
//         <Sidebar collapsible="icon" variant="inset">
//             <SidebarHeader>
//                 <SidebarMenu>
//                     <SidebarMenuItem>
//                         <SidebarMenuButton size="lg" asChild>
//                             <Link href={dashboard()} prefetch>
//                                 <AppLogo />
//                             </Link>
//                         </SidebarMenuButton>
//                     </SidebarMenuItem>
//                 </SidebarMenu>
//             </SidebarHeader>

//             <SidebarContent>
//                 <NavMain items={mainNavItems} />
//             </SidebarContent>

//             <SidebarFooter>
//                 <NavFooter items={footerNavItems} className="mt-auto" />
//                 <NavUser />
//             </SidebarFooter>
//         </Sidebar>
//     );
// }
