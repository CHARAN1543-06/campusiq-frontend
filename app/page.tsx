import Link from 'next/link';

const features = [
  { icon: '🔍', title: 'Smart Search', desc: 'Find colleges by name, city, course or ranking with instant results', href: '/colleges' },
  { icon: '⚖️', title: 'Compare Colleges', desc: 'Side-by-side comparison of fees, placements, ratings and more', href: '/compare' },
  { icon: '🧠', title: 'Rank Predictor', desc: 'Enter your JEE / BITSAT rank and see your eligible college list', href: '/predictor' },
  { icon: '📊', title: 'Detailed Profiles', desc: 'Deep-dive into courses, placements, reviews and campus facilities', href: '/colleges' },
];

const stats = [
  { num: '12+', label: 'Colleges' },
  { num: '8', label: 'States covered' },
  { num: '5', label: 'Entrance exams' },
  { num: '100%', label: 'Free to use' },
];

export default function Home() {
  return (
    <div className="relative">
      <section className="relative overflow-hidden bg-[#F5F3EE] border-b border-[#E2E0DB] py-20 md:py-28">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #0F0F0F 1px, transparent 0)', backgroundSize: '28px 28px' }} />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-[#5C7A5C]/10 border border-[#5C7A5C]/20 rounded-full px-4 py-1.5 text-sm text-[#5C7A5C] font-medium mb-6 animate-fade-in">
            <span>✦</span> India&#39;s honest college discovery platform
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-[#0F0F0F] leading-tight mb-5 animate-fade-up stagger-1">
            Find the college<br />
            <span className="text-gradient">that fits you best</span>
          </h1>
          <p className="text-lg text-[#6B6B6B] max-w-xl mx-auto mb-10 leading-relaxed animate-fade-up stagger-2">
            No noise, no sponsored rankings. Just clear data on fees, placements, and courses — so you can make a confident decision.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-up stagger-3">
            <Link href="/colleges" className="bg-[#0F0F0F] text-white px-7 py-3 rounded-lg font-medium hover:bg-[#5C7A5C] transition-colors text-sm">Browse All Colleges →</Link>
            <Link href="/predictor" className="bg-white text-[#0F0F0F] border border-[#E2E0DB] px-7 py-3 rounded-lg font-medium hover:border-[#C8C5BE] transition-colors text-sm">🧠 Check My Rank</Link>
          </div>
          <div className="flex flex-wrap justify-center gap-8 mt-14 animate-fade-up stagger-4">
            {stats.map(s => (
              <div key={s.label} className="text-center">
                <div className="font-display text-2xl font-bold text-[#0F0F0F]">{s.num}</div>
                <div className="text-xs text-[#6B6B6B] mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl font-semibold text-[#0F0F0F] mb-2">Everything you need to decide</h2>
          <p className="text-[#6B6B6B]">Four tools. One platform.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <Link key={f.title} href={f.href}>
              <div className={"bg-white border border-[#E2E0DB] rounded-xl p-5 card-hover cursor-pointer h-full animate-fade-up stagger-" + (i + 1)}>
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-[#0F0F0F] mb-1.5">{f.title}</h3>
                <p className="text-[#6B6B6B] text-sm leading-relaxed">{f.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="max-w-5xl mx-auto px-6 pb-8">
        <div className="bg-[#0F0F0F] rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl font-bold text-white mb-1">Not sure where to start?</h2>
            <p className="text-[#8aaa8a] text-sm">Enter your exam rank and get a personalised college list in seconds.</p>
          </div>
          <Link href="/predictor" className="whitespace-nowrap bg-[#5C7A5C] text-white px-7 py-3 rounded-lg font-medium hover:bg-[#8aaa8a] transition-colors text-sm">Try the Predictor →</Link>
        </div>
      </section>
    </div>
  );
}
