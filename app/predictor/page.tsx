'use client';
import { useState } from 'react';
import Link from 'next/link';
import { predictColleges, College } from '@/lib/api';

const EXAMS = [
  { value: 'JEE ADVANCED', label: 'JEE Advanced', desc: 'For IITs', range: '1 – 20,000' },
  { value: 'JEE MAIN', label: 'JEE Main', desc: 'For NITs, IIITs, GFTIs', range: '1 – 11,00,000' },
  { value: 'BITSAT', label: 'BITSAT', desc: 'For BITS Pilani / Goa / Hyderabad', range: '1 – 4,00,000' },
  { value: 'VITEEE', label: 'VITEEE', desc: 'For VIT campuses', range: '1 – 2,50,000' },
  { value: 'MET', label: 'MET (Manipal)', desc: 'For MIT Manipal', range: '1 – 2,00,000' },
  { value: 'WBJEE', label: 'WBJEE', desc: 'For WB colleges', range: '1 – 1,50,000' },
  { value: 'SRMJEEE', label: 'SRMJEEE', desc: 'For SRMIST', range: '1 – 3,00,000' },
];

interface PredictResult {
  exam: string;
  rank: number;
  eligible: College[];
  reach: College[];
  total: number;
}

function CollegeResult({ college, tag }: { college: College; tag?: string }) {
  return (
    <Link href={`/college/${college.id}`}>
      <div className="bg-white border border-[#E2E0DB] rounded-xl p-4 card-hover flex items-center gap-4">
        <div className="text-2xl w-10 text-center flex-shrink-0">{college.logo}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="font-semibold text-[#0F0F0F] text-sm truncate">{college.name}</h3>
            {tag && (
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full flex-shrink-0 ${
                tag === 'eligible' ? 'bg-[#5C7A5C]/10 text-[#5C7A5C]' : 'bg-[#C8762A]/10 text-[#C8762A]'
              }`}>
                {tag === 'eligible' ? '✓ Eligible' : '↑ Reach'}
              </span>
            )}
          </div>
          <p className="text-[#6B6B6B] text-xs">📍 {college.location}</p>
        </div>
        <div className="hidden sm:flex flex-col items-end gap-1 flex-shrink-0 text-right">
          <span className="text-xs font-medium text-[#0F0F0F]">{college.avgPackageDisplay} avg</span>
          <span className="text-[10px] text-[#6B6B6B]">{college.placementPercent}% placed</span>
        </div>
        <div className="text-[#C8C5BE] text-sm">→</div>
      </div>
    </Link>
  );
}

export default function PredictorPage() {
  const [exam, setExam] = useState('');
  const [rank, setRank] = useState('');
  const [result, setResult] = useState<PredictResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handlePredict() {
    if (!exam || !rank) { setError('Please select an exam and enter your rank.'); return; }
    const rankNum = parseInt(rank);
    if (isNaN(rankNum) || rankNum < 1) { setError('Enter a valid rank (must be a positive number).'); return; }
    setError('');
    setLoading(true);
    try {
      const data = await predictColleges(exam, rankNum);
      setResult(data);
    } catch (e) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const selectedExam = EXAMS.find(e => e.value === exam);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="mb-8 animate-fade-up">
        <h1 className="font-display text-4xl font-bold text-[#0F0F0F] mb-1">College Predictor</h1>
        <p className="text-[#6B6B6B]">Enter your exam and rank to see which colleges you can get into</p>
      </div>

      {/* Input Card */}
      <div className="bg-white border border-[#E2E0DB] rounded-2xl p-6 md:p-8 mb-8 animate-fade-up stagger-1">
        <h2 className="font-semibold text-[#0F0F0F] mb-5">Your Details</h2>

        {/* Exam selector */}
        <div className="mb-5">
          <label className="block text-xs text-[#6B6B6B] font-medium mb-2 uppercase tracking-wider">Select Entrance Exam</label>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
            {EXAMS.map(e => (
              <button
                key={e.value}
                onClick={() => setExam(e.value)}
                className={`text-left px-3 py-2.5 rounded-lg border transition-all text-sm ${
                  exam === e.value
                    ? 'border-[#5C7A5C] bg-[#5C7A5C]/5 text-[#3d5c3d]'
                    : 'border-[#E2E0DB] text-[#6B6B6B] hover:border-[#C8C5BE] hover:text-[#0F0F0F]'
                }`}
              >
                <div className="font-medium">{e.label}</div>
                <div className="text-[10px] mt-0.5 opacity-70">{e.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Rank input */}
        <div className="mb-5">
          <label className="block text-xs text-[#6B6B6B] font-medium mb-2 uppercase tracking-wider">
            Your Rank {selectedExam && <span className="normal-case text-[#6B6B6B]">(Range: {selectedExam.range})</span>}
          </label>
          <div className="flex gap-3">
            <input
              type="number"
              min="1"
              placeholder="e.g. 5000"
              value={rank}
              onChange={e => setRank(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handlePredict()}
              className="flex-1 border border-[#E2E0DB] rounded-lg px-4 py-3 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-[#5C7A5C]/30 focus:border-[#5C7A5C] transition-all"
            />
            <button
              onClick={handlePredict}
              disabled={loading || !exam || !rank}
              className="bg-[#0F0F0F] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#5C7A5C] transition-colors disabled:opacity-40 text-sm whitespace-nowrap"
            >
              {loading ? 'Finding…' : 'Predict →'}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        <p className="text-[10px] text-[#6B6B6B]">
          ⚠️ Results are indicative based on historical cutoffs. Always verify with official sources.
        </p>
      </div>

      {/* Results */}
      {result && (
        <div className="animate-fade-up">
          <div className="bg-[#F5F3EE] border border-[#E2E0DB] rounded-xl px-5 py-4 mb-6 flex items-center justify-between">
            <div>
              <span className="font-semibold text-[#0F0F0F]">{result.exam}</span>
              <span className="text-[#6B6B6B] mx-2">•</span>
              <span className="text-[#6B6B6B]">Rank {result.rank.toLocaleString()}</span>
            </div>
            <div className="text-sm font-medium text-[#5C7A5C]">
              {result.total} college{result.total !== 1 ? 's' : ''} found
            </div>
          </div>

          {result.eligible.length > 0 ? (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#5C7A5C]" />
                <h3 className="font-semibold text-[#0F0F0F]">Eligible Colleges ({result.eligible.length})</h3>
              </div>
              <div className="space-y-2">
                {result.eligible.map(c => <CollegeResult key={c.id} college={c} tag="eligible" />)}
              </div>
            </div>
          ) : (
            <div className="bg-white border border-[#E2E0DB] rounded-xl p-8 text-center mb-6">
              <div className="text-3xl mb-3">😕</div>
              <p className="font-medium text-[#0F0F0F]">No exact matches found</p>
              <p className="text-sm text-[#6B6B6B] mt-1">Your rank may be outside the cutoff for {result.exam}. Check reach colleges below or try another exam.</p>
            </div>
          )}

          {result.reach.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#C8762A]" />
                <h3 className="font-semibold text-[#0F0F0F]">Reach Colleges ({result.reach.length})</h3>
                <span className="text-xs text-[#6B6B6B]">— improve your rank to target these</span>
              </div>
              <div className="space-y-2">
                {result.reach.map(c => <CollegeResult key={c.id} college={c} tag="reach" />)}
              </div>
            </div>
          )}

          <div className="mt-6 flex gap-3">
            <Link href="/colleges" className="text-sm text-[#5C7A5C] hover:underline">Browse all colleges →</Link>
            <Link href="/compare" className="text-sm text-[#6B6B6B] hover:text-[#0F0F0F]">Compare colleges →</Link>
          </div>
        </div>
      )}

      {/* Tips */}
      {!result && (
        <div className="grid sm:grid-cols-3 gap-4 animate-fade-up stagger-2">
          {[
            { icon: '🎯', title: 'Accurate cutoffs', desc: 'Based on previous year rank data' },
            { icon: '📈', title: 'Reach colleges', desc: 'Also shows slightly harder targets' },
            { icon: '🔗', title: 'Direct links', desc: 'Click any result to see full details' },
          ].map(t => (
            <div key={t.title} className="bg-white border border-[#E2E0DB] rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">{t.icon}</div>
              <div className="font-medium text-[#0F0F0F] text-sm mb-1">{t.title}</div>
              <div className="text-xs text-[#6B6B6B]">{t.desc}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
