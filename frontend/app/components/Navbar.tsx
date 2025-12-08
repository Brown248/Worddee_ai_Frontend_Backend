'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserCircle } from 'lucide-react';
import clsx from 'clsx';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white px-8 h-16 flex justify-between items-center shadow-sm sticky top-0 z-50">
      <Link href="/" className="font-serif font-bold text-xl text-gray-900 tracking-tight hover:opacity-80 transition">
        worddee.ai
      </Link>
      
      <div className="flex gap-8 text-sm font-medium">
        <NavLink href="/my-progress" active={pathname === '/my-progress'}>
          My Progress
        </NavLink>
        <NavLink href="/word-of-the-day" active={pathname === '/word-of-the-day'}>
          Word of the Day
        </NavLink>
      </div>

      <div className="w-8 h-8 rounded-full text-[#7a9e9f] hover:text-[#1a3c3c] transition cursor-pointer">
        <UserCircle className="w-full h-full" strokeWidth={1.5} />
      </div>
    </nav>
  );
}

function NavLink({ href, children, active }: { href: string; children: React.ReactNode; active: boolean }) {
  return (
    <Link 
      href={href} 
      className={clsx(
        "relative py-1 transition-colors duration-200",
        active ? "text-[#1a3c3c] font-bold" : "text-gray-400 hover:text-gray-600"
      )}
    >
      {children}
      {/* เส้นขีดใต้แบบ Animation */}
      <span className={clsx(
        "absolute bottom-0 left-0 w-full h-0.5 bg-[#1a3c3c] transform transition-transform duration-300",
        active ? "scale-x-100" : "scale-x-0"
      )}/>
    </Link>
  );
}