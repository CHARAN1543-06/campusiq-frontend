'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { fetchCollege, College } from '@/lib/api';

type Tab = 'overview' | 'courses' | 'placements' | 'reviews';

function StarRow({ rating }: { rating: number }) {
  return (
    <span className="text-[#C8762A]">
      {'★'.repeat(Math.round(rating))}{'☆'.repeat(5 - Math.round(rating))}
    </span>
  );
}

export default function CollegeDetailPage() {
  const params = useParams();
  const [college, setCollege] = useState<College | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>('overview');

  useEffect(() => {
    fetchCollege(params.id as string).then(data => {
      setCollege(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [params.id]);

  if (loading) return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="h-64 bg-[#F5F3EE] rounded-2xl animate-pulse mb-6" />
      <div className="h-8 bg-[#F5F3EE] rounded animate-pulse w-1/2 mb-3" />
      <div className="h-4 bg-[#F5F3EE] rounded animate-pulse w-1/3" />
    </div>
  );

  if (!college) return (
    <div className="max-w-5xl mx-auto px-6 py-20 text-center">
      <div className="text-5xl mb-3">😕</div>
      <p className="text-[#6B6B6B]">College not found.</p>
      <Link href="/colleges" className="text-[#5C7A5C] hover:underline mt-2 inline-block">← Back to list</Link>
    </div>
  );

  const tabs: { key: Tab; label: string }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'courses', label: 'Courses' },
    { key: 'placements', label: 'Placements' },
    { key: 'reviews', label: `Reviews (${college.reviews.length})` },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Back */}
      <Link href="/colleges" className="inline-flex items-center gap-1.5 text-sm text-[#6B6B6B] hover:text-[#0F0F0F] mb-6 transition-colors">
        ← Back to colleges
      </Link>

      {/* Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden h-52 md:h-64 mb-6 animate-fade-up">
        <img src={college.image} alt={college.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-5 left-6 right-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full mb-2 inline-block ${
                college.type === 'Government' ? 'bg-[#5C7A5C] text-white' :
                college.type === 'Deemed' ? 'bg-[#C8762A] text-white' : 'bg-white/20 text-white'
              }`}>{college.type}</span>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight">{college.name}</h1>
              <p className="text-white/80 text-sm mt-1">📍 {college.location} &nbsp;•&nbsp; Est. {college.established}</p>
            </div>
            <div className="hidden md:flex flex-col items-end gap-2">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2 text-center">
                <div className="text-white font-bold text-xl">#{college.nirfRank}</div>
                <div className="text-white/70 text-xs">NIRF Rank</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 animate-fade-up stagger-1">
        {[
          { label: 'Rating', value: `${college.rating} ★`, sub: `${college.totalReviews} reviews` },
          { label: 'Fees/year', value: college.feesDisplay, sub: 'Approx.' },
          { label: 'Avg Package', value: college.avgPackageDisplay, sub: 'Per annum' },
          { label: 'Placement', value: `${college.placementPercent}%`, sub: 'Placement rate' },
        ].map(s => (
          <div key={s.label} className="bg-white border border-[#E2E0DB] rounded-xl p-4 text-center">
            <div className="font-display text-xl font-bold text-[#0F0F0F]">{s.value}</div>
            <div className="text-xs text-[#6B6B6B] mt-0.5">{s.label}</div>
            <div className="text-[10px] text-[#C8C5BE]">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Compare CTA */}
      <div className="flex gap-3 mb-8 animate-fade-up stagger-2">
        <Link
          href={`/compare?add=${college.id}`}
          className="bg-[#5C7A5C] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#3d5c3d] transition-colors"
        >
          ⚖️ Add to Compare
        </Link>
        <Link href="/predictor" className="bg-white border border-[#E2E0DB] text-[#6B6B6B] px-5 py-2.5 rounded-lg text-sm font-medium hover:border-[#C8C5BE] transition-colors">
          🧠 Check Eligibility
        </Link>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#E2E0DB] mb-6">
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-5 py-2.5 text-sm font-medium border-b-2 whitespace-nowrap transition-all ${
                tab === t.key
                  ? 'border-[#5C7A5C] text-[#5C7A5C]'
                  : 'border-transparent text-[#6B6B6B] hover:text-[#0F0F0F]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="animate-fade-in">
        {tab === 'overview' && (
          <div className="space-y-6">
            <div className="bg-white border border-[#E2E0DB] rounded-xl p-6">
              <h2 className="font-display text-xl font-semibold mb-3">About {college.shortName}</h2>
              <p className="text-[#6B6B6B] leading-relaxed">{college.about}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white border border-[#E2E0DB] rounded-xl p-5">
                <h3 className="font-semibold text-[#0F0F0F] mb-3 text-sm uppercase tracking-wider">Key Info</h3>
                <div className="space-y-2.5">
                  {[
                    { label: 'NAAC Grade', value: college.naacGrade },
                    { label: 'NIRF Rank', value: `#${college.nirfRank}` },
                    { label: 'Established', value: college.established },
                    { label: 'Type', value: college.type },
                    { label: 'Exams Accepted', value: college.examAccepted.join(', ') },
                  ].map(row => (
                    <div key={row.label} className="flex justify-between items-center text-sm py-1.5 border-b border-[#F5F3EE] last:border-0">
                      <span className="text-[#6B6B6B]">{row.label}</span>
                      <span className="font-medium text-[#0F0F0F]">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-[#E2E0DB] rounded-xl p-5">
                <h3 className="font-semibold text-[#0F0F0F] mb-3 text-sm uppercase tracking-wider">Campus Facilities</h3>
                <div className="flex flex-wrap gap-2">
                  {college.facilities.map(f => (
                    <span key={f} className="text-xs bg-[#F5F3EE] border border-[#E2E0DB] text-[#6B6B6B] px-2.5 py-1 rounded-full">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'courses' && (
          <div className="bg-white border border-[#E2E0DB] rounded-xl p-6">
            <h2 className="font-display text-xl font-semibold mb-4">Courses Offered</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {college.courses.map(c => (
                <div key={c} className="border border-[#E2E0DB] rounded-lg p-3 hover:border-[#5C7A5C] transition-colors">
                  <div className="font-medium text-[#0F0F0F]">{c}</div>
                  <div className="text-xs text-[#6B6B6B] mt-0.5">
                    {c === college.topCourse ? '⭐ Top course' : 'Available'}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-[#F5F3EE] rounded-lg text-sm text-[#6B6B6B]">
              📋 Exams accepted: {college.examAccepted.join(', ')}
            </div>
          </div>
        )}

        {tab === 'placements' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { label: 'Placement Rate', value: `${college.placementPercent}%`, color: '#5C7A5C' },
                { label: 'Average Package', value: college.avgPackageDisplay, color: '#C8762A' },
                { label: 'Highest Package', value: college.highestPackageDisplay, color: '#0F0F0F' },
              ].map(s => (
                <div key={s.label} className="bg-white border border-[#E2E0DB] rounded-xl p-5 text-center">
                  <div className="font-display text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-xs text-[#6B6B6B] mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="bg-white border border-[#E2E0DB] rounded-xl p-6">
              <h3 className="font-semibold text-[#0F0F0F] mb-4">Top Recruiters</h3>
              <div className="flex flex-wrap gap-2">
                {college.topRecruiters.map(r => (
                  <span key={r} className="bg-[#0F0F0F] text-white text-xs font-medium px-3 py-1.5 rounded-full">
                    {r}
                  </span>
                ))}
              </div>
            </div>

            {/* Bar chart visual */}
            <div className="bg-white border border-[#E2E0DB] rounded-xl p-6">
              <h3 className="font-semibold text-[#0F0F0F] mb-4">Placement Rate Visual</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-20 text-[#6B6B6B]">Placed</span>
                  <div className="flex-1 bg-[#F5F3EE] rounded-full h-5 overflow-hidden">
                    <div
                      className="h-full bg-[#5C7A5C] rounded-full flex items-center justify-end pr-2 transition-all duration-1000"
                      style={{ width: `${college.placementPercent}%` }}
                    >
                      <span className="text-white text-[10px] font-bold">{college.placementPercent}%</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-20 text-[#6B6B6B]">Unplaced</span>
                  <div className="flex-1 bg-[#F5F3EE] rounded-full h-5 overflow-hidden">
                    <div
                      className="h-full bg-[#E2E0DB] rounded-full flex items-center justify-end pr-2"
                      style={{ width: `${100 - college.placementPercent}%` }}
                    >
                      <span className="text-[#6B6B6B] text-[10px] font-bold">{100 - college.placementPercent}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'reviews' && (
          <div className="space-y-4">
            {college.reviews.map((r, i) => (
              <div key={i} className="bg-white border border-[#E2E0DB] rounded-xl p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-medium text-[#0F0F0F] text-sm">{r.author}</div>
                    <div className="text-xs text-[#6B6B6B]">Batch of {r.year}</div>
                  </div>
                  <div className="flex flex-col items-end gap-0.5">
                    <StarRow rating={r.rating} />
                    <span className="text-xs text-[#6B6B6B]">{r.rating}/5</span>
                  </div>
                </div>
                <p className="text-[#6B6B6B] text-sm leading-relaxed italic">&ldquo;{r.text}&rdquo;</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
