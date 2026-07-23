'use client';

import { usePathname } from 'next/navigation';

// Imports
import * as NavbarModule from './Navbar';
import * as BottomNavModule from './BottomNavigation';
import * as AdminNavbarModule from './Adminnavbar';
import * as AdminBottomModule from './Adminbottom';

// Unpack Components safely whether default or named export
const Navbar = NavbarModule.default || NavbarModule.Navbar || Object.values(NavbarModule)[0];
const BottomNavigation = BottomNavModule.default || BottomNavModule.BottomNavigation || Object.values(BottomNavModule)[0];
const AdminNavbar = AdminNavbarModule.default || AdminNavbarModule.AdminNavbar || Object.values(AdminNavbarModule)[0];
const Adminbottom = AdminBottomModule.default || AdminBottomModule.Adminbottom || Object.values(AdminBottomModule)[0];

export default function NavShell({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  // Select component dynamically based on route
  const CurrentNavbar = isAdminRoute ? AdminNavbar : Navbar;
  const CurrentBottom = isAdminRoute ? Adminbottom : BottomNavigation;

  return (
    <>
      {/* Top Navbar */}
      {typeof CurrentNavbar === 'function' ? <CurrentNavbar /> : null}

      {/* Main Page Viewport Container */}
      <main className="min-h-screen bg-slate-50 pt-24 pb-24">
        {children}
      </main>

      {/* Bottom Navigation */}
      {typeof CurrentBottom === 'function' ? <CurrentBottom /> : null}
    </>
  );
}