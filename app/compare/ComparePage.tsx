'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { fetchColleges, compareColleges, College } from '@/lib/api';

const COMPARE_ROWS = [
  { label: 'Location', key: 'location' },
  { label: 'Type', key: 'type' },
  { label: 'Established', key: 'established' },
  { label: 'NIRF Rank', key: 'nirfRank', highlight: true, best: 'min' },
  { label: 'NAAC Grade', key: 'naacGrade' },
  { label: 'Rating', key: 'rating', highlight: true, best: 'max', suffix: '★' },
  { label: 'Fees / Year', key: 'feesDisplay' },
  { label: 'Placement %', key: 'placementPercent', highlight: true, best: 'max', suffix: '%' },
  { label: 'Avg Package', key: 'avgPackageDisplay', highlight: true },
  { label: 'Highest Package', key: 'highestPackageDisplay' },
  { label: 'Top Course', key: 'topCourse' },
  { label: 'Exams Accepted', key: 'examAccepted', isArray: true },
];

function getBestIdx(colleges: College[], key: string, best?: string): number {
  if (!best || colleges.length < 2) return -1;
  const vals = colleges.map(c => Number((c as any)[key]) || 0);
  const extreme = best === 'max' ? Math.max(...vals) : Math.min(...vals.filter(v => v > 0));
  return vals.indexOf(extreme);
}

