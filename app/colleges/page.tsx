'use client';
import { useState, useEffect, useCallback } from 'react';
import CollegeCard from '@/components/CollegeCard';
import { fetchColleges, fetchFilterOptions, College } from '@/lib/api';

const SORT_OPTIONS = [
  { value: 'nirf', label: 'NIRF Rank' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'placement', label: 'Best Placements' },
  { value: 'fees_asc', label: 'Fees: Low to High' },
  { value: 'fees_desc', label: 'Fees: High to Low' },
];

export default function CollegesPage() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState('');
  const [state, setState] = useState('all');
  const [type, setType] = useState('all');
  const [course, setCourse] = useState('all');
  const [sort, setSort] = useState('nirf');

  const [filterOpts, setFilterOpts] = useState<{ states: string[]; types: string[]; courses: string[] }>({
    states: [], types: [], courses: [],
  });

  useEffect(() => {
    fetchFilterOptions().then(setFilterOpts).catch(() => {});
  }, []);

  const load = useCallback(async (pg: number, reset = false) => {
    setLoading(true);
    try {
      const params: Record<string, string> = { page: String(pg), limit: '9', sort };
      if (search) params.search = search;
      if (state !== 'all') params.state = state;
      if (type !== 'all') params.type = type;
      if (course !== 'all') params.course = course;

      const data = await fetchColleges(params);
      setColleges(reset ? data.colleges : prev => [...prev, ...data.colleges]);
      setTotal(data.total);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [search, state, type, course, sort]);

  useEffect(() => {
    setPage(1);
    load(1, true);
  }, [search, state, type, course, sort]);

  function loadMore() {
    const next = page + 1;
    setPage(next);
    load(next, false);
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-8 animate-fade-up">
        <h1 className="font-display text-4xl font-bold text-[#0F0F0F] mb-1">Browse Colleges</h1>
        <p className="text-[#6B6B6B]">
          {loading ? 'Loading…' : `${total} college${total !== 1 ? 's' : ''} found`}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-60 flex-shrink-0">
          <div className="bg-white border border-[#E2E0DB] rounded-xl p-5 sticky top-20 space-y-5 animate-fade-up stagger-1">
            <h2 className="font-semibold text-[#0F0F0F] text-sm uppercase tracking-wider">Filters</h2>

            {/* Search */}
            <div>
              <label className="block text-xs text-[#6B6B6B] mb-1.5 font-medium">Search</label>
              <input
                type="text"
                placeholder="College or city…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full border border-[#E2E0DB] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5C7A5C]/30 focus:border-[#5C7A5C] transition-all"
              />
            </div>

            {/* State */}
            <div>
              <label className="block text-xs text-[#6B6B6B] mb-1.5 font-medium">State</label>
              <select
                value={state}
                onChange={e => setState(e.target.value)}
                className="w-full border border-[#E2E0DB] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5C7A5C]/30 bg-white"
              >
                <option value="all">All States</option>
                {filterOpts.states.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Type */}
            <div>
              <label className="block text-xs text-[#6B6B6B] mb-1.5 font-medium">College Type</label>
              <select
                value={type}
                onChange={e => setType(e.target.value)}
                className="w-full border border-[#E2E0DB] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5C7A5C]/30 bg-white"
              >
                <option value="all">All Types</option>
                {filterOpts.types.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            {/* Course */}
            <div>
              <label className="block text-xs text-[#6B6B6B] mb-1.5 font-medium">Course</label>
              <select
                value={course}
                onChange={e => setCourse(e.target.value)}
                className="w-full border border-[#E2E0DB] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5C7A5C]/30 bg-white"
              >
                <option value="all">All Courses</option>
                {filterOpts.courses.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-xs text-[#6B6B6B] mb-1.5 font-medium">Sort By</label>
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="w-full border border-[#E2E0DB] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5C7A5C]/30 bg-white"
              >
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>

            {/* Reset */}
            <button
              onClick={() => { setSearch(''); setState('all'); setType('all'); setCourse('all'); setSort('nirf'); }}
              className="w-full text-xs text-[#6B6B6B] py-2 border border-[#E2E0DB] rounded-lg hover:bg-[#F5F3EE] transition-colors"
            >
              Reset filters
            </button>
          </div>
        </aside>

        {/* Grid */}
        <div className="flex-1">
          {loading && colleges.length === 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white border border-[#E2E0DB] rounded-xl h-72 animate-pulse" />
              ))}
            </div>
          ) : colleges.length === 0 ? (
            <div className="text-center py-20 text-[#6B6B6B]">
              <div className="text-4xl mb-3">🔍</div>
              <p className="font-medium">No colleges found</p>
              <p className="text-sm mt-1">Try adjusting your filters</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {colleges.map((c, i) => (
                  <CollegeCard key={c.id} college={c} index={i % 9} />
                ))}
              </div>

              {page < totalPages && (
                <div className="text-center mt-8">
                  <button
                    onClick={loadMore}
                    disabled={loading}
                    className="bg-white border border-[#E2E0DB] text-[#0F0F0F] px-8 py-2.5 rounded-lg text-sm font-medium hover:border-[#5C7A5C] hover:text-[#5C7A5C] transition-all disabled:opacity-50"
                  >
                    {loading ? 'Loading…' : `Load more (${total - colleges.length} remaining)`}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
