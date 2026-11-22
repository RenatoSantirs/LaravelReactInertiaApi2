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
  // Obtener usuario desde Inertia
  const page = usePage<{ auth: { user: User } }>();
  const { auth } = page.props;

  // Roles
  const roles = auth?.user?.roles || [];
  const isAdminOrGerente = roles.includes('admin') || roles.includes('gerente');

  // Navegación principal (usuarios normales)
  const mainNavItems: NavItem[] = [
    {
      title: 'Inicio',
      href: '/inicio',
      icon: LayoutGrid,
    },
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
      title: 'Alimentos',
      href: '/foods',
      icon: ShoppingCart,
    },
    {
      title: 'Streams',
      href: '/streams',
      icon: TvIcon,
    },
    {
      title: 'Carrito',
      href: '/cart',
      icon: ShoppingCart,
    },
    {
      title: 'Mis Compras',
      href: '/mis-compras',
      icon: ShoppingCart,
    },
  ];

  // Navegación solo para admin / gerente
  const adminNavItems: NavItem[] = isAdminOrGerente
    ? [
        {
          title: 'Usuarios',
          href: '/users',
          icon: Folder,
        },
        {
          title: 'Productos',
          href: '/products',
          icon: ShoppingCart,
        },
        {
          title: 'Orders',
          href: '/orders',
          icon: ShoppingCart,
        },
        {
          title: 'Devoluciones',
          href: '/returns',
          icon: ShoppingCart,
        },
      ]
    : [];

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
        {/* Menú normal */}
        <NavMain items={mainNavItems} />

        {/* Sección Admin */}
        {isAdminOrGerente && (
          <>
            <div className="mt-6 px-3 text-xs font-semibold text-muted-foreground uppercase">Admin options</div>
            <NavMain items={adminNavItems} />
          </>
        )}
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