export default function ComparePage() {
  const searchParams = useSearchParams();
  const addId = searchParams.get('add');

  const [allColleges, setAllColleges] = useState<College[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [compared, setCompared] = useState<College[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchColleges({ limit: '50', sort: 'nirf' }).then(d => setAllColleges(d.colleges));
  }, []);

  useEffect(() => {
    if (addId && !selected.includes(Number(addId))) {
      setSelected(prev => [...prev, Number(addId)].slice(0, 3));
    }
  }, [addId]);

  const filtered = allColleges.filter(c =>
    search ? c.name.toLowerCase().includes(search.toLowerCase()) || c.city.toLowerCase().includes(search.toLowerCase()) : true
  );

  function toggle(id: number) {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  }

  async function runCompare() {
    if (selected.length < 2) return;
    setLoading(true);
    const data = await compareColleges(selected);
    setCompared(data);
    setLoading(false);
  }

  function getVal(college: College, key: string, isArray?: boolean) {
    const v = (college as any)[key];
    if (isArray && Array.isArray(v)) return v.join(', ');
    return v ?? '—';
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-8 animate-fade-up">
        <h1 className="font-display text-4xl font-bold text-[#0F0F0F] mb-1">Compare Colleges</h1>
        <p className="text-[#6B6B6B]">Select 2–3 colleges to compare side by side</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Selector */}
        <div className="lg:col-span-1 animate-fade-up stagger-1">
          <div className="bg-white border border-[#E2E0DB] rounded-xl p-5 sticky top-20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-[#0F0F0F] text-sm">Select Colleges</h2>
              <span className="text-xs text-[#6B6B6B] bg-[#F5F3EE] px-2 py-0.5 rounded-full">{selected.length}/3</span>
            </div>

            <input
              type="text"
              placeholder="Search colleges…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full border border-[#E2E0DB] rounded-lg px-3 py-2 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-[#5C7A5C]/30 focus:border-[#5C7A5C]"
            />

            <div className="space-y-1.5 max-h-80 overflow-y-auto pr-1">
              {filtered.map(c => {
                const isSelected = selected.includes(c.id);
                const isFull = selected.length >= 3 && !isSelected;
                return (
                  <button
                    key={c.id}
                    onClick={() => !isFull && toggle(c.id)}
                    disabled={isFull}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all ${
                      isSelected
                        ? 'bg-[#5C7A5C] text-white'
                        : isFull
                        ? 'text-[#C8C5BE] cursor-not-allowed'
                        : 'hover:bg-[#F5F3EE] text-[#0F0F0F]'
                    }`}
                  >
                    <div className="font-medium truncate">{c.shortName}</div>
                    <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-white/70' : 'text-[#6B6B6B]'}`}>
                      {c.city} • NIRF #{c.nirfRank}
                    </div>
                  </button>
                );
              })}
            </div>

            {selected.length >= 2 && (
              <button
                onClick={runCompare}
                disabled={loading}
                className="w-full mt-4 bg-[#0F0F0F] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#5C7A5C] transition-colors disabled:opacity-60"
              >
                {loading ? 'Comparing…' : `Compare ${selected.length} Colleges →`}
              </button>
            )}

            {selected.length < 2 && (
              <p className="text-xs text-[#6B6B6B] text-center mt-4">Select at least 2 colleges</p>
            )}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="lg:col-span-2 animate-fade-up stagger-2">
          {compared.length === 0 ? (
            <div className="bg-white border border-[#E2E0DB] rounded-xl p-12 text-center">
              <div className="text-5xl mb-4">⚖️</div>
              <h3 className="font-display text-xl font-semibold text-[#0F0F0F] mb-2">Ready to compare?</h3>
              <p className="text-[#6B6B6B] text-sm max-w-xs mx-auto">
                Select 2 or 3 colleges from the panel and click Compare to see a detailed side-by-side breakdown.
              </p>
            </div>
          ) : (
            <div className="bg-white border border-[#E2E0DB] rounded-xl overflow-hidden">
              {/* Header */}
              <div className="grid border-b border-[#E2E0DB]" style={{ gridTemplateColumns: `180px repeat(${compared.length}, 1fr)` }}>
                <div className="p-4 bg-[#F5F3EE]" />
                {compared.map(c => (
                  <div key={c.id} className="p-4 bg-[#F5F3EE] border-l border-[#E2E0DB] text-center">
                    <div className="text-2xl mb-1">{c.logo}</div>
                    <div className="font-semibold text-[#0F0F0F] text-sm leading-tight">{c.shortName}</div>
                    <div className="text-[10px] text-[#6B6B6B] mt-0.5">{c.city}</div>
                  </div>
                ))}
              </div>

              {/* Rows */}
              {COMPARE_ROWS.map((row, ri) => {
                const bestIdx = getBestIdx(compared, row.key, (row as any).best);
                return (
                  <div
                    key={row.key}
                    className={`grid border-b border-[#F5F3EE] last:border-0 ${ri % 2 === 0 ? '' : 'bg-[#FAFAF8]'}`}
                    style={{ gridTemplateColumns: `180px repeat(${compared.length}, 1fr)` }}
                  >
                    <div className="px-4 py-3 text-xs font-medium text-[#6B6B6B] uppercase tracking-wider flex items-center">
                      {row.label}
                    </div>
                    {compared.map((c, ci) => {
                      const val = getVal(c, row.key, (row as any).isArray);
                      const isBest = bestIdx === ci;
                      return (
                        <div key={c.id} className={`px-4 py-3 text-sm border-l border-[#F5F3EE] flex items-center justify-center text-center ${isBest ? 'bg-[#5C7A5C]/5' : ''}`}>
                          <span className={isBest ? 'font-semibold text-[#5C7A5C]' : 'text-[#0F0F0F]'}>
                            {val}{isBest && (row as any).suffix ? (row as any).suffix : ''}
                            {isBest && <span className="ml-1 text-[10px] text-[#5C7A5C]">✓</span>}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                );
              })}

              {/* Footer Links */}
              <div className="grid border-t border-[#E2E0DB]" style={{ gridTemplateColumns: `180px repeat(${compared.length}, 1fr)` }}>
                <div className="p-3" />
                {compared.map(c => (
                  <div key={c.id} className="p-3 border-l border-[#E2E0DB] text-center">
                    <Link href={`/college/${c.id}`} className="text-xs text-[#5C7A5C] hover:underline font-medium">
                      Full Profile →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
