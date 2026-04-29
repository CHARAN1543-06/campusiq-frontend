import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'CampusIQ — Discover Your College',
  description: "India's smartest college discovery platform. Compare, predict, and decide.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <footer className="border-t border-[#E2E0DB] bg-[#F5F3EE] py-10 mt-16">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">🎓</span>
              <span className="font-display font-semibold text-[#0F0F0F]">CampusIQ</span>
              <span className="text-[#6B6B6B] text-sm">— Find your best college</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-[#6B6B6B]">
              <a href="/colleges" className="hover:text-[#0F0F0F] transition-colors">Browse</a>
              <a href="/compare" className="hover:text-[#0F0F0F] transition-colors">Compare</a>
              <a href="/predictor" className="hover:text-[#0F0F0F] transition-colors">Predictor</a>
            </div>
            <p className="text-xs text-[#6B6B6B]">© 2024 CampusIQ. Data for reference only.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
