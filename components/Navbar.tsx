'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const path = usePathname();
  const links = [
    { href: '/colleges', label: 'Browse' },
    { href: '/compare', label: 'Compare' },
    { href: '/predictor', label: 'Predictor' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#FAFAF8]/90 backdrop-blur-md border-b border-[#E2E0DB]">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-xl">🎓</span>
          <span className="font-display font-bold text-[#0F0F0F] text-lg group-hover:text-[#5C7A5C] transition-colors">
            CampusIQ
          </span>
        </Link>

        <div className="flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                path.startsWith(link.href)
                  ? 'bg-[#5C7A5C] text-[#FAFAF8]'
                  : 'text-[#6B6B6B] hover:text-[#0F0F0F] hover:bg-[#F5F3EE]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
