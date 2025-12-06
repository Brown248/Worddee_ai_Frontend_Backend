'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserCircle } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  // Logic เพื่อเปลี่ยนสีเมนู Active ให้เหมือนในรูป
  const isActive = (path: string) => pathname === path ? 'text-[#7a9e9f] font-bold border-b-2 border-[#7a9e9f]' : 'text-gray-400';

  return (
    <nav className="bg-white px-8 py-4 flex justify-between items-center shadow-sm sticky top-0 z-50">
      <div className="font-bold text-xl text-gray-800 tracking-tight">worddee.ai</div>
      <div className="flex gap-8 text-sm">
        <Link href="/my-progress" className={`pb-1 ${isActive('/my-progress')}`}>My Progress</Link>
        <Link href="/word-of-the-day" className={`pb-1 ${isActive('/word-of-the-day')}`}>Word of the Day</Link>
      </div>
      <div className="w-8 h-8 rounded-full overflow-hidden text-gray-300">
        <UserCircle className="w-full h-full" />
      </div>
    </nav>
  );
}