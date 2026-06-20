import React from 'react';
import { 
  Keyboard, 
  Compass, 
  Percent, 
  Timer, 
  Binary, 
  Flame, 
  ArrowRight, 
  BookmarkCheck,
  Search,
  CheckCircle2
} from 'lucide-react';
import { playSound } from '../utils/audio.js';

export default function InternalLinks({ activeMode, onSelectMode, theme }) {
  // Master SEO Anchor Data for high rank indexability
  const internalDestinations = [
    {
      mode: 'basic',
      title: 'Basic Standard Calculator',
      url: '/?mode=basic',
      anchor: 'Free Standard Keyboard Mathematical Solver',
      desc: 'Perform basic math equations instantly with real-time sound feedback and clear memory history logging.',
      icon: Keyboard,
      color: 'text-indigo-400',
      badge: 'Dofollow SEO Index'
    },
    {
      mode: 'scientific',
      title: 'Scientific formula hub',
      url: '/?mode=scientific',
      anchor: 'Log10 trigonometry sine cosine formula solver',
      desc: 'Analyze trigonometric radians, logarithms (LN/LOG10), powers, square roots, and advanced floating point expressions.',
      icon: Compass,
      color: 'text-sky-450',
      badge: 'High Search Volume'
    },
    {
      mode: 'fraction',
      title: 'Fraction step-by-step simplifier',
      url: '/?mode=fraction',
      anchor: 'Improper fraction mixed number reducer steps',
      desc: 'Convert mixed numbers into clean improper representations and see detailed step-by-step reduction steps.',
      icon: Binary,
      color: 'text-emerald-450',
      badge: 'LSI Semantic Pivot'
    },
    {
      mode: 'percentage',
      title: 'Percentage margins compiler',
      url: '/?mode=percentage',
      anchor: 'Markup retail business percent growth increase',
      desc: 'Calculate custom coupon codes discounts, markup margins, percentage increase or decrease metrics for ecommerce products.',
      icon: Percent,
      color: 'text-rose-450',
      badge: 'Commercial Intent Index'
    },
    {
      mode: 'timer',
      title: 'Egg countdown split lap alarm clock',
      url: '/?mode=timer',
      anchor: 'Online precision lap split stopwatch workout timer',
      desc: 'Start detailed countdown alarms, run custom high-accuracy stopwatch with unlimited split rounds and audio alerts.',
      icon: Timer,
      color: 'text-amber-400',
      badge: 'Low KD Keyword'
    }
  ];

  const handleLinkClick = (e, mode) => {
    e.preventDefault();
    playSound('success');
    
    // Smooth scroll to top when changing tab mode internally
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onSelectMode(mode);

    // Update URL query string in browser without hard refresh
    const url = new URL(window.location.href);
    url.searchParams.set('mode', mode);
    window.history.pushState({}, '', url.toString());
  };

  return (
    <div className={`p-6 rounded-2xl border ${theme.cardBg} transition-all duration-300 relative overflow-hidden shadow-xl mt-8`}>
      {/* Decorative Blur Ambient light item */}
      <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-teal-500/5 rounded-full blur-2xl pointer-events-none" />

      {/* Header section with keyword research info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-800/60 gap-4 mb-6">
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-white flex items-center gap-1.5 uppercase tracking-wider">
            <BookmarkCheck className="w-4 h-4 text-teal-400 animate-pulse" /> SEO Internal Links & Site Mapping
          </h3>
          <p className="text-xs text-slate-400 max-w-xl">
            Internal link architecture is critical for Googlebot structural crawling. Explore our optimized search engine friendly keyword anchors:
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-teal-400 font-bold bg-teal-950/40 px-2.5 py-1 rounded-lg border border-teal-800/40 self-start md:self-center">
          <Flame className="w-3.5 h-3.5" /> High SEO Power (Do-Follow Structure)
        </div>
      </div>

      {/* Grid of Interactive Search Engine Anchors */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {internalDestinations.map((dest) => {
          const DestIcon = dest.icon;
          const isActive = activeMode === dest.mode;

          return (
            <div 
              key={dest.mode}
              className={`p-4 rounded-xl border transition-all duration-300 flex flex-col justify-between group relative ${
                isActive 
                  ? 'bg-teal-950/20 border-teal-500/45 shadow-md scale-[1.01]' 
                  : 'bg-slate-950/40 border-slate-850 hover:bg-slate-900/40 hover:border-slate-800'
              }`}
            >
              <div className="space-y-2">
                {/* Mode Icon & Header */}
                <div className="flex justify-between items-center">
                  <div className={`p-1.5 rounded-lg bg-slate-900 ${dest.color} border border-slate-800`}>
                    <DestIcon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[9px] px-1.5 py-0.5 rounded font-mono font-bold tracking-wider uppercase bg-slate-900 border border-slate-800 text-slate-450 group-hover:text-teal-400 transition-colors">
                    {dest.badge}
                  </span>
                </div>

                {/* Main Link Tag */}
                <div>
                  <a
                    href={dest.url}
                    onClick={(e) => handleLinkClick(e, dest.mode)}
                    className="block font-bold text-slate-100 hover:text-teal-400 text-xs tracking-tight transition-colors leading-snug underline decoration-teal-500/30 group-hover:decoration-teal-400"
                    title={`Switch calculator mode to ${dest.title}`}
                  >
                    {dest.anchor}
                  </a>
                  <span className="text-[9px] text-slate-500 block font-mono mt-0.5">Mode: {dest.mode}</span>
                </div>

                {/* Long tail educational text explanation */}
                <p className="text-[10px] text-slate-450 leading-relaxed pt-1 select-none">
                  {dest.desc}
                </p>
              </div>

              {/* Decorative CTA arrow */}
              <div className="flex items-center justify-between mt-4 pt-2 border-t border-slate-850/60">
                <span className="text-[9px] font-bold text-slate-500 flex items-center gap-1">
                  {isActive && <CheckCircle2 className="w-3 h-3 text-teal-400" />} {isActive ? 'Current View' : 'Calculate Now'}
                </span>
                <button
                  onClick={(e) => handleLinkClick(e, dest.mode)}
                  className="text-slate-500 group-hover:text-teal-400 transition-colors p-0.5 rounded"
                  title="Switch tab"
                >
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Educational Backlink Insights Alert Box */}
      <div className="mt-4 p-3 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center justify-between flex-wrap gap-2 text-[10px] text-slate-400">
        <span className="flex items-center gap-1.5">
          <Search className="w-3.5 h-3.5 text-teal-400" />
          <span>Each block contains rich <strong>anchor text mapping</strong> to maximize search engine indexing of LSI long-tail equations.</span>
        </span>
        <div className="flex gap-4">
          <span className="text-teal-400 font-mono">rel="dofollow" (implicit)</span>
          <span className="text-slate-500">·</span>
          <span className="text-slate-400 font-mono">w3c compliant URLs</span>
        </div>
      </div>
    </div>
  );
}
